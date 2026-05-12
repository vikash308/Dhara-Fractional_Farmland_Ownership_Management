# 🌱 Dhara: Fractional Farmland Ownership & Management

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-green.svg)](https://mongodb.com)
[![Cloudinary](https://img.shields.io/badge/Storage-Cloudinary-blue.svg)](https://cloudinary.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Dhara** is a cutting-edge fractional farmland ownership platform designed to bridge the gap between urban investors and rural farmers. It empowers users to invest in high-yield crops and managed farmlands while providing farmers with the capital and technology they need to thrive.

## 📂 Project Structure

- [**🎨 Frontend Application**](./frontend/README.md) - React/Vite app with DFD and UI flow.
- [**🖥️ Backend Service**](./Backend/README.md) - Node/Express API with ER Diagram and Database schema.

### 🌐 [Live Demo](https://dhara-frontend-8b49.onrender.com)

---

## ✨ Key Features

### 🚜 For Investors
- **Fractional Ownership:** Invest in small plots of high-quality managed farmland.
- **Crop Selection:** Choose from a variety of premium crops (Basmati Rice, Saffron, Alphonso Mango, etc.).
- **Real-time Monitoring:** Daily/Weekly crop progress updates with live images via Cloudinary.
- **Legal Security:** Downloadable legally-binding sample agreements with digital stamps.
- **Farmer Bonding:** Premium farmer profiles to know exactly who is growing your food.

### 👩‍🌾 For Farmers
- **Resource Management:** Easily list and manage multiple farms and plots.
- **Direct Interaction:** Build trust with investors through personal notes and progress logs.
- **Automated Invoicing:** Seamless booking and transaction management.

---

## 🛠 Tech Stack

| Frontend | Backend | Cloud & DevOps |
| :--- | :--- | :--- |
| React.js (Vite) | Node.js & Express | MongoDB (Atlas) |
| Tailwind CSS | JWT & Google OAuth | Cloudinary (Image Management) |
| Framer Motion | Multer | Render / Vercel |

---

## 📸 Sneak Peek (Real UI)

| Premium Home Page | Modern Login Interface |
| :---: | :---: |
| ![Home Page](./docs/screenshots/home_page.png) | ![Login Page](./docs/screenshots/login_page.png) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas Account
- Cloudinary Account
- Google Cloud Console Project (for OAuth)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/dhara.git
   cd dhara
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   # Create .env file based on .env.example
   node seed_db.js # To populate initial premium data
   npm run start
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   # Create .env file based on .env.example
   npm run dev
   ```

---

## 🔐 Environment Variables

### Backend
- `MONGO_URL`: Your MongoDB connection string.
- `JWT_SECRET`: Secret key for authentication.
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: For image storage.
- `GOOGLE_CLIENT_ID`: For Google OAuth.

### Frontend
- `VITE_API_URL`: Backend URL.
- `VITE_GOOGLE_CLIENT_ID`: Your Google Client ID.

---

## 📜 API Documentation

Detailed API documentation can be found in [API_DOCS.md](./Backend/API_DOCS.md).

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <b>Vikash Pandey</b> & the <b>Dhara Team</b>
</p>
