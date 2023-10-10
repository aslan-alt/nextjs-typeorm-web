FROM node:12.22.9
# Create app directory

WORKDIR /usr/src/app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install
COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]
