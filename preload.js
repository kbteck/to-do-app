// Preload script for secure communication between Electron and web content
// This script runs before the web page loads and has access to both Node.js and DOM APIs

const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// limited Node.js functionality in a secure way

contextBridge.exposeInMainWorld('electronAPI', {
  // Add any API methods you want to expose to the renderer process here
  // For example:
  // getVersion: () => process.versions.electron,
  // platform: process.platform
});

// Log that preload script has loaded (for debugging)
console.log('Preload script loaded successfully');
