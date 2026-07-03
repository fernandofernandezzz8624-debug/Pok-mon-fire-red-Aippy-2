// Configuración del emulador GBA

const EMULATOR_CONFIG = {
  // Especificaciones de hardware
  cpu: {
    frequency: 16780000, // 16.78 MHz
    architecture: 'ARM7TDMI'
  },

  // Pantalla
  display: {
    width: 240,
    height: 160,
    fps: 60,
    colors: 32768 // 15-bit color (5-5-5 RGB)
  },

  // Memoria
  memory: {
    internalRAM: 32768,      // 32 KB
    externalRAM: 262144,     // 256 KB
    romSize: 33554432        // 32 MB
  },

  // Audio
  audio: {
    sampleRate: 32000,
    channels: 2
  },

  // Rutas
  paths: {
    rom: '../Pokemon - FireRed Version (USA).gba',
    saves: './saves/',
    screenshots: './screenshots/'
  },

  // Opciones de desarrollo
  debug: {
    showFPS: true,
    showMemory: false,
    showRegisters: false
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = EMULATOR_CONFIG;
}
