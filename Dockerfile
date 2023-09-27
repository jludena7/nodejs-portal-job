FROM node:18-alpine as base

WORKDIR /usr/code/

COPY package*.json .

RUN npm cache clean --force

# If you are building your code for production
# RUN npm ci --omit=dev
RUN npm ci

COPY . .

COPY env.docker .env

EXPOSE 5000

CMD [ "npm", "run", "dev" ]
