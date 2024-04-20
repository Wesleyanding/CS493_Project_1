FROM node
WORKDIR /usr/src/server
COPY package*.json .
RUN npm install
RUN npm install express
COPY . .
ENV PORT=8086
EXPOSE ${PORT}
CMD [ "npm", "start" ]
