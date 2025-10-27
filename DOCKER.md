# Docker Deployment Guide

Run the entire application with Docker and Docker Compose.

## Prerequisites
- Docker installed
- Docker Compose installed

## Quick Start

1. **Clone the repository**
```bash
git clone <your-repo>
cd it-asset-management
```

2. **Start with Docker Compose**
```bash
docker-compose up -d
```

This will:
- Create a PostgreSQL database
- Build the application
- Initialize the database schema
- Start the server

3. **Access the application**
Open http://localhost:5000

4. **Login**
- Email: admin@example.com
- Password: admin123

## Docker Commands

### Start services
```bash
docker-compose up -d
```

### Stop services
```bash
docker-compose down
```

### View logs
```bash
docker-compose logs -f
```

### Rebuild after changes
```bash
docker-compose up -d --build
```

### Stop and remove everything (including data)
```bash
docker-compose down -v
```

## Production Deployment

### Update environment variables
Edit `docker-compose.yml` and change:
- `JWT_SECRET` to a secure random string
- `POSTGRES_PASSWORD` to a strong password
- `CLIENT_URL` to your domain

### Use environment file
Create `.env` file:
```env
POSTGRES_PASSWORD=your_secure_password
JWT_SECRET=your_secure_jwt_secret
CLIENT_URL=https://yourdomain.com
```

Update `docker-compose.yml`:
```yaml
services:
  postgres:
    environment:
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
  
  app:
    environment:
      JWT_SECRET: ${JWT_SECRET}
      CLIENT_URL: ${CLIENT_URL}
```

### Deploy to production
```bash
docker-compose -f docker-compose.yml up -d
```

## Docker Hub Deployment

### Build and push image
```bash
# Build
docker build -t yourusername/asset-management:latest .

# Push to Docker Hub
docker login
docker push yourusername/asset-management:latest
```

### Pull and run on server
```bash
docker pull yourusername/asset-management:latest
docker run -d -p 5000:5000 \
  -e DATABASE_URL=your_db_url \
  -e JWT_SECRET=your_secret \
  -e NODE_ENV=production \
  yourusername/asset-management:latest
```

## Kubernetes Deployment

Create `k8s-deployment.yaml`:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: asset-management
spec:
  replicas: 3
  selector:
    matchLabels:
      app: asset-management
  template:
    metadata:
      labels:
        app: asset-management
    spec:
      containers:
      - name: asset-management
        image: yourusername/asset-management:latest
        ports:
        - containerPort: 5000
        env:
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-url
        - name: JWT_SECRET
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: jwt-secret
---
apiVersion: v1
kind: Service
metadata:
  name: asset-management-service
spec:
  selector:
    app: asset-management
  ports:
  - port: 80
    targetPort: 5000
  type: LoadBalancer
```

Deploy:
```bash
kubectl apply -f k8s-deployment.yaml
```

## Troubleshooting

### Database connection issues
```bash
# Check if postgres is running
docker-compose ps

# Check postgres logs
docker-compose logs postgres

# Connect to postgres manually
docker-compose exec postgres psql -U asset_user -d asset_management
```

### Application not starting
```bash
# Check app logs
docker-compose logs app

# Restart services
docker-compose restart
```

### Reset database
```bash
docker-compose down -v
docker-compose up -d
```

This will recreate the database with fresh schema.
