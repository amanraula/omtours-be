# 🧭 OmTours Backend

A powerful, modular 🌐 **Node.js + Express** backend powering the OmTours travel platform.  
Handles authentication, tour management, weather integration, and more!  
🔗 **Frontend Live**: [omtours-theta.vercel.app](https://omtours-theta.vercel.app)

---

## 📚 Table of Contents

- [📌 Overview](#-overview)  
- [✨ Features](#-features)  
- [🛠 Tech Stack](#-tech-stack)  
- [📁 Project Structure](#-project-structure)  
- [⚙️ Setup & Installation](#-setup--installation)  
- [▶️ Running the Server](#-running-the-server)  
- [📂 Folder & File Guide](#-folder--file-guide)  
- [📡 API Overview](#-api-overview)  
- [🔐 Authentication & Security](#-authentication--security)  
- [🚀 Deployment](#-deployment)  
- [🤝 Contribution](#-contribution)  
- [📄 License](#-license)  
- [🎖️ Credits & Extras](#-credits--extras)  

---

## 📌 Overview

The **OmTours Backend** is a clean, scalable REST API built with **Node.js** and **Express.js**.  
It connects seamlessly with the [OmTours Frontend](https://omtours-theta.vercel.app) and includes features like:

- 🔒 Secure user auth (JWT + bcrypt)
- ✈️ Tour CRUD operations
- 🌤 Weather data via API
- 🧱 MVC architecture
- 🧰 Clean middleware structure

---

## ✨ Features

- 👥 User authentication (signup/login)
- ✍️ Create, read, update, delete (CRUD) tours
- 🌦 Weather data for destinations
- 🧱 Modular MVC structure
- 🔒 Protected routes with middleware
- ⚠️ Error handling & validation

---

## 🛠 Tech Stack

| Tech         | Purpose                          |
|--------------|----------------------------------|
| 🟢 Node.js   | JavaScript runtime               |
| 🚂 Express.js | RESTful API framework            |
| 🍃 MongoDB    | NoSQL database (via Mongoose)    |
| 🛡 JWT       | Authentication tokens            |
| 🔐 bcryptjs  | Password hashing                 |
| 🌿 dotenv     | Environment variable management  |

---

## 📁 Project Structure

omtours-be/
├── config/ # DB & environment setup
├── controllers/ # Business logic per route
├── gemini/ # (Optional) AI/chatbot integration
├── middleware/ # Auth, validation, error handlers
├── models/ # Mongoose schemas
├── route/ # Express route definitions
├── utils/ # Helper functions
├── weather/ # Weather API logic
├── .gitignore
├── package.json
├── server.js # Entry point

yaml
Copy
Edit

🧱 Follows **MVC (Model-View-Controller)** for maintainability & clarity.

---

## ⚙️ Setup & Installation

### 📦 Prerequisites

- Node.js `v16+`
- MongoDB (Local or Atlas)
- npm (or yarn)

### 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/amanraula/omtours-be.git
cd omtours-be

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.
▶️ Running the Server
💻 Development
bash
Copy
Edit
npm run dev
✨ Auto-reloads with nodemon.
Runs on http://localhost:5000 by default.

📦 Production
bash
Copy
Edit
npm start
📂 Folder & File Guide
Folder/File	Description
config/	DB connection & environment config
controllers/	Handles API logic for users/tours
gemini/	(Optional) Chatbot or AI-related logic
middleware/	Auth checks, validation, error catching
models/	Mongoose schemas (User, Tour)
route/	API endpoints setup
utils/	Helpers (token creation, validators, etc.)
weather/	Weather API fetching & processing
server.js	Express app entry + DB connection

📡 API Overview
🔐 Auth
POST /api/auth/signup – Register a user

POST /api/auth/login – Login and receive JWT

🗺 Tours
GET /api/tours – Fetch all tours

POST /api/tours – Create new tour (admin only)

GET /api/tours/:id – Get tour by ID

PUT /api/tours/:id – Update tour (admin only)

DELETE /api/tours/:id – Delete tour (admin only)

☀️ Weather
GET /api/weather/:location – Get current weather for a city

🧪 Use Postman or Thunder Client for testing endpoints.

🔐 Authentication & Security
🧾 JWT Auth: Users receive a token upon login; required in Authorization header for protected routes.

🔐 bcryptjs: Passwords are hashed before saving to DB.

🛡 Middleware: Validates requests, protects endpoints, and handles errors.

🔒 Environment Vars: Secrets like DB URIs and JWT keys stored safely in .env.

🚀 Deployment
Set up your .env file with production-ready secrets.

Deploy on:

Render

Railway

[VPS/EC2/Droplet]

Heroku (legacy)

Run:

bash
Copy
Edit
npm install
npm start
⚠️ Remember to allow incoming ports (e.g., 5000).

🤝 Contribution
👋 Want to help improve OmTours?

bash
Copy
Edit
# Fork the repo
# Create your branch
git checkout -b feature/your-feature

# Commit your changes
git commit -m "feat: added awesome feature"

# Push & PR
git push origin feature/your-feature
📄 License
📝 MIT License

🎖️ Credits & Extras
👨‍💻 Authors
Aman Raula

Spandan Mishra

💎 Extras
Modular codebase for easy scaling

Weather integration adds practical value

Designed for seamless frontend connection

Follows Node.js best practices & clean code standards

💡 Have ideas or facing issues?
📬 Open an issue — we’d love to hear from you!
