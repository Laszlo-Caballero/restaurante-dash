# Stage 1: Build the Angular application
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Serve the application with Express
FROM node:20-alpine

WORKDIR /app

# Copy package.json to install production dependencies (express)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production
RUN npm install express

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Copy the server script
COPY server.cjs .

# Expose the port the app runs on
EXPOSE 4000

# Start the server
CMD ["node", "server.cjs"]
