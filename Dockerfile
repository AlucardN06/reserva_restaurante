<<<<<<< HEAD
# Use an official Node.js image
FROM node:latest

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json y package-lock.json para instalar las dependencias
COPY package*.json ./

# Instalar las dependencias y forzar la instalación
RUN npm install --legacy-peer-deps --force && \
    npm install typescript@3.2.1 --save-dev && \
    npm uninstall eslint --save-dev && \
    npm install eslint@6.6.0 --save-dev && \
    npx update-browserslist-db@latest

# Copiar el resto de los archivos
COPY . .

# Limpiar la caché de npm
RUN npm cache clean --force

# Exponer el puerto necesario
EXPOSE 8100

# Comando de inicio
CMD ["npm", "start"]
=======
# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package and package-lock.json file
COPY package*.json ./

# Copy local directories to the current local directory of our docker image (/app)
COPY ./src ./src
COPY ./public ./public

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE 3000

# Start the app using serve command
CMD [ "serve", "-s", "build" ]
>>>>>>> c0754b4f166cd70d0674174430f2e3b00a6f702c
