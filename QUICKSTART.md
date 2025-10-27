# ⚡ Quick Start Guide

Get your IT Asset Management System running in minutes!

## 🎯 Choose Your Path

### Path 1: Deploy to Website (5 minutes) 🌐

**Best for:** Making it accessible online immediately

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/asset-management.git
git push -u origin main
```

2. **Deploy to Render** (Recommended)
   - Go to [render.com](https://render.com)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repo
   - Click "Apply"
   - Wait 5 minutes ☕

3. **Initialize Database**
   - In Render dashboard, go to PostgreSQL
   - Click "Connect" → Copy PSQL command
   - Run locally:
   ```bash
   psql <connection-string> -f server/schema.sql
   ```

4. **Done!** 🎉
   - Your site: `https://your-app.onrender.com`
   - Login: `admin@example.com` / `admin123`

📖 **Full guide:** [WEBSITE_DEPLOYMENT.md](WEBSITE_DEPLOYMENT.md)

---

### Path 2: Run Locally (10 minutes) 💻

**Best for:** Development and testing

#### Windows

1. **Run setup script**
```bash
scripts\setup.bat
```

2. **Edit .env** with your database credentials

3. **Create database**
```bash
psql -U postgres -c "CREATE DATABASE asset_management;"
psql -U postgres -d asset_management -f server/schema.sql
```

4. **Start the app**
```bash
npm run dev
```

5. **Open browser**
   - Go to: http://localhost:5173
   - Login: `admin@example.com` / `admin123`

#### Mac/Linux

1. **Run setup script**
```bash
chmod +x scripts/setup.sh
./scripts/setup.sh
```

2. **Start the app**
```bash
npm run dev
```

3. **Open browser**
   - Go to: http://localhost:5173
   - Login: `admin@example.com` / `admin123`

📖 **Full guide:** [SETUP.md](SETUP.md)

---

### Path 3: Docker (2 minutes) 🐳

**Best for:** Consistent environment, any server

1. **Start everything**
```bash
docker-compose up -d
```

2. **Open browser**
   - Go to: http://localhost:5000
   - Login: `admin@example.com` / `admin123`

That's it! Database and app are running.

📖 **Full guide:** [DOCKER.md](DOCKER.md)

---

## 🎓 First Steps After Setup

### 1. Change Admin Password
- Login with default credentials
- (Future: Add password change feature)

### 2. Add Your First Asset
- Click "Assets" in navigation
- Click "Add Asset"
- Fill in details:
  - Name: "MacBook Pro 2023"
  - Type: "Laptop"
  - Serial: "ABC123456"
  - Location: "Office 101"
  - Assigned To: "John Doe"
  - Status: "Active"
- Click "Create Asset"

### 3. Generate QR Code
- Click "QR" button next to your asset
- Download the QR code
- Print it and attach to the asset

### 4. Test QR Scanning
- Click "Scan QR" in navigation
- Click "Start Scanner"
- Point camera at QR code
- Asset details appear!

Or scan with mobile camera:
- Open camera app
- Point at QR code
- Tap notification
- View asset details

---

## 📱 Using the System

### Dashboard
- View total assets
- See active vs inactive count
- Quick action buttons

### Assets Page
- View all assets in table
- Add new assets
- Edit existing assets
- Delete assets
- Generate QR codes

### QR Scanner
- Built-in camera scanner
- Works on desktop and mobile
- Instant asset lookup

### Asset Detail Page
- Public page (no login required)
- Shows all asset information
- Accessed by scanning QR code

---

## 🔧 Troubleshooting

### "Cannot connect to database"
**Fix:**
- Check PostgreSQL is running
- Verify DATABASE_URL in .env
- Test connection: `psql -U postgres`

### "Camera not working"
**Fix:**
- Use HTTPS (required for camera)
- Grant camera permissions in browser
- Try different browser

### "Port already in use"
**Fix:**
- Change PORT in .env
- Or stop other app using port 5000

### "Module not found"
**Fix:**
```bash
npm install
cd client && npm install
```

---

## 🚀 Ready to Deploy?

Run pre-deployment check:
```bash
npm run deploy-check
```

Then follow: [WEBSITE_DEPLOYMENT.md](WEBSITE_DEPLOYMENT.md)

---

## 📚 Documentation

- [README.md](README.md) - Project overview
- [SETUP.md](SETUP.md) - Detailed local setup
- [WEBSITE_DEPLOYMENT.md](WEBSITE_DEPLOYMENT.md) - Deploy to web
- [DOCKER.md](DOCKER.md) - Docker deployment
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - Code structure

---

## 💡 Tips

### For Development
- Use `npm run dev` for hot reload
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

### For Production
- Always use HTTPS (required for camera)
- Set strong JWT_SECRET
- Change default admin password
- Enable database backups

### For Teams
- Print QR codes on labels
- Attach to physical assets
- Train staff on scanning
- Regular asset audits

---

## 🎉 You're Ready!

Your IT Asset Management System is set up and ready to use.

**Need help?**
- Check documentation above
- Review troubleshooting section
- Open GitHub issue

**Next steps:**
- Add all your assets
- Print QR codes
- Train your team
- Start tracking!

Happy asset managing! 📦✨
