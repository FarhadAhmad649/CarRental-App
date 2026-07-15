# CarRental-App 🚗

A full-stack car rental platform with a customer-facing booking site, a dedicated admin dashboard, and a Node.js/Express API backing both. Users can browse cars, book rentals, leave reviews, and manage their profile — while admins manage the car fleet, bookings, and revenue from a separate panel.

## ✨ Features

**Customer site (FrontEnd)**
- Browse available cars with details (Cars, CarDetails pages)
- Book a car and view your booking history (MyBookings)
- Leave and read reviews (Reviews, WriteReview)
- User authentication and profile management (Login, userProfile)
- Home, About, and Contact pages
- Email/newsletter subscription component

**Admin panel**
- Separate admin login, protected by role-based access
- Dashboard with booking stats and revenue overview (Dashboard, RevenueList)
- Add, update, and remove cars, including image upload (AddCar, ManageCars)
- View and manage all customer bookings, update booking status (AdminBookings)

**Backend (API)**
- JWT-based authentication with role checks (user vs. admin)
- Car listings with image upload via Cloudinary
- Booking creation, status updates, and deletion
- Dashboard stats and revenue reporting endpoints
- Public review submission and listing

## 🧱 Tech Stack

**Frontend (customer site) & Admin panel**
- React 19 + Vite
- React Router
- Tailwind CSS
- Axios
- React Toastify (notifications)
- Framer Motion (customer site only, for animations)
- Lucide React (icons)

**Backend**
- Node.js + Express 5
- MongoDB with Mongoose
- JWT authentication (`jsonwebtoken`, `bcrypt`)
- Multer + Cloudinary (image uploads/storage)
- `validator` for input validation

## 📂 Project Structure

```
CarRental-App/
├── FrontEnd/            # Customer-facing React app
│   ├── src/
│   │   ├── compnents/    # Navbar, Hero, CarCard, Reviews, etc.
│   │   ├── pages/         # Home, Cars, CarDetails, MyBookings, Login, etc.
│   │   └── context/       # App-wide React context
│   └── vite.config.js
├── admin/                # Admin dashboard React app
│   ├── src/
│   │   ├── components/    # Navbar, Sidebar
│   │   ├── pages/          # Dashboard, AddCar, ManageCars, AdminBookings, RevenueList, Login
│   │   └── context/
│   └── vite.config.js
└── backend/               # Express API
    ├── config/              # DB connection, Cloudinary config
    ├── controllers/         # Route handlers
    ├── middlewares/         # Auth & role-based access middleware
    ├── models/               # Mongoose schemas (User, Car, Booking, Review)
    ├── routes/               # userRoutes, carRoutes, bookingRoutes, reviewRoutes
    └── server.js             # App entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- A MongoDB connection string (MongoDB Atlas or local)
- A Cloudinary account (for car image uploads)

### 1. Clone the repo

```bash
git clone https://github.com/FarhadAhmad649/CarRental-App.git
cd CarRental-App
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
FRONTEND_URL=http://localhost:5173
ADMIN_PANEL_URL=http://localhost:5174
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Run the server:

```bash
npm run server
```

The API will start on `http://localhost:8000` (or your configured `PORT`).

### 3. Customer frontend setup

```bash
cd FrontEnd
npm install
npm run dev
```

Runs by default on `http://localhost:5173`.

### 4. Admin panel setup

```bash
cd admin
npm install
npm run dev
```

Runs by default on `http://localhost:5174`.

> Both frontends need to know your backend's URL — check each app's context/API setup (`src/context/AppContext.jsx`) and update it to point at your local backend if it's not already reading from an environment variable.

## 🔌 API Overview

**User routes** (`/api/users`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register a new user |
| POST | `/login` | User login |
| POST | `/admin_login` | Admin login |
| GET | `/get-profile` | Get the logged-in user's profile |
| POST | `/update-profile` | Update profile (supports image upload) |

**Car routes** (`/api/car`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/list` | List all cars |
| GET | `/:id` | Get a single car by ID |
| POST | `/add` | *(admin)* Add a car, with image upload |
| POST | `/update` | *(admin)* Update a car |
| POST | `/remove` | *(admin)* Remove a car |

**Booking routes** (`/api/bookings`)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/add` | Create a booking (user) |
| GET | `/my-bookings` | Get the logged-in user's bookings |
| GET | `/admin/bookings` | *(admin)* View all bookings |
| POST | `/admin/status` | *(admin)* Update a booking's status |
| GET | `/admin/dashboard-stats` | *(admin)* Get dashboard stats |
| GET | `/admin/revenue-details` | *(admin)* Get revenue breakdown |
| POST | `/admin/delete` | *(admin)* Delete a booking |

**Review routes** (`/api/reviews`)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all reviews (public) |
| POST | `/add` | Submit a review (logged-in users) |

Protected routes require a valid JWT; admin-only routes additionally require the `admin` role.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to open a pull request or an issue.

## 📄 License

ISC
