const { app, BrowserWindow } = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

let mainWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1366,
    height: 768,
    minWidth: 1024,
    minHeight: 600,
    title: "OmniTrace",
    icon: path.join(__dirname, '../dist/inicio.png'),
    backgroundColor: '#f8fafc', // match bg-slate-50
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // For simple interaction in this architecture
      devTools: true
    },
  });

  // Decide whether to load the local web server (Dev) or the static file (Prod)
  const startUrl = process.env.ELECTRON_START_URL || `file://${path.join(__dirname, '../dist/index.html')}`;
  
  // If we detect we are running via 'npm run electron:dev', load localhost
  // Otherwise load the index.html build artifact
  if (process.env.npm_lifecycle_event === 'electron:dev') {
      mainWindow.loadURL('http://localhost:5173');
      mainWindow.webContents.openDevTools();
  } else {
      mainWindow.loadURL(startUrl);
      // Remove menu bar in production for an "App-like" feel
      mainWindow.setMenuBarVisibility(false);
  }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});