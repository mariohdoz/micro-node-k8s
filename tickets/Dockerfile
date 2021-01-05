# FROM node:12.18-alpine
FROM node:alpine

WORKDIR /app
COPY package.json . 
RUN npm install --prod
COPY . .

CMD ["npm", "start"]