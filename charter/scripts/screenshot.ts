/// <reference lib="deno.ns" />
import puppeteer from "puppeteer";
import { join } from "jsr:@std/path";

const OUTPUT_DIR = "screenshots";
const DEV_SERVER_URL = "http://localhost:5173";

let devServerProcess: Deno.ChildProcess | null = null;

async function ensureOutputDir() {
  try {
    await Deno.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    if (!(error instanceof Deno.errors.AlreadyExists)) {
      throw error;
    }
  }
}

async function checkDevServer(): Promise<boolean> {
  try {
    const response = await fetch(DEV_SERVER_URL, {
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
}

async function startDevServer(): Promise<void> {
  console.log("🚀 Starting Vite dev server...");

  try {
    // Start the dev server process
    const command = new Deno.Command("deno", {
      args: ["task", "dev"],
      stdout: "piped",
      stderr: "piped",
      cwd: Deno.cwd(),
    });

    devServerProcess = command.spawn();

    // Wait for the server to be ready
    console.log("⏳ Waiting for dev server to start...");

    let attempts = 0;
    const maxAttempts = 30; // Wait up to 30 seconds

    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const isReady = await checkDevServer();
      if (isReady) {
        console.log("✅ Dev server is ready!");
        return;
      }

      attempts++;
      if (attempts % 5 === 0) {
        console.log(`⏳ Still waiting... (${attempts}/${maxAttempts})`);
      }
    }

    throw new Error("Dev server failed to start within 30 seconds");
  } catch (error) {
    console.error("❌ Failed to start dev server:", error);
    throw error;
  }
}

async function stopDevServer(): Promise<void> {
  if (devServerProcess) {
    console.log("🛑 Stopping dev server...");
    try {
      devServerProcess.kill("SIGTERM");
      await devServerProcess.status;
      console.log("✅ Dev server stopped");
    } catch (error) {
      console.warn("⚠️ Error stopping dev server:", error);
      // Try force kill
      try {
        devServerProcess.kill("SIGKILL");
      } catch {
        // Ignore errors on force kill
      }
    }
    devServerProcess = null;
  }
}

async function ensureDevServer(): Promise<boolean> {
  const isRunning = await checkDevServer();

  if (isRunning) {
    console.log("✅ Dev server is already running");
    return false; // Server was already running
  }

  await startDevServer();
  return true; // We started the server
}

async function findEdgeExecutable(): Promise<string | undefined> {
  // Common Edge executable paths on Windows
  const edgePaths = [
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge Dev\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge Dev\\Application\\msedge.exe",
  ];

  for (const path of edgePaths) {
    try {
      const stat = await Deno.stat(path);
      if (stat.isFile) {
        return path;
      }
    } catch {
      // Continue to next path
    }
  }

  return undefined;
}

async function captureScreenshot(
  outputPath: string,
  options: {
    width?: number;
    height?: number;
    fullPage?: boolean;
    selector?: string;
    theme?: "light" | "dark";
  } = {},
) {
  let browser;

  try {
    // Try Chrome first
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
      ],
    });
  } catch (chromeError) {
    console.warn("⚠️  Chrome not available, trying Edge...");

    try {
      // Try to find Edge executable
      const edgePath = await findEdgeExecutable();

      if (!edgePath) {
        throw new Error("Edge executable not found");
      }

      // Fallback to Edge
      browser = await puppeteer.launch({
        headless: true,
        executablePath: edgePath,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-gpu",
        ],
      });
      console.log("✅ Using Microsoft Edge");
    } catch (edgeError) {
      console.error("❌ Neither Chrome nor Edge is available!");
      console.error("Chrome error:", chromeError);
      console.error("Edge error:", edgeError);
      throw new Error(
        "No compatible browser found. Please install Chrome or Edge.",
      );
    }
  }

  try {
    const page = await browser.newPage();

    // Set viewport
    await page.setViewport({
      width: options.width || 1920,
      height: options.height || 1080,
      deviceScaleFactor: 2, // For high DPI screenshots
    });

    // Emulate color scheme preference if theme is specified
    if (options.theme) {
      await page.emulateMediaFeatures([
        {
          name: "prefers-color-scheme",
          value: options.theme,
        },
      ]);
      console.log(`🎨 Emulating ${options.theme} mode`);
    }

    // Navigate to the page
    await page.goto(DEV_SERVER_URL, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for the content to be fully rendered
    await page.waitForSelector("table", { timeout: 10000 });

    // Take screenshot
    const screenshotOptions: {
      path: string;
      type: "png";
      fullPage?: boolean;
    } = {
      path: outputPath,
      type: "png",
    };

    if (options.selector) {
      // Screenshot specific element
      const element = await page.$(options.selector);
      if (element) {
        await element.screenshot(screenshotOptions);
      } else {
        console.warn(
          `Selector "${options.selector}" not found, taking full page screenshot`,
        );
        screenshotOptions.fullPage = options.fullPage ?? true;
        await page.screenshot(screenshotOptions);
      }
    } else {
      // Full page screenshot
      screenshotOptions.fullPage = options.fullPage ?? true;
      await page.screenshot(screenshotOptions);
    }

    console.log(`✅ Screenshot saved to: ${outputPath}`);
  } finally {
    await browser.close();
  }
}

async function main() {
  const args = Deno.args;

  // Show usage if help is requested
  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🖼️  Screenshot Capture Tool for Jellyfin Compatibility Matrix

Usage: deno task screenshot [options] [outputName] [width] [height] [selector] [fullPage] [theme]

Arguments:
  outputName  Output filename (default: jellyfin-compatibility-YYYY-MM-DD.png)
  width       Screenshot width in pixels (default: 1920)
  height      Screenshot height in pixels (default: 1080)  
  selector    CSS selector to capture specific element (optional)
  fullPage    Whether to capture full page - true/false (default: true)
  theme       Theme mode - light/dark/both (default: system default)

Examples:
  deno task screenshot                                    # Default screenshot
  deno task screenshot my-screenshot.png                  # Custom filename
  deno task screenshot screenshot.png 1920 1080 table    # Capture just the table
  deno task screenshot screenshot.png 1920 1080 "" true light    # Light mode
  deno task screenshot screenshot.png 1920 1080 "" true dark     # Dark mode  
  deno task screenshot screenshot.png 1920 1080 "" true both     # Both themes

Special theme option:
  both        Creates two screenshots: one light and one dark mode
`);
    return;
  }

  // Parse command line arguments
  const outputName = args[0] ||
    `jellyfin-compatibility-${new Date().toISOString().split("T")[0]}.png`;
  const width = args[1] ? parseInt(args[1]) : 1920;
  const height = args[2] ? parseInt(args[2]) : 1080;
  const selector = args[3] || undefined;
  const fullPage = args[4] !== "false";
  const themeArg = args[5];

  console.log("🚀 Starting screenshot capture...");
  console.log(`📊 Target: ${DEV_SERVER_URL}`);
  console.log(`📸 Output: ${outputName}`);
  console.log(`📏 Size: ${width}x${height}`);

  if (selector) {
    console.log(`🎯 Selector: ${selector}`);
  }

  if (themeArg === "both") {
    console.log(`🎨 Theme: capturing both light and dark modes`);
  } else if (themeArg) {
    console.log(`🎨 Theme: ${themeArg} mode`);
  } else {
    console.log(`🎨 Theme: system default`);
  }

  let serverStartedByUs = false;

  try {
    // Ensure dev server is running
    serverStartedByUs = await ensureDevServer();

    // Ensure output directory exists
    await ensureOutputDir();

    // Handle theme options
    if (themeArg === "both") {
      // Capture both light and dark mode screenshots
      const baseName = outputName.replace(/\.png$/, "");
      const lightName = `${baseName}-light.png`;
      const darkName = `${baseName}-dark.png`;

      console.log("📸 Capturing light mode screenshot...");
      await captureScreenshot(join(OUTPUT_DIR, lightName), {
        width,
        height,
        fullPage,
        selector,
        theme: "light",
      });

      console.log("📸 Capturing dark mode screenshot...");
      await captureScreenshot(join(OUTPUT_DIR, darkName), {
        width,
        height,
        fullPage,
        selector,
        theme: "dark",
      });
    } else {
      // Capture single screenshot
      const theme = themeArg as "light" | "dark" | undefined;
      const outputPath = join(OUTPUT_DIR, outputName);
      await captureScreenshot(outputPath, {
        width,
        height,
        fullPage,
        selector,
        theme,
      });
    }

    console.log("✨ Screenshot capture complete!");
  } catch (error) {
    console.error("💥 Error capturing screenshot:", error);
    throw error;
  } finally {
    // Clean up: stop dev server if we started it
    if (serverStartedByUs) {
      await stopDevServer();
    }
  }
}

if (import.meta.main) {
  main().catch((error) => {
    console.error("💥 Error capturing screenshot:", error);
    Deno.exit(1);
  });
}
