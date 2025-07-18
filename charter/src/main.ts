import "./style.css";
import { html, reactive } from "@arrow-js/core";

const globalStore: {} = reactive({});

async function startApp() {
}

startApp();

html`
  <div class="mx-auto p-4 bg-gray-50 dark:bg-gray-900 min-h-screen max-w-7xl">
    <h1 class="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
      Jellyfin Client Compatibility Matrix
    </h1>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden mb-6">
      <!-- Feature header -->
      <div class="bg-gray-800 dark:bg-gray-700 text-white p-4">
        <h2 class="text-xl font-semibold">General Features</h2>
        <p class="text-gray-300 dark:text-gray-400 text-sm mt-1">
          Core functionality and platform support across Jellyfin clients
        </p>
      </div>

      <!-- Compatibility table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse text-sm">
          <!-- Header row -->
          <thead>
            <tr class="bg-gray-100 dark:bg-gray-700">
              <th class="text-left p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-56 sticky left-0 bg-gray-100 dark:bg-gray-700 z-10">
                Feature
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Jellyfin Web</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v10.8.13</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">Official</div>
                </div>
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Jellyfin Android</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v2.6.2</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">Official</div>
                </div>
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Finamp</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v0.9.70</div>
                  <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">3rd Party</div>
                </div>
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Swiftfin</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v1.1.1</div>
                  <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">3rd Party</div>
                </div>
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Findroid</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v0.13.0</div>
                  <div class="text-xs text-purple-600 dark:text-purple-400 mt-1">3rd Party</div>
                </div>
              </th>
              <th class="text-center p-2 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-700 dark:text-gray-300 min-w-32">
                <div class="flex flex-col items-center">
                  <div class="text-xs mb-1 font-semibold">Kodi Plugin</div>
                  <div class="text-xs text-gray-500 dark:text-gray-400">v1.0.2</div>
                  <div class="text-xs text-blue-600 dark:text-blue-400 mt-1">Official</div>
                </div>
              </th>
            </tr>
          </thead>

          <!-- Data rows -->
          <tbody>
          <!-- Data rows -->
          <tbody>
            <!-- General Features -->
            <tr class="bg-gray-50 dark:bg-gray-700">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                🎯 General Features
              </td>
            </tr>
            
            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Server Discovery
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Quick Connect
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-orange-500 rounded flex items-center justify-center" title="Upcoming">
                  <span class="text-white text-xs font-bold">⏳</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Sync Play
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Multi-user Support
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Multi-server Support
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <!-- Browse & Play Media -->
            <tr class="bg-gray-50 dark:bg-gray-700\">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                📺 Browse & Play Media
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Play Audio
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Play Video
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Browse & Play Live TV
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <!-- Transcoding -->
            <tr class="bg-gray-50 dark:bg-gray-700\">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                ⚙️ Transcoding
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Automatic Transcoding
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Manual Transcoding
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <!-- Downloading -->
            <tr class="bg-gray-50 dark:bg-gray-700\">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                📥 Downloading & Offline
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Download Media
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Offline Usage
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <!-- Music-specific -->
            <tr class="bg-gray-50 dark:bg-gray-700\">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                🎵 Music-specific Features
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Android Auto / Apple CarPlay
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Lyrics Support
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <!-- Administration -->
            <tr class="bg-gray-50 dark:bg-gray-700\">
              <td colspan="7" class="p-3 font-semibold text-gray-800 dark:text-gray-200 border-b border-gray-200 dark:border-gray-600">
                🛠️ Administration
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Administrate Server
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-yellow-500 rounded flex items-center justify-center" title="Partial Support">
                  <span class="text-white text-xs font-bold">◐</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>

            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700\">
              <td class="p-3 border-b border-gray-200 dark:border-gray-600 font-medium text-gray-800 dark:text-gray-200 sticky left-0">
                Manage Plugins
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-green-500 rounded flex items-center justify-center" title="Supported">
                  <span class="text-white text-xs font-bold">✓</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
              <td class="p-1 border-b border-gray-200 dark:border-gray-600 text-center">
                <div class="w-8 h-8 mx-auto bg-red-500 rounded flex items-center justify-center" title="Not Supported">
                  <span class="text-white text-xs font-bold">✗</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Legend -->
      <div class="bg-gray-50 dark:bg-gray-700 p-4 border-t border-gray-200 dark:border-gray-600">
        <h3 class="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Legend:</h3>
        <div class="flex flex-wrap gap-4 text-sm">
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-green-500 rounded flex items-center justify-center">
              <span class="text-white text-xs">✓</span>
            </div>
            <span class="text-gray-700 dark:text-gray-300">Supported</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-yellow-500 rounded flex items-center justify-center">
              <span class="text-white text-xs">◐</span>
            </div>
            <span class="text-gray-700 dark:text-gray-300">Partial Support</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-red-500 rounded flex items-center justify-center">
              <span class="text-white text-xs">✗</span>
            </div>
            <span class="text-gray-700 dark:text-gray-300">Not Supported</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-4 h-4 bg-orange-500 rounded flex items-center justify-center">
              <span class="text-white text-xs">⏳</span>
            </div>
            <span class="text-gray-700 dark:text-gray-300">Upcoming</span>
          </div>
        </div>
        <div class="mt-3 text-xs text-gray-600 dark:text-gray-400">
          <p><strong>Official:</strong> Maintained by Jellyfin team • <strong>3rd Party:</strong> Community-maintained clients</p>
        </div>
      </div>
    </div>
  </div>
`(document.querySelector<HTMLDivElement>("#app")!);

