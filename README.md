# `<PassOP/>` - Your Own Password Manager

A secure, intuitive, and modern local password manager that allows you to store, manage, and copy your credentials with ease. This project is built using a modern Full-Stack MERN-like architecture (React, Express, MongoDB) featuring styling powered by **Tailwind CSS v4** and interactive micro-animations powered by **Lordicon**.

---

## 🚀 Features

- **Save Credentials**: Easily store Website URL, Username, and Password.
- **Toggle Password Visibility**: View or hide your passwords securely with an eye toggle button.
- **Copy to Clipboard**: Quick-copy icons for Website URLs, Usernames, and Passwords.
- **Edit & Delete**: Modify or remove credentials instantly with a confirmation modal.
- **Fully Responsive Design**:
  - Elegant **Table layout** for desktop screens.
  - Interactive **Card layout** optimized for mobile viewports.
- **Persistent Storage**: Integrates directly with a local **MongoDB** database to keep your passwords secure and persistent.
- **Elegant User Interface**: Styled with Tailwind CSS v4 featuring vibrant green highlights, smooth hover transitions, and toast notifications (via `react-toastify`).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS v4 (incorporating modern layout utilities)
- **Utilities**: 
  - `uuid` (for unique credential identifiers)
  - `react-toastify` (for beautiful action notifications)
  - `Lordicon` (for rich, animated icons)

### Backend
- **Framework**: Node.js & Express
- **Database**: MongoDB (via the official `mongodb` driver)
- **Middleware**: `cors` (for cross-origin requests), `body-parser` (for JSON bodies)

---

## 📂 Project Structure

```text
passop-mongo/
├── backend/                  # Express server & Database configuration
│   ├── server.js             # Main server logic & API routes
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment configuration
├── src/                      # Frontend source code
│   ├── components/
│   │   ├── Navbar.jsx        # Navigation bar
│   │   ├── Manager.jsx       # Core Password Manager logic & UI
│   │   └── Footer.jsx        # App footer
│   ├── App.jsx               # Main App component
│   ├── main.jsx              # App entry point
│   ├── index.css             # Tailwind imports & custom CSS variables
│   └── App.css               # Component styling
├── index.html                # HTML entry point (contains Lordicon script)
├── package.json              # Frontend package manifest
└── vite.config.js            # Vite configuration with @tailwindcss/vite
```

---

## ⚙️ Setup & Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) (running locally on `mongodb://localhost:27017`)

---

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Express server:
   ```bash
   node server.js
   ```
   *The backend server should start running at `http://localhost:3000`.*

---

### 2. Frontend Setup
1. Navigate back to the project root directory:
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *Open the URL provided in your terminal (usually `http://localhost:5173`) in your web browser.*

---

## 🔌 API Documentation (Backend)

The Express backend exposes the following endpoints on `http://localhost:3000`:

| Method | Endpoint | Description | Request Body |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Retrieve all stored passwords. | *None* |
| **POST** | `/` | Save a new password entry. | `{ site, username, password, id }` |
| **DELETE** | `/` | Delete a password entry. | `{ id }` |

---

## 📝 License
This project is for educational purposes. Built as part of **CodeWithHarry** web development tutorial. Feel free to clone, customize, and extend it for your own learning!
