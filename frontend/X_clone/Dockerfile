# build stage

# Using node.js image
FROM node:lts-alpine as build-stage
# Set the working directory in the container to /app
WORKDIR /app
# Copy package.json to the working directory
COPY package*.json ./
# Install the dependencies in the container
RUN npm install
# Copy the rest of the code to the working directory
COPY . .
# Build the application for production
RUN npm run build

# production stage

# Using NGINX image
FROM nginx:stable-alpine as production-stage
# Copy the built application from the build stage to the NGINX container
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Copy the NGINX configuration file
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# Config port to 80 for the container
EXPOSE 80
# Command to launch NGINX when container is started
CMD ["nginx", "-g", "daemon off;"]