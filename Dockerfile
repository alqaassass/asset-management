# Build stage for client
FROM node:18-alpine AS client-build
WORKDIR /app/client
COPY client/package*.json ./
RUN npm install -g vite
RUN npm install
COPY client/ ./
RUN vite build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Copy server files
COPY package*.json ./
COPY server/ ./server/

# Install production dependencies
RUN npm install --production

# Copy built client files
COPY --from=client-build /app/client/dist ./client/dist

# Expose port
EXPOSE 5000

# Set environment
ENV NODE_ENV=production

# Start server
CMD ["node", "server/index.js"]