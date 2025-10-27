# 🌐 Website Deployment - Complete Guide

Deploy your IT Asset Management System as a live website in minutes.

## 🚀 Fastest Options (5-10 minutes)

### Option 1: Render.com ⭐ RECOMMENDED

**Why Render?**
- Free tier available
- Automatic HTTPS
- PostgreSQL included
- Zero configuration needed
- Auto-deploys from GitHub

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/asset-management.git
git push -u origin main
```

2. **Go to [render.com](https://render.com)** and sign up

3. **Click "New +" → "Blueprint"**
   - Connect your GitHub repository
   - Render will detect `render.yaml` automatically
   - Click "Apply"

4. **Wait 5 minutes** for deployment

5. **Initialize Database**
   - Go to your PostgreSQL database in Render dashboard
   - Click "Connect" → "External Connection"
   - Copy the PSQL command
   - Run locally:
   ```bash
   psql <connection-string> -f server/schema.sql
   ```

6. **Done!** Your site is live at `https://your-app-name.onrender.com`

**Login:** admin@example.com / admin123

---

### Option 2: Railway.app

**Why Railway?**
- $5 free credit monthly
- Extremely simple setup
- Built-in PostgreSQL
- GitHub integration

**Steps:**

1. **Go to [railway.app](https://railway.app)**

2. **Click "Start a New Project"**
   - Select "Deploy from GitHub repo"
   - Authorize and select your repository

3. **Add PostgreSQL**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway auto-connects it

4. **Add Environment Variables**
   - Click your service → "Variables"
   - Add:
     - `NODE_ENV` = `production`
     - `JWT_SECRET` = `your-random-secret-here`
     - `CLIENT_URL` = (copy from Railway URL)

5. **Initialize Database**
   - Click PostgreSQL → "Connect"
   - Use connection string:
   ```bash
   psql <connection-string> -f server/schema.sql
   ```

6. **Deploy** - Railway auto-deploys!

Your site: `https://your-app.up.railway.app`

---

### Option 3: Heroku

**Why Heroku?**
- Industry standard
- Reliable
- Great documentation
- Easy scaling

**Steps:**

1. **Install Heroku CLI**
```bash
# Windows
winget install Heroku.HerokuCLI

# Mac
brew tap heroku/brew && brew install heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create your-app-name
```

3. **Add PostgreSQL**
```bash
heroku addons:create heroku-postgresql:mini
```

4. **Set Environment Variables**
```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production
```

5. **Deploy**
```bash
git push heroku main
```

6. **Initialize Database**
```bash
heroku pg:psql < server/schema.sql
```

7. **Open Your Site**
```bash
heroku open
```

Your site: `https://your-app-name.herokuapp.com`

---

## 🐳 Docker Deployment (Any Server)

**Perfect for:** VPS, AWS EC2, DigitalOcean Droplets, Azure VMs

**One Command Deployment:**
```bash
docker-compose up -d
```

That's it! See [DOCKER.md](DOCKER.md) for details.

---

## 🔧 Manual VPS Deployment

**For:** Full control, custom domains, enterprise use

### Quick Setup on Ubuntu Server

```bash
# 1. SSH into your server
ssh root@your-server-ip

# 2. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 4. Setup Database
sudo -u postgres psql
CREATE DATABASE asset_management;
CREATE USER asset_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE asset_management TO asset_user;
\q

# 5. Clone and Setup
git clone your-repo-url
cd it-asset-management
npm install
cd client && npm install && npm run build && cd ..

# 6. Create .env
nano .env
# Add your variables

# 7. Initialize Database
psql -U asset_user -d asset_management -f server/schema.sql

# 8. Install PM2
sudo npm install -g pm2
pm2 start server/index.js --name asset-management
pm2 startup
pm2 save

# 9. Setup Nginx
sudo apt install nginx
sudo nano /etc/nginx/sites-available/asset-management
```

**Nginx Config:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/asset-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# 10. Add SSL (Free)
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

**Done!** Your site is live with HTTPS.

---

## 🌍 Platform Comparison

| Platform | Free Tier | Setup Time | PostgreSQL | Auto-Deploy | HTTPS |
|----------|-----------|------------|------------|-------------|-------|
| **Render** | ✅ Yes | 5 min | ✅ Included | ✅ Yes | ✅ Auto |
| **Railway** | $5/month | 3 min | ✅ Included | ✅ Yes | ✅ Auto |
| **Heroku** | Limited | 10 min | ✅ Add-on | ✅ Yes | ✅ Auto |
| **DigitalOcean** | ❌ $5/mo | 15 min | ✅ Managed | ✅ Yes | ✅ Auto |
| **VPS** | ❌ Varies | 30 min | ⚙️ Manual | ❌ Manual | ⚙️ Manual |
| **Docker** | ❌ Server cost | 2 min | ✅ Included | ❌ Manual | ⚙️ Manual |

---

## 📱 Post-Deployment Checklist

After deploying, verify:

- [ ] Website loads at your URL
- [ ] Can login with admin@example.com / admin123
- [ ] Can create a new asset
- [ ] QR code generates and downloads
- [ ] Can scan QR code (requires HTTPS!)
- [ ] Camera works in QR scanner
- [ ] Dashboard shows correct stats
- [ ] Mobile responsive design works

---

## 🔒 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ random characters)
- [ ] Enable HTTPS (required for camera)
- [ ] Set strong database password
- [ ] Enable database backups
- [ ] Set up monitoring/alerts
- [ ] Review CORS settings
- [ ] Add rate limiting (optional)

---

## 🎯 Custom Domain Setup

### For Render/Railway/Heroku:

1. **Buy domain** (Namecheap, GoDaddy, etc.)

2. **Add custom domain in platform dashboard**

3. **Update DNS records:**
   - Type: CNAME
   - Name: @ or www
   - Value: (provided by platform)

4. **Wait for DNS propagation** (5-30 minutes)

5. **Update CLIENT_URL** environment variable

### For VPS with Nginx:

Already configured in Nginx setup above!

---

## 🔄 Continuous Deployment

### GitHub Actions (Automatic)

Already configured in `.github/workflows/deploy.yml`

**Setup:**
1. Add secrets in GitHub repo settings:
   - `HEROKU_API_KEY`
   - `HEROKU_APP_NAME`
   - `HEROKU_EMAIL`

2. Push to main branch → Auto-deploys!

### Manual Updates

**For Render/Railway/Heroku:**
```bash
git add .
git commit -m "Update"
git push origin main
```
Platform auto-deploys!

**For VPS:**
```bash
ssh root@your-server
cd it-asset-management
git pull
npm install
cd client && npm install && npm run build && cd ..
pm2 restart asset-management
```

---

## 🆘 Troubleshooting

### Camera Not Working
- **Cause:** Not using HTTPS
- **Fix:** All platforms provide free HTTPS automatically

### Database Connection Failed
- **Check:** DATABASE_URL is correct
- **Check:** Database is running
- **Check:** Schema is initialized

### 404 on Page Refresh
- **Cause:** Server not serving index.html for all routes
- **Fix:** Already handled in server/index.js

### Build Failed
- **Check:** Node.js version (needs 16+)
- **Check:** All dependencies installed
- **View:** Build logs in platform dashboard

### QR Code Not Generating
- **Check:** CLIENT_URL environment variable
- **Check:** Asset ID is valid
- **Check:** Logged in (QR endpoint requires auth)

---

## 💰 Cost Estimates

### Free Options:
- **Render:** Free tier (sleeps after 15 min inactivity)
- **Railway:** $5 credit/month (enough for small usage)

### Paid Options:
- **Heroku:** $7/month (Eco Dynos)
- **DigitalOcean:** $12/month (App Platform)
- **VPS:** $5-10/month (DigitalOcean, Linode, Vultr)

### Recommended for Production:
- **Small team (< 50 users):** Render free or Railway
- **Medium team (50-500 users):** Heroku or DigitalOcean
- **Large team (500+ users):** VPS or cloud platform

---

## 📞 Support

Having issues? Check:
1. Platform status page
2. Application logs
3. Database logs
4. Browser console (F12)

Common fixes:
- Restart the service
- Check environment variables
- Verify database connection
- Clear browser cache

---

## 🎉 You're Live!

Your IT Asset Management System is now accessible worldwide!

**Share your URL with your team:**
`https://your-app-name.onrender.com`

**Next Steps:**
1. Change default admin password
2. Add your first assets
3. Print QR codes
4. Train your team
5. Monitor usage

**Need help?** Open an issue on GitHub!
