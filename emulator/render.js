const canvas = document.getElementById('screen');
const ctx = canvas.getContext('2d');

let animationId = null;
const FPS = 60;
const frameInterval = 1000 / FPS;
let lastRenderTime = 0;

// Initialize emulator on load
window.addEventListener('load', async () => {
  try {
    const romExists = await window.electronAPI?.checkRomExists();
    const gameTitle = document.getElementById('game-title');
    const gameStatus = document.getElementById('game-status');

    if (romExists) {
      const romPath = await window.electronAPI?.getRomPath();
      gameTitle.textContent = 'Game: Custom GBA Game';
      gameStatus.textContent = 'Status: ROM loaded and ready';
      
      // Initialize with default drawing
      drawBootScreen();
      startEmulator();
    } else {
      gameTitle.textContent = 'No ROM loaded';
      gameStatus.textContent = 'Status: Waiting for ROM';
      drawNoRomScreen();
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
});

function drawBootScreen() {
  // Draw GBA boot screen
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#000';
  ctx.font = 'bold 12px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Nintendo GameBoy Advance', canvas.width / 2, 50);
  
  ctx.font = '10px Arial';
  ctx.fillText('Professional Emulator Edition', canvas.width / 2, 80);
}

function drawNoRomScreen() {
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#fff';
  ctx.font = '10px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('No ROM loaded', canvas.width / 2, canvas.height / 2 - 10);
  ctx.fillText('Load ROM from File menu', canvas.width / 2, canvas.height / 2 + 10);
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
  // Draw current frame
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw a simple gradient pattern
  const imageData = ctx.createImageData(canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const value = Math.sin(emulator.frameCount * 0.01 + i * 0.0001) * 127 + 128;
    data[i] = value;     // R
    data[i + 1] = value; // G
    data[i + 2] = value; // B
    data[i + 3] = 255;   // A
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  // Update FPS counter
  const fpsEl = document.getElementById('fps');
  if (fpsEl) {
    fpsEl.textContent = `FPS: ${emulator.getFPS()}`;
  }
}

// Setup button events
document.getElementById('btn-reset')?.addEventListener('click', () => {
  emulator.reset();
  document.getElementById('game-status').textContent = 'Status: Reset';
});

document.getElementById('btn-pause')?.addEventListener('click', () => {
  emulator.togglePause();
  document.getElementById('game-status').textContent = 
    emulator.isPaused ? 'Status: Paused' : 'Status: Running';
});

document.getElementById('btn-save')?.addEventListener('click', () => {
  const state = emulator.saveState();
  localStorage.setItem('gba-save-state', JSON.stringify(state));
  document.getElementById('game-status').textContent = 'Status: State saved';
});

document.getElementById('btn-load')?.addEventListener('click', () => {
  const savedState = localStorage.getItem('gba-save-state');
  if (savedState) {
    const state = JSON.parse(savedState);
    emulator.loadState(state);
    document.getElementById('game-status').textContent = 'Status: State loaded';
  }
});

document.getElementById('btn-fullscreen')?.addEventListener('click', () => {
  if (canvas.requestFullscreen) {
    canvas.requestFullscreen();
  } else if (canvas.webkitRequestFullscreen) {
    canvas.webkitRequestFullscreen();
  }
});

// Keyboard controls
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

const keysPressed = {};

window.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  if (keyMap[key]) {
    e.preventDefault();
    keysPressed[keyMap[key]] = true;
  }
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  if (keyMap[key]) {
    keysPressed[keyMap[key]] = false;
  }
});
