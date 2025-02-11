Todo Application - Frontend

Description

The Todo Application Frontend is a React.js single-page application that provides a clean and user-friendly interface for managing todos. It integrates with a Node.js backend API for user authentication and task management.

Features

✅ User Authentication (Register/Login with JWT)
✅ Todo Management (Add, View, Delete Todos)
✅ Protected Routes (Only logged-in users can access Todos)
✅ API Integration using Axios
✅ Modern UI (Can be styled with Tailwind, Bootstrap, etc.)

1️⃣ Frontend Setup (React.js)

🔹 Install Dependencies

npx create-react-app todo-frontend
cd todo-frontend
npm install axios react-router-dom

🔹 Configure API Calls

Ensure API calls in src/App.js point to the backend at http://localhost:5000/api.
