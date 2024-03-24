FROM node:20-alpine

USER node
WORKDIR /home/node/app

COPY . .

RUN npm ci
CMD ["node", "index.js"]
