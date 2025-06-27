# Step 1: Build the React app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Step 2: Serve with NGINX
FROM nginx:stable-alpine

# Copy build output to NGINX html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) Use custom NGINX config for React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf