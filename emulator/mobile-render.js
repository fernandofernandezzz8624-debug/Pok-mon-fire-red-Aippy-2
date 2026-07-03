const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let animationId = null;
const FPS = 60;
const frameInterval = 1000 / FPS;
let lastRenderTime = 0;

// Touch state
const touchState = {
  up: false,
  down: false,
  left: false,
  right: false,
  a: false,
  b: false,
  l: false,
  r: false,
  start: false,
  select: false
};

// Initialize on load
window.addEventListener('load', async () => {
  try {
    drawBootScreen();
    setupTouchControls();
    setupMenu();
    startEmulator();
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

function drawBootScreen() {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#000';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Nintendo GameBoy Advance', canvas.width / 2, 50);
  
  ctx.font = '10px Arial';
  ctx.fillText('Mobile Edition', canvas.width / 2, 80);
  
  document.getElementById('game-title').textContent = 'Mobile GBA Emulator';
  document.getElementById('game-status').textContent = 'Ready to play';
  document.getElementById('status').textContent = 'Running';
}

function setupTouchControls() {
  // D-Pad
  document.getElementById('btn-up')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.up = true;
  });
  document.getElementById('btn-up')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.up = false;
  });

  document.getElementById('btn-down')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.down = true;
  });
  document.getElementById('btn-down')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.down = false;
  });

  document.getElementById('btn-left')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.left = true;
  });
  document.getElementById('btn-left')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.left = false;
  });

  document.getElementById('btn-right')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.right = true;
  });
  document.getElementById('btn-right')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.right = false;
  });

  // Action Buttons
  document.getElementById('btn-a')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.a = true;
  });
  document.getElementById('btn-a')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.a = false;
  });

  document.getElementById('btn-b')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.b = true;
  });
  document.getElementById('btn-b')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.b = false;
  });

  // Shoulder Buttons
  document.getElementById('btn-l')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.l = true;
  });
  document.getElementById('btn-l')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.l = false;
  });

  document.getElementById('btn-r')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.r = true;
  });
  document.getElementById('btn-r')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.r = false;
  });

  // Control Buttons
  document.getElementById('btn-select')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.select = true;
  });
  document.getElementById('btn-select')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.select = false;
  });

  document.getElementById('btn-start')?.addEventListener('touchstart', (e) => {
    e.preventDefault();
    touchState.start = true;
  });
  document.getElementById('btn-start')?.addEventListener('touchend', (e) => {
    e.preventDefault();
    touchState.start = false;
  });

  // Keyboard support (for testing)
  const keyMap = {
    'ArrowUp': 'up',
    'ArrowDown': 'down',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'z': 'a',
    'x': 'b',
    'a': 'l',
    's': 'r',
    'Enter': 'start',
    'Shift': 'select'
  };

  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
      e.preventDefault();
      touchState[keyMap[key]] = true;
    }
  });

  window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (keyMap[key]) {
      touchState[keyMap[key]] = false;
    }
  });
}

function setupMenu() {
  document.getElementById('btn-menu')?.addEventListener('click', () => {
    document.getElementById('menu-modal').classList.remove('hidden');
  });

  document.getElementById('menu-close')?.addEventListener('click', () => {
    document.getElementById('menu-modal').classList.add('hidden');
  });

  document.getElementById('menu-reset')?.addEventListener('click', () => {
    emulator.reset();
    document.getElementById('game-status').textContent = 'Reset';
    document.getElementById('menu-modal').classList.add('hidden');
  });

  document.getElementById('menu-pause')?.addEventListener('click', () => {
    emulator.togglePause();
    document.getElementById('game-status').textContent = emulator.isPaused ? 'Paused' : 'Playing';
    document.getElementById('menu-modal').classList.add('hidden');
  });

  document.getElementById('menu-save')?.addEventListener('click', () => {
    const state = emulator.saveState();
    localStorage.setItem('gba-save-state', JSON.stringify(state));
    document.getElementById('game-status').textContent = 'Saved!';
    document.getElementById('menu-modal').classList.add('hidden');
  });

  document.getElementById('menu-load')?.addEventListener('click', () => {
    const savedState = localStorage.getItem('gba-save-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      emulator.loadState(state);
      document.getElementById('game-status').textContent = 'Loaded!';
    } else {
      document.getElementById('game-status').textContent = 'No save found';
    }
    document.getElementById('menu-modal').classList.add('hidden');
  });

  document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen();
    }
  });

  // Close menu when tapping outside
  document.getElementById('menu-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'menu-modal') {
      document.getElementById('menu-modal').classList.add('hidden');
    }
  });
}

function startEmulator() {
  function gameLoop(currentTime) {
    if (currentTime - lastRenderTime >= frameInterval) {
      emulator.runCycle();
      renderFrame();
      lastRenderTime = currentTime;
    }
    animationId = requestAnimationFrame(gameLoop);
  }
  animationId = requestAnimationFrame(gameLoop);
}

function renderFrame() {
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.sin(emulator.frameCount * 0.01 + i * 0.0001) * 127 + 128;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = 255;
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  const fpsEl = document.getElementById('fps');
  if (fpsEl) {
    fpsEl.textContent = `${emulator.getFPS()} FPS`;
  }
}

// Prevent default touch behaviors
document.addEventListener('touchmove', (e) => {
  if (e.target.closest('.controls-container') || 
      e.target.closest('.shoulder-container') ||
      e.target.closest('.control-panel') ||
      e.target.closest('.menu-buttons')) {
    e.preventDefault();
  }
}, { passive: false });

// Disable zoom on double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTouchEnd <= 300) {
    e.preventDefault();
  }
  lastTouchEnd = now;
}, false);
