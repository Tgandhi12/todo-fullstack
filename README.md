TodoFlow Frontend is a responsive web client built with React, Vite, TypeScript, and Tailwind CSS. It provides users with a smooth and modern interface to manage tasks efficiently. Features include authentication pages (login, register, forgot password), task creation/editing, category filters, list/grid views, and a dashboard with live stats. Axios and React Router are used for API integration and navigation. The frontend is optimized for usability with a clean design, quick filtering, and error handling to ensure a seamless user experience.
# 🎨 TodoFlow Frontend (React + Vite + Tailwind)

This is the **frontend** of the TodoFlow full-stack application.  
Built with **React, Vite, TypeScript, and Tailwind CSS**, it provides a clean UI for managing tasks with categories, due dates, importance flags, and user authentication.

---

## ✨ Features
- 🔐 Authentication: Register, Login, Forgot Password
- ✅ Task Management: Create, Edit, Delete, Complete/Undo
- ⭐ Prioritization: Mark tasks as important
- 📅 Date Handling: Scheduled + Due dates
- 📂 Category filters (Household, Sports, Buying, etc.)
- 📊 Dashboard with stats
- 🎨 Modern UI with Tailwind (responsive, list/grid views)

---

## 🏗 Project Structure
src/
├── components/ # Reusable UI components
├── pages/ # Page-level views (Home, Auth, etc.)
├── lib/ # Axios instance
├── utils/ # Helpers (normalizeTodo, fmtDate)
└── main.tsx # App entry
