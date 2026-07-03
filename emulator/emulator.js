class GBAEmulator {
  constructor() {
    this.rom = null;
    this.isRunning = false;
    this.isPaused = false;
    this.memory = new Uint8Array(0x10000);
    this.registers = {};
    this.cycles = 0;
    this.frameCount = 0;
    this.lastTime = Date.now();
    this.cpuFreq = 16780000; // 16.78 MHz
    this.cyclesPerFrame = Math.floor(this.cpuFreq / 60);
    
    this.setupMemory();
    this.setupRegisters();
  }

  setupMemory() {
    // Initialize GBA memory map
    this.memory = new Uint8Array(0x10000);
  }

  setupRegisters() {
    this.registers = {
      r0: 0, r1: 0, r2: 0, r3: 0,
      r4: 0, r5: 0, r6: 0, r7: 0,
      r8: 0, r9: 0, r10: 0, r11: 0,
      r12: 0, r13: 0, r14: 0, r15: 0,
      pc: 0x8000000,
      sp: 0x3007F00,
      lr: 0,
      cpsr: 0x6000001F
    };
  }

  async loadROM(romData) {
    try {
      this.rom = new Uint8Array(romData);
      console.log(`ROM loaded: ${this.rom.length} bytes`);
      this.isRunning = true;
      this.isPaused = false;
      return true;
    } catch (error) {
      console.error('Error loading ROM:', error);
      return false;
    }
  }

  async loadROMFromPath(filePath) {
    try {
      const response = await fetch(`file://${filePath}`);
      const buffer = await response.arrayBuffer();
      return this.loadROM(buffer);
    } catch (error) {
      console.error('Error loading ROM from path:', error);
      return false;
    }
  }

  runCycle() {
    if (!this.isRunning || this.isPaused || !this.rom) return;

    // Simplified CPU cycle execution
    this.cycles++;

    if (this.cycles >= this.cyclesPerFrame) {
      this.cycles = 0;
      this.frameCount++;
    }
  }

  reset() {
    this.cycles = 0;
    this.frameCount = 0;
    this.setupRegisters();
    console.log('Emulator reset');
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  togglePause() {
    this.isPaused = !this.isPaused;
  }

  getFPS() {
    const now = Date.now();
    const delta = (now - this.lastTime) / 1000;
    const fps = Math.round(this.frameCount / delta);
    return fps || 0;
  }

  saveState() {
    return {
      registers: JSON.parse(JSON.stringify(this.registers)),
      memory: new Uint8Array(this.memory),
      cycles: this.cycles,
      frameCount: this.frameCount
    };
  }

  loadState(state) {
    if (!state) return false;
    this.registers = JSON.parse(JSON.stringify(state.registers));
    this.memory = new Uint8Array(state.memory);
    this.cycles = state.cycles;
    this.frameCount = state.frameCount;
    return true;
  }
}

const emulator = new GBAEmulator();

// Setup event listeners
window.electronAPI?.onReset(() => {
  emulator.reset();
  updateStatus('Emulator reset');
});

window.electronAPI?.onTogglePause(() => {
  emulator.togglePause();
  updateStatus(emulator.isPaused ? 'Paused' : 'Running');
});

window.electronAPI?.onSaveState(() => {
  const state = emulator.saveState();
  localStorage.setItem('gba-save-state', JSON.stringify(state));
  updateStatus('State saved');
});

window.electronAPI?.onLoadState(() => {
  const state = JSON.parse(localStorage.getItem('gba-save-state'));
  if (emulator.loadState(state)) {
    updateStatus('State loaded');
  } else {
    updateStatus('No save state found');
  }
});

function updateStatus(message) {
  const statusEl = document.getElementById('status');
  if (statusEl) {
    statusEl.textContent = message;
  }
}
