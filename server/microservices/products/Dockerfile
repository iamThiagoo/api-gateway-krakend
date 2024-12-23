FROM node:22.8.0-slim
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3002
CMD ["node", "app.js"]