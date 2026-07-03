const { app, BrowserWindow, Menu } = require('electron');
const path = require('path');
const fs = require('fs');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, 'assets/icon.png')
  });

  mainWindow.loadFile('index.html');

  // Crear menú
  const menu = Menu.buildFromTemplate([
    {
      label: 'File',
      submenu: [
        {
          label: 'Load ROM',
          click: () => {
            mainWindow.webContents.send('load-rom-dialog');
          }
        },
        { type: 'separator' },
        {
          label: 'Exit',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Emulator',
      submenu: [
        {
          label: 'Reset',
          click: () => {
            mainWindow.webContents.send('reset-emulator');
          }
        },
        {
          label: 'Pause/Resume',
          click: () => {
            mainWindow.webContents.send('toggle-pause');
          }
        },
        {
          label: 'Save State',
          click: () => {
            mainWindow.webContents.send('save-state');
          }
        },
        {
          label: 'Load State',
          click: () => {
            mainWindow.webContents.send('load-state');
          }
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: 'About',
          click: () => {
            mainWindow.webContents.send('show-about');
          }
        }
      ]
    }
  ]);

  Menu.setApplicationMenu(menu);
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

// IPC handlers
const ipcMain = require('electron').ipcMain;

ipcMain.handle('get-rom-path', async () => {
  return path.join(__dirname, '../Pokemon - FireRed Version (USA).gba');
});

ipcMain.handle('check-rom-exists', async () => {
  const romPath = path.join(__dirname, '../Pokemon - FireRed Version (USA).gba');
  return fs.existsSync(romPath);
});
