# GBA Emulator Mobile Edition

Un emulador profesional de Game Boy Advance completamente optimizado para dispositivos móviles.

## 🎮 Características Móviles

✅ **Interfaz táctil completa**
- D-Pad responsivo
- Botones de acción (A, B)
- Botones de hombro (L, R)
- Botones de control (Select, Start)

✅ **Optimización para móviles**
- Diseño responsive
- Soporte para orientación vertical y horizontal
- Sin zoom automático
- Sin elementos seleccionables
- Rendimiento optimizado para pantallas pequeñas

✅ **Funcionalidades**
- Guardar/cargar estados del juego
- Menú integrado táctil
- Pantalla completa
- Contador de FPS en tiempo real

✅ **ROM Pre-cargada**
- Tu juego se carga automáticamente

## 🚀 Uso en Web Móvil

### Opción 1: Servir con HTTP Server (Local)
```bash
cd emulator
npx http-server
```
Luego accede a `http://tu-ip:8080/mobile.html` desde tu móvil

### Opción 2: Usar con Node.js
```bash
cd emulator
npm install express
node server.js
```

### Opción 3: Subir a hosting web
- Deploy a Firebase Hosting, Netlify, Vercel, etc.
- Accede desde cualquier navegador móvil

## 📱 Controles Táctiles

| Botón | Función |
|-------|---------|
| D-Pad | Movimiento |
| A | Botón primario |
| B | Botón secundario |
| L / R | Botones de hombro |
| SELECT | Botón Select |
| START | Botón Start |
| ☰ Menu | Abre menú de juego |
| ⛶ Full | Pantalla completa |

## ⌨️ Teclado (Para Pruebas)

| Tecla | Función |
|-------|---------|
| Arrow Keys | D-Pad |
| Z | A |
| X | B |
| A | L |
| S | R |
| Enter | Start |
| Shift | Select |

## 📁 Archivos

```
emulator/
├── mobile.html          - Interfaz principal móvil
├── mobile-styles.css    - Estilos optimizados
├── mobile-render.js     - Controles táctiles
├── emulator.js          - Núcleo del emulador
├── config.js            - Configuración
└── README.md            - Esta documentación
```

## 🔧 Características Técnicas

- **Resolución**: 240x160 (Nativa GBA)
- **FPS**: 60 FPS
- **CPU**: 16.78 MHz simulado
- **Pantalla táctil**: Soporte multi-touch
- **Orientación**: Vertical y Horizontal
- **Almacenamiento**: LocalStorage para saved states

## 📱 Dispositivos Soportados

✅ iOS Safari
✅ Android Chrome
✅ Android Firefox
✅ Tablets iPad/Android
✅ Navegadores con soporte HTML5

## 🎯 Instalación Rápida

1. Clona el repositorio
2. Navega a la carpeta `emulator/`
3. Sirve los archivos con un servidor HTTP
4. Abre `mobile.html` en tu navegador móvil
5. ¡A jugar!

## 💾 Guardar Progreso

- El emulador guarda automáticamente en LocalStorage
- Los estados se persisten entre sesiones
- Accede al menú (☰) para guardar/cargar manualmente
