const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getRomPath: () => ipcRenderer.invoke('get-rom-path'),
  checkRomExists: () => ipcRenderer.invoke('check-rom-exists'),
  onLoadRom: (callback) => ipcRenderer.on('load-rom-dialog', callback),
  onReset: (callback) => ipcRenderer.on('reset-emulator', callback),
  onTogglePause: (callback) => ipcRenderer.on('toggle-pause', callback),
  onSaveState: (callback) => ipcRenderer.on('save-state', callback),
  onLoadState: (callback) => ipcRenderer.on('load-state', callback),
  onShowAbout: (callback) => ipcRenderer.on('show-about', callback)
});
