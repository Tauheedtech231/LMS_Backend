FROM node:18-alpine

# App directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install only production deps
RUN npm install --production

# Copy all files
COPY . .

# Set environment
ENV NODE_ENV=production

# Port Back4App will map
EXPOSE 8080

# Start command
CMD ["npm", "start"]
