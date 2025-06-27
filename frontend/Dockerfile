# Step 1: Build the React app
FROM node:18-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with NGINX (latest Alpine, possibly patched)
FROM nginx:stable-alpine3.20  

# (Optional) Force apk update to get fixed packages
RUN apk update && apk upgrade --no-cache

COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional) Use custom NGINX config for React Router
# COPY nginx.conf /etc/nginx/conf.d/default.conf