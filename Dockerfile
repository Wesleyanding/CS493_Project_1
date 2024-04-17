FROM node
WORKDIR /usr/server
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8086
CMD [ "npm", "start" ]
