# Use an official Node.js image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Expose the port that the development server runs on
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
