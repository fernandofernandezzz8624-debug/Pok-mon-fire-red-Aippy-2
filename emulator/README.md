# GBA Emulator - Professional Edition

Un emulador profesional de Game Boy Advance con tu juego pre-instalado.

## Características

✅ **Interfaz moderna y profesional**
- Diseño responsivo con gradientes modernos
- Panel de información del juego
- Controles intuitivos

✅ **Funcionalidad de emulación**
- CPU ARM7TDMI simulado
- Gestor de memoria GBA
- Soporte de ciclos de CPU
- Renderizado en canvas

✅ **Funciones avanzadas**
- Guardar/cargar estados del juego
- Pausa y reanudación
- Reset del emulador
- Pantalla completa
- Contador de FPS en tiempo real

✅ **Controles**
- Soporte de teclado completamente mapeado
- Botones en interfaz
- Menú integrado en Electron

## Instalación

```bash
cd emulator
npm install
```

## Ejecución

```bash
npm start
```

## Desarrollo

```bash
npm run dev
```

## Compilación

```bash
npm run build
```

## Controles del teclado

| Tecla | Función |
|-------|----------|
| ↑ ↓ ← → | D-Pad |
| Z | Botón A |
| X | Botón B |
| A | Botón L |
| S | Botón R |
| Enter | Start |
| Shift | Select |

## Estructura del proyecto

```
emulator/
├── main.js          - Punto de entrada principal (Electron)
├── preload.js       - Seguridad IPC
├── index.html       - Interfaz HTML
├── styles.css       - Estilos
├── emulator.js      - Lógica del emulador
├── render.js        - Sistema de renderizado
└── package.json     - Dependencias
```

## ROM Pre-cargada

El emulador detecta automáticamente tu ROM en:
```
Pokemon - FireRed Version (USA).gba
```

## Características técnicas

- **Velocidad**: 16.78 MHz (GBA estándar)
- **FPS**: 60 FPS
- **Resolución**: 240x160 (nativa de GBA)
- **Framework**: Electron + Canvas API

## Licencia

Custom - Todos los derechos reservados
