# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files first (better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy remaining project files
COPY . .

# Expose service port
EXPOSE 5000

# Start the service
CMD ["node", "index.js"]