# 📸 MiniGram

MiniGram is a **full-stack MERN social media application** where users can create accounts, upload posts with images, like, comment, and manage their profiles.  
Built with **React + Vite + TailwindCSS** on the frontend and **Node.js + Express + MongoDB** on the backend. 🚀

---

## ✨ Features
- 🔑 User Authentication (JWT + password hashing)
- 📝 Create, like, and comment on posts
- 🖼️ Profile image upload & edit profile
- 📱 Responsive design with TailwindCSS
- ⚡ State management with Zustand
- 🔒 Secure API with Express & MongoDB

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, TailwindCSS, Zustand
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Other:** JWT, Multer (for file uploads), Axios

---

## 📂 Project Structure

MiniGram/
├── frontend/        # React + Vite + Tailwind app (port 5173)
│   └── .gitignore   # ignores node\_modules, dist, .env
│
├── backend/         # Express + MongoDB API
│   └── .gitignore   # ignores node\_modules, .env
│
└── .gitignore       # root ignores system files


## 🚀 Getting Started

### 🔧 Backend Setup
1. Navigate to backend:
   ```bash
   cd backend

2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with:

   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   PORT=5000
   ```
4. Run backend:

   ```bash
   npm start
   ```

---

### 🎨 Frontend Setup

1. Navigate to frontend:

   ```bash
   cd frontend
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Create a `.env` file in `frontend/` with:

   ```
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Run frontend:

   ```bash
   npm run dev
   ```
5. Open in browser: 👉 [http://localhost:5173](http://localhost:5173)

---

## 📦 Deployment

* 🌐 Frontend can be deployed on **Vercel / Netlify**
* 🔧 Backend can be deployed on **Render / Railway / Heroku**

---

## 📝 Notes

* Make sure `.env` files are **never committed** (handled by `.gitignore`).
* Run backend **before frontend** for API calls to work.

---

## 👩‍💻 Author

Built with ❤️ by **Minahil**

