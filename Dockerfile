FROM node:18.16.0
# Create app directory

WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]
