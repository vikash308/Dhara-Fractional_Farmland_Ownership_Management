# Dhara API Documentation

Base URL: `http://localhost:3000/api`

## 🔐 Authentication
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/auth/signup` | POST | Create new user/farmer account | No |
| `/auth/login` | POST | Login with email/password and get JWT | No |
| `/auth/google` | POST | Login/Signup using Google OAuth | No |

## 🚜 Farms
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/farms` | GET | List all available farms for investors | No |
| `/farms/details/:id` | GET | Get specific farm details + available plots | No |
| `/farms` | POST | Create a new farm (with images) | Yes (Farmer) |
| `/farms/farmer` | GET | Get all farms owned by the logged-in farmer | Yes (Farmer) |

## 📐 Plots
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/plots/:farmId` | GET | Get all plots for a specific farm | No |
| `/plots/farmer` | GET | Get all plots managed by the logged-in farmer | Yes (Farmer) |
| `/plots` | POST | Add a new plot to a farm | Yes (Farmer) |
| `/plots/status/:id` | PATCH | Update plot availability status | Yes (Farmer) |

## 📅 Bookings
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/bookings` | POST | Create a new booking for a plot | Yes (User) |
| `/bookings/my` | GET | Get all bookings for the logged-in investor | Yes (User) |
| `/bookings/farmer` | GET | Get all booking requests for a farmer's lands | Yes (Farmer) |
| `/bookings/:id` | PATCH | Update booking status or select crop | Yes (Both) |

## 🌾 Crops
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/crops` | GET | List all available crop types | No |
| `/crops` | POST | Create a new crop type in the master list | Yes (Farmer) |

## 📸 Crop Logs (Daily Growth Updates)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/crop-logs` | POST | Add a new growth update log for a booking | Yes (Farmer) |
| `/crop-logs/:bookingId` | GET | Get all growth logs for a specific plot booking | Yes |

---

### Example Payloads

#### **Create Booking (POST `/api/bookings`)**
```json
{
  "farmId": "64f1...",
  "plotId": "64f2...",
  "totalPrice": 12000,
  "startDate": "2026-05-01",
  "endDate": "2026-11-01"
}
```

#### **Add Crop Log (POST `/api/crop-logs`)**
```json
{
  "bookingId": "64f3...",
  "title": "Vegetative Phase",
  "description": "Plants are healthy. Applied organic fertilizer.",
  "image": "image_url_or_base64",
  "growthStage": "Vegetative",
  "healthStatus": "Excellent"
}
```

#### **Update Booking (PATCH `/api/bookings/:id`)**
```json
{
  "status": "approved",
  "selectedCrop": {
    "cropId": "64f4...",
    "name": "Organic Wheat"
  }
}
```
