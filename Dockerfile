FROM node:14.12.0

RUN mkdir -p /opt/authenticator
WORKDIR /opt/authenticator

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

CMD npm run start
