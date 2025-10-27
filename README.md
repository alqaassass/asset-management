# IT Asset Management System 🏢

A production-ready web application for tracking company assets using QR codes. Deploy as a live website in 5 minutes or run locally.

> **👋 New here?** Start with [START_HERE.md](START_HERE.md) for a guided introduction!

## ✨ Features
- 🔐 Secure admin authentication with JWT
- 📦 Complete asset CRUD operations
- 📱 QR code generation for each asset
- 📷 Built-in QR code scanner (camera-based)
- 📊 Real-time dashboard with statistics
- 🎨 Responsive mobile-friendly design
- 🌐 Deploy as a website in minutes
- 🐳 Docker support for easy deployment

## 🛠️ Tech Stack
- **Frontend:** React 18 + Vite + TailwindCSS
- **Backend:** Node.js + Express
- **Database:** PostgreSQL
- **QR:** qrcode npm package + html5-qrcode scanner
- **Auth:** JWT + bcryptjs

## ⚡ Quick Start

**Choose your path:**

### 🌐 Deploy as Website (5 min)
```bash
# Push to GitHub, connect to Render.com, done!
```
[→ Website Deployment Guide](WEBSITE_DEPLOYMENT.md)

### 💻 Run Locally (10 min)
```bash
npm run install-all
# Setup database, then:
npm run dev
```
[→ Local Setup Guide](SETUP.md)

### 🐳 Docker (2 min)
```bash
docker-compose up -d
```
[→ Docker Guide](DOCKER.md)

📖 **Complete guide:** [QUICKSTART.md](QUICKSTART.md)

---

## 🚀 Quick Start (Detailed)

### Prerequisites
- Node.js v16 or higher
- PostgreSQL database

### Local Development

1. **Clone and install**
```bash
git clone <your-repo>
cd it-asset-management
npm run install-all
```

2. **Setup database**
```bash
# Create database
psql -U postgres
CREATE DATABASE asset_management;
\q

# Run schema
psql -U postgres -d asset_management -f server/schema.sql
```

3. **Configure environment**
```bash
copy .env.example .env
# Edit .env with your database credentials
```

4. **Run development server**
```bash
npm run dev
```

Visit http://localhost:5173

### Default Login
- **Email:** admin@example.com
- **Password:** admin123

## 🌐 Deploy as a Live Website

**Deploy in 5 minutes!** This app is production-ready and can be deployed to:

### 🚀 Quick Deploy Options

**[Render.com](https://render.com)** ⭐ RECOMMENDED
- ✅ Free tier available
- ✅ One-click deploy with `render.yaml`
- ✅ Automatic HTTPS
- ✅ PostgreSQL included
```bash
# Just push to GitHub and connect to Render!
```

**[Railway.app](https://railway.app)**
- ✅ $5 free credit monthly
- ✅ 3-minute setup
- ✅ Built-in PostgreSQL
```bash
# Connect GitHub → Add PostgreSQL → Deploy!
```

**[Heroku](https://heroku.com)**
- ✅ Industry standard
- ✅ Reliable and scalable
```bash
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
git push heroku main
```

**Docker (Any Server)**
- ✅ One command deployment
```bash
docker-compose up -d
```

📖 **Complete deployment guide:** [WEBSITE_DEPLOYMENT.md](WEBSITE_DEPLOYMENT.md)

All platforms include:
- ✅ Free HTTPS (required for camera)
- ✅ Auto-deploy from GitHub
- ✅ PostgreSQL database
- ✅ Environment variable management

## 📖 Documentation

**[📚 Complete Documentation Index](INDEX.md)** - All guides in one place

Quick links:
- [⚡ Quick Start](QUICKSTART.md) - Get running in 5 minutes
- [🌐 Website Deployment](WEBSITE_DEPLOYMENT.md) - Deploy to web
- [💻 Local Setup](SETUP.md) - Development setup
- [🐳 Docker Guide](DOCKER.md) - Container deployment
- [🎯 Features](FEATURES.md) - Complete feature list
- [🏗️ Project Structure](PROJECT_STRUCTURE.md) - Code organization

## 🔑 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/login | Admin login | No |
| GET | /api/assets | List all assets | Yes |
| POST | /api/assets | Create asset | Yes |
| GET | /api/assets/:id | Get asset details | No |
| PUT | /api/assets/:id | Update asset | Yes |
| DELETE | /api/assets/:id | Delete asset | Yes |
| GET | /api/assets/:id/qr | Get QR code | Yes |
| GET | /api/dashboard/stats | Dashboard stats | Yes |

## 📱 Using QR Codes

1. Create an asset in the admin panel
2. Click "QR" button to generate QR code
3. Download and print the QR code
4. Scan with mobile camera or built-in scanner
5. View asset details instantly

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Protected API routes
- CORS enabled
- Environment variable configuration
- SQL injection prevention with parameterized queries

## 🎯 MVP Success Criteria

✅ Admin can log in  
✅ Admin can add and view assets  
✅ Each asset has a unique QR code  
✅ Scanning QR opens asset detail page  
✅ Dashboard shows asset statistics  
✅ Responsive mobile-friendly design  

## 📄 License

ISC

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a pull request.
