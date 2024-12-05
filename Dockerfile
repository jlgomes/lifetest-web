# Build Stage Start

# Specify a base image
FROM node:18.12.1-alpine3.16 As builder
RUN apk update && apk add --no-cache jq

#Specify a working directory
WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

#Install dependencies
RUN yarn install

#Copy remaining files
COPY . .

# Replace for literal environment variables escaping dollar signal with backslash
RUN jq 'to_entries | map_values({ (.key) : ("$" + .key) }) | reduce .[] as $item ({}; . + $item)' \
  ./src/config.json > ./src/config.tmp.json && \
  mv ./src/config.tmp.json ./src/config.json

# Build the project for production
RUN yarn run build

# Production Stage Start

# Specify base image
FROM nginx:1.23.3-alpine-slim
RUN apk update && apk add bash curl jq
WORKDIR /usr/share/nginx/html

#Copy start-nginx file
COPY ./devops/start-nginx.sh /usr/bin/start-nginx.sh
RUN chmod +x /usr/bin/start-nginx.sh

COPY devops/nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy production build files from builder phase to nginx
COPY --from=builder /usr/src/app/dist/lifetest .
COPY --from=builder /usr/src/app/src/config.json config.json

EXPOSE 80

CMD [ "start-nginx.sh" ]
