# Dhara API Documentation

Base URL: `http://localhost:3000/api`

## 🔐 Authentication
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/auth/signup` | POST | Create new user/farmer | No |
| `/auth/login` | POST | Login and get JWT | No |

## 🚜 Farms (General & Farmer)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/farms` | GET | List all available farms | No |
| `/farms/details/:id` | GET | Get farm details + available plots | No |
| `/farms` | POST | Create a new farm | Yes (Farmer) |
| `/farms/farmer` | GET | Get all farms owned by logged-in farmer | Yes (Farmer) |

## 📐 Plots
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/plots/:farmId` | GET | Get all plots for a specific farm | No |
| `/plots` | POST | Add a new plot to a farm | Yes (Farmer) |

## 📅 Bookings
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/bookings` | POST | Create a new booking for a plot | Yes (User) |
| `/bookings/my` | GET | Get all bookings for logged-in user | Yes (User) |
| `/bookings/farmer` | POST | Get all bookings for a farmer's lands | Yes (Farmer) |
| `/bookings/:id` | PATCH | Update booking status/crop | Yes (Both) |

## 🌾 Crops
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/crops` | GET | List all available crops | No |
| `/crops` | POST | Create a new crop type | Yes (Admin/Farmer) |

## 📸 Crop Logs (Daily Updates)
| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/crop-logs` | POST | Add a daily growth update | Yes (Farmer) |
| `/crop-logs/:bookingId` | GET | Get all logs for a specific booking | Yes |

---

### Example Request Body (Create Booking)
```json
{
  "farmId": "FARM_ID",
  "plotId": "PLOT_ID",
  "totalPrice": 500,
  "startDate": "2026-05-01",
  "endDate": "2026-11-01"
}
```

### Example Request Body (Daily Log)
```json
{
  "bookingId": "BOOKING_ID",
  "title": "Daily Update - Day 45",
  "description": "Vegetative growth is optimal. No pests detected.",
  "image": "https://image-url.com",
  "growthStage": "Vegetative",
  "healthStatus": "Excellent"
}
```
