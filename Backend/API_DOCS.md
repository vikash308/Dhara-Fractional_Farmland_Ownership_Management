# 📑 Dhara API Documentation (v1.0)

This document provides a comprehensive guide to the Dhara Backend API.

## Base URL
- Local: `http://localhost:3000`
- Production: `https://dhara-frontend-8b49.onrender.com`

---

## 🔐 Authentication
All private routes require a `Bearer <token>` in the `Authorization` header.

### 1. Signup
- **URL:** `/api/auth/signup`
- **Method:** `POST`
- **Body:** `{ name, email, password, phone, role }`

### 2. Login
- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:** `{ email, password }`

### 3. Google Login
- **URL:** `/api/auth/google`
- **Method:** `POST`
- **Body:** `{ idToken, accessToken }` (Supports both flows)

---

## 🚜 Farmland Management

### 1. Get All Farms
- **URL:** `/api/farms`
- **Method:** `GET`
- **Response:** List of all verified farms with starting price and funding status.

### 2. Get Farm Details
- **URL:** `/api/farms/:id`
- **Method:** `GET`
- **Response:** Farm details + associated plots.

### 3. Create Farm (Farmer Only)
- **URL:** `/api/farms`
- **Method:** `POST` (Multipart/Form-data)
- **Body:** `{ name, location, totalArea, description, soilType, images: File[] }`

---

## 📉 Plots & Bookings

### 1. Book a Plot
- **URL:** `/api/bookings`
- **Method:** `POST`
- **Body:** `{ plotId, farmId, startDate, endDate, selectedCrop }`

### 2. My Bookings (User/Investor)
- **URL:** `/api/bookings/my`
- **Method:** `GET`

---

## 🌱 Crop Progress & Logs (Bonding Features)

### 1. Add Crop Log (Farmer Only)
- **URL:** `/api/croplogs`
- **Method:** `POST` (Multipart/Form-data)
- **Body:** `{ bookingId, title, description, growthStage, healthStatus, image: File }`

### 2. Update Crop Log (Farmer Only)
- **URL:** `/api/croplogs/:id`
- **Method:** `PUT` (Multipart/Form-data)
- **Feature:** Deletes old image from Cloudinary and replaces it with the new one.

### 3. Get Crop Logs
- **URL:** `/api/croplogs/:bookingId`
- **Method:** `GET`

---

## 🖼 Image Management (Cloudinary)
All images are managed via Cloudinary.
- **Folder:** `dhara`
- **Deletion Logic:** Implemented for crop logs to ensure storage efficiency.

---

## 🛠 Middlewares
- `verifyToken`: Validates JWT and attaches user to `req.user`.
- `checkFarmer`: Ensures only users with the `farmer` role can access the endpoint.
- `upload`: Handles multipart file uploads and Cloudinary integration.
