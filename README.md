# My Tasks - Personal To-Do Manager 📝

A beautiful, offline-capable task management desktop application built with **HTML, CSS, JavaScript**, and packaged as a native desktop app using **Electron**.

![License](https://img.shields.io/badge/license-ISC-blue.svg)
![Electron](https://img.shields.io/badge/Electron-41.0.0-blue.svg)

## ✨ Features

- ✅ **Native Desktop App** - Runs as a standalone application on Windows, macOS, and Linux
- 💾 **Offline Storage** - All tasks saved locally, works without internet
- 🎨 **Beautiful UI** - Clean, modern interface with dark mode support
- 🔄 **Progressive Web App (PWA)** - Can also run in the browser
- ⌨️ **Keyboard Shortcuts** - Quick access with hotkeys
- 📱 **Responsive Design** - Adapts to any window size
- 🖼️ **Custom Icon** - Professional app icon included

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Structure and content
- **CSS3** - Styling with CSS variables for theming
- **JavaScript (Vanilla)** - Task management logic

### Desktop App
- **Electron** - Cross-platform desktop application framework
- **electron-builder** - Package and distribute the app

## 📦 Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Clone the Repository
```bash
git clone https://github.com/kbteck/to-do-app.git
cd to-do-app
```

### Install Dependencies
```bash
npm install
```

## 🚀 Running the App

### Development Mode
Run the app in development mode:
```bash
npm start
```

This will launch the desktop application window.

## 📦 Building for Distribution

Build installers for different platforms:

### Build for Windows
```bash
npm run build:win
```
Creates: `dist/My Tasks Setup 1.0.0.exe`

### Build for macOS
```bash
npm run build:mac
```
Creates: `dist/My Tasks.dmg` and `dist/My Tasks.zip`

### Build for Linux
```bash
npm run build:linux
```
Creates: `dist/My-Tasks.AppImage` and `dist/My-Tasks.deb`

### Build for All Platforms
```bash
npm run build:all
```

## 📂 Project Structure

```
to-do-app/
├── electron-main.js      # Electron main process
├── preload.js            # Electron preload script
├── index.html            # Main app interface
├── sw.js                 # Service worker for PWA
├── manifest.json         # PWA manifest
├── icon-192.png          # App icon (192x192)
├── icon-512.png          # App icon (512x512)
├── icon-generator.html   # Icon generation tool
├── package.json          # Project configuration
└── .gitignore           # Git ignore rules
```

## 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run the app in development mode |
| `npm run build` | Build installer for current platform |
| `npm run build:win` | Build Windows installer (NSIS) |
| `npm run build:mac` | Build macOS installer (DMG) |
| `npm run build:linux` | Build Linux installer (AppImage, deb) |
| `npm run build:all` | Build for all platforms |

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + R` | Reload the app |
| `Ctrl/Cmd + Q` | Quit the app |

## 🖥️ Platform Support

- ✅ **Windows** 7/8/10/11 (64-bit)
- ✅ **macOS** 10.12+ (Sierra and later)
- ✅ **Linux** (AppImage and Debian-based distributions)

## 📄 License

ISC License - See repository for details

## 👨‍💻 Developer

**kbteck** - [GitHub Profile](https://github.com/kbteck)

## 🌐 Repository

[https://github.com/kbteck/to-do-app](https://github.com/kbteck/to-do-app)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📝 Notes

- Built files and dependencies are excluded from version control
- The app stores data locally using browser storage APIs
- No server or database required - completely client-side

---

**Enjoy managing your tasks!** ⭐ If you find this useful, please consider giving it a star on GitHub!
