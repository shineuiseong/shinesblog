FROM node:14.17.4

# work directory
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "start"]
