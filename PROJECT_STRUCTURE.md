# Project Structure

```
it-asset-management/
├── server/                      # Backend (Node.js + Express)
│   ├── config/
│   │   └── db.js               # PostgreSQL connection
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── routes/
│   │   ├── auth.js             # Login endpoint
│   │   └── assets.js           # Asset CRUD + QR generation
│   ├── index.js                # Express server entry point
│   └── schema.sql              # Database schema
│
├── client/                      # Frontend (React + Vite + TailwindCSS)
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js        # API client with auth interceptor
│   │   ├── components/
│   │   │   └── Layout.jsx      # Main layout with navigation
│   │   ├── pages/
│   │   │   ├── Login.jsx       # Admin login page
│   │   │   ├── Dashboard.jsx   # Stats dashboard
│   │   │   ├── Assets.jsx      # Asset management (CRUD + QR)
│   │   │   ├── AssetDetail.jsx # Public asset view (for QR scans)
│   │   │   └── QRScanner.jsx   # QR code scanner
│   │   ├── App.jsx             # Router and auth logic
│   │   ├── main.jsx            # React entry point
│   │   └── index.css           # Tailwind imports
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── .env.example                 # Environment variables template
├── .gitignore
├── package.json                 # Root package with dev scripts
├── README.md                    # Project overview
├── SETUP.md                     # Setup instructions
└── PROJECT_STRUCTURE.md         # This file

```

## Key Features Implemented

### Authentication
- JWT-based admin login
- Protected routes with middleware
- Token stored in localStorage

### Asset Management
- Create, Read, Update, Delete assets
- Fields: name, type, serial_number, location, assigned_to, status
- Unique serial number constraint

### QR Code System
- Auto-generate QR code for each asset
- QR contains URL to public asset detail page
- Download QR as PNG for printing
- Built-in QR scanner using device camera

### Dashboard
- Total assets count
- Active vs inactive breakdown
- Quick action links

## Tech Stack

**Backend:**
- Node.js + Express
- PostgreSQL with pg driver
- JWT for authentication
- bcryptjs for password hashing
- qrcode for QR generation
- CORS enabled

**Frontend:**
- React 18
- React Router for navigation
- Axios for API calls
- TailwindCSS for styling
- html5-qrcode for scanning
- Vite for build tooling

## API Endpoints

- POST /api/auth/login - Admin login
- GET /api/assets - List all assets (protected)
- POST /api/assets - Create asset (protected)
- GET /api/assets/:id - Get asset details (public)
- PUT /api/assets/:id - Update asset (protected)
- DELETE /api/assets/:id - Delete asset (protected)
- GET /api/assets/:id/qr - Get QR code (protected)
- GET /api/dashboard/stats - Get dashboard stats (protected)

## Database Schema

**users table:**
- id (serial, primary key)
- email (varchar, unique)
- password (varchar, hashed)
- created_at (timestamp)

**assets table:**
- id (serial, primary key)
- name (varchar)
- type (varchar)
- serial_number (varchar, unique)
- location (varchar)
- assigned_to (varchar)
- status (varchar: active/inactive)
- created_at (timestamp)
- updated_at (timestamp)
