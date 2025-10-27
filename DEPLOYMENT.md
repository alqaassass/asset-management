# Deployment Guide

This guide covers deploying the IT Asset Management System to various hosting platforms.

## Option 1: Heroku (Easiest)

### Prerequisites
- Heroku account
- Heroku CLI installed

### Steps

1. **Login to Heroku**
```bash
heroku login
```

2. **Create a new Heroku app**
```bash
heroku create your-app-name
```

3. **Add PostgreSQL database**
```bash
heroku addons:create heroku-postgresql:mini
```

4. **Set environment variables**
```bash
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com
```

5. **Deploy**
```bash
git add .
git commit -m "Ready for deployment"
git push heroku main
```

6. **Initialize database**
```bash
heroku pg:psql < server/schema.sql
```

7. **Open your app**
```bash
heroku open
```

Your app will be live at: `https://your-app-name.herokuapp.com`

---

## Option 2: Render.com (Recommended)

### Steps

1. **Create account** at [render.com](https://render.com)

2. **Create PostgreSQL database**
   - Click "New +" → "PostgreSQL"
   - Name: `asset-management-db`
   - Copy the Internal Database URL

3. **Create Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - Name: `asset-management`
     - Environment: `Node`
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

4. **Add Environment Variables**
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (paste your database URL)
   - `JWT_SECRET` = (generate a random string)
   - `CLIENT_URL` = (your render app URL)

5. **Initialize Database**
   - Go to your database dashboard
   - Click "Connect" → "External Connection"
   - Run: `psql -h <host> -U <user> -d <database> -f server/schema.sql`

6. **Deploy**
   - Render will automatically deploy on git push

Your app will be live at: `https://your-app-name.onrender.com`

---

## Option 3: Railway.app

### Steps

1. **Create account** at [railway.app](https://railway.app)

2. **Create new project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Add PostgreSQL**
   - Click "New" → "Database" → "Add PostgreSQL"
   - Railway will automatically set DATABASE_URL

4. **Add Environment Variables**
   - Click on your service → "Variables"
   - Add:
     - `NODE_ENV` = `production`
     - `JWT_SECRET` = (generate random string)
     - `CLIENT_URL` = (your railway app URL)

5. **Initialize Database**
   - Click on PostgreSQL service → "Connect"
   - Use provided connection string with psql
   - Run: `psql <connection-string> -f server/schema.sql`

6. **Deploy**
   - Railway auto-deploys on git push

---

## Option 4: DigitalOcean App Platform

### Steps

1. **Create account** at [digitalocean.com](https://digitalocean.com)

2. **Create App**
   - Go to Apps → "Create App"
   - Connect GitHub repository
   - Select branch

3. **Configure Build**
   - Build Command: `npm install && npm run build`
   - Run Command: `npm start`

4. **Add Database**
   - Add Component → "Database" → "PostgreSQL"
   - Note the connection details

5. **Set Environment Variables**
   - Add all required variables in App Settings

6. **Initialize Database**
   - Use connection string to run schema.sql

---

## Option 5: VPS (Ubuntu/Linux)

### Prerequisites
- VPS with Ubuntu 20.04+
- Domain name (optional)

### Steps

1. **SSH into your server**
```bash
ssh root@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install PostgreSQL**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

4. **Setup Database**
```bash
sudo -u postgres psql
CREATE DATABASE asset_management;
CREATE USER asset_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE asset_management TO asset_user;
\q
```

5. **Clone and Setup App**
```bash
git clone your-repo-url
cd it-asset-management
npm install
cd client && npm install && npm run build && cd ..
```

6. **Create .env file**
```bash
nano .env
# Add your environment variables
```

7. **Initialize Database**
```bash
psql -U asset_user -d asset_management -f server/schema.sql
```

8. **Install PM2 (Process Manager)**
```bash
sudo npm install -g pm2
pm2 start server/index.js --name asset-management
pm2 startup
pm2 save
```

9. **Setup Nginx (Optional)**
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/asset-management
```

Add configuration:
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
```

10. **Setup SSL with Let's Encrypt (Optional)**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## Environment Variables Reference

Required for all deployments:

- `PORT` - Server port (usually auto-set by platform)
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Random secret key for JWT tokens
- `NODE_ENV` - Set to `production`
- `CLIENT_URL` - Your app's public URL

---

## Post-Deployment Checklist

- [ ] Database is created and schema is initialized
- [ ] All environment variables are set
- [ ] Default admin user exists (check with login)
- [ ] Can create assets
- [ ] QR codes generate correctly
- [ ] QR codes can be scanned and open asset details
- [ ] Camera permissions work for QR scanner
- [ ] HTTPS is enabled (required for camera access)

---

## Troubleshooting

### Camera not working
- Ensure your site is served over HTTPS
- Check browser camera permissions
- Test on different browsers/devices

### Database connection errors
- Verify DATABASE_URL is correct
- Check if database allows external connections
- Ensure schema.sql has been run

### Build failures
- Check Node.js version (needs 16+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### 404 on refresh
- Ensure server serves index.html for all routes
- Check that client build files are in correct location

---

## Updating Your Deployment

For most platforms (Heroku, Render, Railway):
```bash
git add .
git commit -m "Update message"
git push origin main
```

The platform will automatically rebuild and redeploy.

For VPS:
```bash
ssh root@your-server-ip
cd it-asset-management
git pull
npm install
cd client && npm install && npm run build && cd ..
pm2 restart asset-management
```
