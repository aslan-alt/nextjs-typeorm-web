FROM node:14.17.0
# Create app directory

WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install
COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]
