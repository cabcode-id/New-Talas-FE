# Stage 1: Build the React + Vite application
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock, etc.)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Generate the production build. This creates the /app/dist folder.
RUN npm run build


# Stage 2: Set up the production environment with Nginx
FROM nginx:stable-alpine

# Copy the built static files from the 'builder' stage to the Nginx HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# (Optional but Recommended) Copy a custom Nginx configuration file
# This is crucial for Single Page Applications (SPAs) to handle client-side routing.
# See the explanation below.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# The default command for the Nginx image starts the server.
# This line makes it explicit.
CMD ["nginx", "-g", "daemon off;"]