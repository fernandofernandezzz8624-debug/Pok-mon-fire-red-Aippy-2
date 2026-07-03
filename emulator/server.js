const express = require('express');
const path = require('path');
const app = express();

// Servir archivos estáticos
app.use(express.static(__dirname));

// Rutas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mobile', (req, res) => {
  res.sendFile(path.join(__dirname, 'mobile.html'));
});

// Manejo de 404
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🎮 GBA Emulator corriendo en http://localhost:${PORT}`);
  console.log(`📱 Versión móvil: http://localhost:${PORT}/mobile.html`);
  console.log(`🖥️  Versión desktop: http://localhost:${PORT}/index.html`);
});
