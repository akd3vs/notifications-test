# Specify a base image
FROM node:12.13.0-alpine AS alpine

WORKDIR /app

# Install dependencies
COPY backend/package.json .
RUN npm install
COPY backend/ .
COPY .env .env

EXPOSE 3001

# Default command
CMD ["node_modules/.bin/dotenv", "-e", ".env", "npm", "run", "start"]
