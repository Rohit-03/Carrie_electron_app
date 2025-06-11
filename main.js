const { app, BrowserWindow } = require('electron')
const path = require('path')

// Add electron-reload for development hot reloading
try {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
} catch (_) { 
  // electron-reload not installed in production
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    backgroundColor: '#ffffff',
    titleBarStyle: 'hiddenInset', // For macOS
    frame: process.platform === 'darwin' // Use native frame on macOS
  })

  win.loadFile('index.html')
  
  // Open DevTools in development (optional)
  if (process.env.NODE_ENV === 'development') {
    win.webContents.openDevTools()
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 