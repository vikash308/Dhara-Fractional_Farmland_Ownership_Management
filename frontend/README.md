# 🎨 Dhara Frontend Application

A premium, highly interactive React application built for the Dhara fractional farming platform.

## 🔄 Data Flow Diagram (DFD)

This diagram represents how data flows between the user, the application, and the backend services.

```mermaid
graph TD
    User((User / Investor)) -->|Login/Signup| Auth[Authentication Process]
    Farmer((Farmer)) -->|Login/Signup| Auth
    
    Auth -->|Validates| DB[(Backend API)]
    
    User -->|Browses| Marketplace[Marketplace Module]
    Marketplace -->|Fetches Farms| DB
    
    User -->|Books Plot| Booking[Booking Process]
    Booking -->|Stores Transaction| DB
    
    Farmer -->|Updates Logs| Monitoring[Progress Monitoring]
    Monitoring -->|Uploads Images| Cloudinary[Cloudinary Storage]
    Monitoring -->|Saves Log| DB
    
    DB -->|Progress Notification| User
    DB -->|Real-time Stats| Dashboard[User Dashboard]
```

## 🌟 Visual Features
- **Glassmorphic UI:** Modern, transparent card designs.
- **Scroll Animations:** Powered by `framer-motion` for a premium feel.
- **Interactive Forms:** Multi-step booking and crop selection process.
- **Dynamic Dashboards:** Separate views for Investors (impact tracking) and Farmers (management).

## 🛠 Tech Stack
- React.js (Vite)
- Tailwind CSS
- Framer Motion (Animations)
- Axios (API Communication)
- React Toastify (Notifications)
