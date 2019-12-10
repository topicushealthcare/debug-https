FROM node:13-alpine

WORKDIR /app

# Install app dependencies in seperate layer to improve caching
COPY package*.json ./
RUN npm install

# Copy app
COPY . .

EXPOSE 443

CMD [ "node", "server.js" ]