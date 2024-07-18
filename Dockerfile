# Use the official Node.js image as a parent image
FROM node:20

# Set the working directory in the container
WORKDIR /usr/src/nest-backend

# Copy package.json and package-lock.json before other files to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "run", "start:prod"]
