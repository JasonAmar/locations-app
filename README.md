# locations-app

> A small React app to browse users and their saved places — a demo project.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Install](#install)
  - [Run (development)](#run-development)
  - [Build (production)](#build-production)
- [Contributing](#contributing)
- [License](#license)

## About

`locations-app` is a small client-side React application that displays users and their places. The repository contains a mix of JavaScript and TypeScript components and focuses on UI components for lists, navigation, forms, and a map view.

## Features

- Browse users and view their saved places
- Add new places through a simple form (UI only)
- Reusable UI components: cards, avatars, modal, map
- Minimal, easy-to-read project structure suitable for learning and extension

## Project Structure

- `src/` — application source code
  - `places/` — places pages and components (`PlaceList`, `PlaceItem`, `NewPlace`)
  - `shared/` — shared UI, navigation, and form elements (e.g., `Map.tsx`, `Modal.tsx`, `Button.js`)
  - `user/` — user list and user-places pages
  - `App.js`, `index.js` — app entry and routing
- `public/` — static assets and HTML

Key files:

- `src/App.js` — main app component and routes
- `src/index.js` — application bootstrap
- `src/shared/components/UIElements/Map.tsx` — map UI component
- `src/places/pages/NewPlace.tsx` — new place page (TypeScript)

## Tech Stack

- React
- JavaScript and TypeScript mixed components
- CSS for styling (component-level .css files)
- Node.js / npm for package management and scripts

## Getting Started

### Prerequisites

- Node.js (recommend LTS) and npm installed. Verify with:

```powershell
node --version
npm --version
```

### Install

Install dependencies from the project root:

```powershell
npm install
```

### Run (development)

Start the dev server (use the project's `start` or `dev` script):

```powershell
npm start
```

If your `package.json` uses a `dev` script instead, run:

```powershell
npm run dev
```

Open `http://localhost:3000` (or the port shown in terminal) to view the app.

### Build (production)

Create an optimized production build:

```powershell
npm run build
```

The output will be in the `build/` or `dist/` folder depending on your build setup.

## Contributing

Contributions are welcome. Suggested workflow:

1. Fork the repo and create a feature branch.
2. Implement your changes and add clear commit messages.
3. Open a pull request describing the change and motivation.

If you'd like help picking a small task, open an issue or message the maintainer.

## License

This project includes a `LICENSE` file in the repository root. Please refer to that file for licensing details.

---
