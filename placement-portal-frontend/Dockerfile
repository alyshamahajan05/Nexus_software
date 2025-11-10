# --- Stage 1: The "Builder" ---
# Using a Node.js image to build our static files
FROM node:24-slim AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the production application
# This creates a /app/dist folder
RUN npm run build

# --- Stage 2: The "Server" ---
# Use a lightweight Nginx server image
FROM nginx:1.28

# Copy the static build files from the "builder" stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy our custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (Nginx's default)
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]