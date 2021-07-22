FROM node:12
# Create app directory
WORKDIR /usr/src/app
COPY package.json ./
COPY yarn.lock ./
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]