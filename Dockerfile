FROM node:18.16.0
# Create app directory

WORKDIR /home/ubuntu/nextjs-typeorm-web
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
COPY node_modules ./
COPY . .

EXPOSE 3000
CMD [ "pnpm", "start" ]
