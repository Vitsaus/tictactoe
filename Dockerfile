FROM node:8-slim

WORKDIR /opt

COPY . /opt
RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]
