cd app &&
git pull &&
yarn install --production=false &&
yarn build &&
yarn typeorm:build &&
yarn migration:run && 
docker build -t aslanxiong/node-web-app . &&
docker kill app &&
docker rm app &&
docker run --name app --network=host -p 80:80 -d aslanxiong/node-web-app &&
echo 'OK'