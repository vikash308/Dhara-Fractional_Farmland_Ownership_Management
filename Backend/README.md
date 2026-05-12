# 🖥️ Dhara Backend Service

This service handles the core business logic, database management, and authentication for the Dhara platform.

## 🗄️ Database Architecture (ER Diagram)

Below is the Entity-Relationship diagram showing how our data is structured in MongoDB.

```mermaid
erDiagram
    USER ||--o{ FARM : manages
    USER ||--o{ BOOKING : invests
    FARM ||--|{ PLOT : contains
    PLOT ||--o{ BOOKING : reserved_in
    BOOKING ||--o{ CROPLOG : tracks_progress
    BOOKING ||--|| CROP : grows

    USER {
        string id
        string name
        string email
        string password
        string role
        string phone
    }
    FARM {
        string id
        string farmerId
        string name
        object location
        number totalArea
        string soilType
        string[] images
    }
    PLOT {
        string id
        string farmId
        string plotNumber
        number size
        number pricePerSeason
        string status
    }
    BOOKING {
        string id
        string userId
        string plotId
        string farmId
        date startDate
        date endDate
        string status
    }
    CROPLOG {
        string id
        string bookingId
        string title
        string growthStage
        string healthStatus
        string image
    }
```

## 🚀 Key Modules
- **Auth Module:** JWT-based authentication and Google OAuth 2.0.
- **Farm Module:** Management of farm listings and plot availability.
- **Booking Engine:** Handles the reservation logic between investors and plots.
- **Cloudinary Integration:** Specialized middleware for efficient image storage and automatic cleanup.

## 🛠 Tech Stack
- Node.js & Express
- MongoDB (Mongoose)
- Multer (File Uploads)
- Cloudinary (CDN)
