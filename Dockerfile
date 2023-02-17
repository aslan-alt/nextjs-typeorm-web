FROM node:14.17.0
# Create app directory

WORKDIR /usr/src/app
COPY . .
RUN yarn install
RUN yarn build
COPY . .

EXPOSE 3000
CMD [ "yarn", "start" ]