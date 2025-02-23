FROM node:20.18.1 as base

FROM base as dev

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm","run", "start-dev" ]

FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only-production
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]