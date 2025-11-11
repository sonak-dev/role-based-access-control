# Role-Based Access Control (RBAC) API

A secure and scalable **Role-Based Authorization System** built using **Node.js, Express, MongoDB, JWT, and Bcrypt**.
This project demonstrates how real applications implement **Authentication + Authorization** with Admin, Manager, and User access levels.

---

## 🚀 Features

* 🔐 **JWT Authentication** (Login, Token Verification)
* 👥 **Role-Based Authorization** (Admin, Manager, User)
* 🧱 Clean MVC Folder Structure
* 🔑 Secure Password Hashing using Bcrypt
* ✅ Protected Routes
* 📂 Modular Middlewares (verifyToken + authorizeRole)
* 🗄️ MongoDB + Mongoose User Model
* 🧪 Easy to extend for real projects

---

## 📂 Project Structure

```
root/
│── config/
│   ├── env.js
│   └── connectMongoDB.js
│
│── controllers/
│   └── auth.controller.js
│
│── middlewares/
│   ├── auth.middleware.js
│   └── role.middleware.js
│
│── models/
│   └── user.model.js
│
│── routes/
│   ├── auth.route.js
│   └── user.route.js
│
│── server.js
└── package.json
```

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT**
* **Bcrypt**

---

## 🔐 Authentication Flow

1. User registers → Password hashed and saved
2. User logs in → JWT token created
3. Protected routes require: `verifyToken`
4. Role protected routes require: `authorizeRole("admin")`

---

## ✅ API Endpoints

### **Auth Routes**

| Method | Endpoint  | Description            |
| ------ | --------- | ---------------------- |
| POST   | /register | Create new user        |
| POST   | /login    | Login user & get token |

### **Protected Routes (RBAC)**

| Role Access     | Method | Endpoint      | Description            |
| --------------- | ------ | ------------- | ---------------------- |
| Admin only      | GET    | /admin-data   | Admin dashboard        |
| Admin + Manager | GET    | /manager-data | Manager dashboard      |
| All roles       | GET    | /user-data    | User profile/dashboard |

---

## 🔑 Middleware Logic

### ✅ verifyToken

* Reads token from header
* Verifies JWT
* Finds user in DB
* Adds `req.user`

### ✅ authorizeRole

* Checks if `req.user.role` is allowed
* Returns **403 Access Denied** if not allowed

---

## 📌 Sample Environment Variables

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=5d
```

---

## ▶️ How to Run

```
npm install
npm start
```

---

## ✅ Future Enhancements

* ✅ Refresh Tokens
* ✅ Dynamic Role Management
* ✅ Permission-Level Access
* ✅ User Profile Update

---

## ❤️ Author

Made with focus and dedication by **Sonak Jha**.

A clean and real-world example of RBAC using Node.js.

---
