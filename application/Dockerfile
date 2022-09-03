FROM node:14.5.0-alpine

WORKDIR /var/app
RUN chown node:node /var/app

COPY ./package.json ./
RUN npm install --quiet --no-progress
RUN npm install -g nodemon
#RUN npm run migrate:run

COPY . .
EXPOSE 9000
# Run dev for development
CMD npm start