# locations-app 🗺️

A small React app to browse users and their saved places — a demo project built with TypeScript and a simple Express backend for local development.

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** (LTS recommended) and **npm** installed. Verify:

```powershell
node --version
npm --version
```

### Install

Install dependencies for both frontend and backend from the repo root:

```powershell
# From project root
cd backend
npm install
cd ../frontend
npm install
```

### Run (development)

Open two terminals (or use a process manager) and start the servers:

```powershell
# Terminal 1 - backend
cd backend
npm start

# Terminal 2 - frontend
cd frontend
npm start
```

- Frontend default: `http://localhost:3000`
- Backend: runs via `nodemon server.ts` (see `backend/package.json`)

> Tip: You can also run both with a small script or tools like `concurrently` if you prefer a single command.

---

## ✅ Features (current)

- Browse users and view their saved places
- Add, update and list places (UI + client-side behavior)
- Reusable UI components: cards, avatars, modal, map
- Small, approachable codebase for learning and extension

---

## 🧭 Planned Features (V2)

These are ideas planned for a later development phase — contributions welcome!

1. **Selecting a place on a map when adding places**

   - Allow users to pick a location by clicking/tapping on an interactive map or dropping a pin while creating a place.
   - Store latitude/longitude coordinates with each place and optionally reverse-geocode to suggest an address.
   - UX: show a live map preview on the New Place form and allow fine-tuning the pin.

2. **OAuth integration & “Continue as guest” mode**
   - Add OAuth sign-in (Google/GitHub) to simplify authentication and onboarding.
   - Provide a **Continue as guest** option for read-only browsing and limited interactions without creating an account.
   - Plan: implement backend auth routes, session management, and guard write actions behind authenticated routes while offering public read access.

---

## 🏗️ Architecture & Decisions

- **Frontend:** React + TypeScript. Organized into `places/`, `user/` and `shared/` components for clarity.
- **Backend:** Minimal Express server (TypeScript) used for local development and simple API endpoints.
- **Design choice:** Keep external dependencies minimal to make the project easy to read and modify.

---

## 🛠️ Tech Stack

- React, TypeScript, React Router
- Node.js, Express (TypeScript) for backend
- CSS modules / component-level `.css` files for styling

---

## 🧪 Troubleshooting

- If the frontend doesn't start, check that dependencies are installed in `frontend/` and that port `3000` is free.
- If the backend fails to start, ensure `nodemon` and `ts-node` are installed (see `backend/package.json`).

> If you see issues with CORS when connecting frontend <-> backend, consider adding a CORS middleware to `server.ts` during development.

---

## Contributing ✅

Contributions are welcome! Suggested workflow:

1. Fork the repo and create a feature branch.
2. Implement changes and add tests where appropriate.
3. Open a pull request describing motivation and changes.

If you'd like help picking tasks, open an issue with the label **help wanted**.

---

## License

This project uses the `LICENSE` file in the repo root. Please refer to that file for full license text.

---

_Made for learning and iterative improvements — contributions and suggestions are appreciated!_
