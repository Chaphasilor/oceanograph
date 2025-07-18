# Charter - Jellyfin Compatibility Matrix

A web-based compatibility matrix for Jellyfin clients, built with Vite, TypeScript, and Tailwind CSS.

## Features

- **Interactive Compatibility Table**: View feature support across different Jellyfin clients
- **Caniuse.com-style Design**: Clean, professional styling with color-coded support indicators
- **Responsive Layout**: Works on desktop and mobile devices
- **PNG Export**: Generate high-quality screenshots of the compatibility matrix

## Getting Started

### Prerequisites

- Deno 2.0 or later
- Node.js (for npm packages)

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   deno install
   ```

### Development

Start the development server:

```bash
deno task dev
```

The application will be available at `http://localhost:5173`

### Building

Build for production:

```bash
deno task build
```

Preview the production build:

```bash
deno task preview
```

## Screenshot Generation

Generate PNG screenshots of the compatibility matrix:

### Basic Usage

```bash
# Generate screenshot with default settings
deno task screenshot

# Custom filename
deno task screenshot my-compatibility-matrix.png

# Custom dimensions (width x height)
deno task screenshot compatibility.png 1920 1080

# Screenshot specific element
deno task screenshot table-only.png 1920 1080 "table"

# Disable full page screenshot
deno task screenshot viewport-only.png 1920 1080 "" false
```

**✨ Simplified Workflow**: The script now automatically starts and stops the dev server as needed. No need to run `deno task dev` separately!

### Screenshot Options

The screenshot command accepts the following parameters:

1. **Output filename** (optional): Default is `jellyfin-compatibility-YYYY-MM-DD.png`
2. **Width** (optional): Default is 1920px
3. **Height** (optional): Default is 1080px
4. **CSS Selector** (optional): Target specific element (e.g., `"table"`, `".compatibility-matrix"`)
5. **Full Page** (optional): `true` (default) or `false` to capture only viewport

### Examples

```bash
# High resolution screenshot
deno task screenshot high-res.png 3840 2160

# Screenshot just the table
deno task screenshot table-only.png 1920 1080 "table"

# Mobile viewport size
deno task screenshot mobile.png 375 667

# Desktop viewport (no scrolling)
deno task screenshot desktop-viewport.png 1920 1080 "" false
```

### Requirements for Screenshots

1. **Automatic server management**: The script will automatically start and stop the dev server as needed
2. **Browser availability**: The script will automatically use:
   - **Chrome** (preferred) - Puppeteer will auto-install if not found
   - **Microsoft Edge** (fallback) - Uses system-installed Edge on Windows
3. **Automatic setup**: No manual configuration needed - just run the command!

### Output

Screenshots are saved to the `screenshots/` directory with:

- High DPI (2x device pixel ratio) for sharp images
- PNG format with 100% quality
- Automatic directory creation
- Timestamp-based default filenames

## Project Structure

```
charter/
├── src/
│   ├── main.ts          # Main application logic
│   └── style.css        # Tailwind CSS imports
├── scripts/
│   └── screenshot.ts    # PNG generation script
├── screenshots/         # Generated PNG outputs
├── public/              # Static assets
├── deno.json           # Deno configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.ts      # Vite configuration
```

## Technologies Used

- **Deno** - Runtime and package manager
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Arrow.js** - Reactive UI library
- **Puppeteer** - Headless Chrome for screenshots

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `deno task dev`
5. Generate screenshots with `deno task screenshot`
6. Submit a pull request

## License

This project is licensed under the MIT License.
