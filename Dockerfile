FROM node:15-buster-slim

RUN mkdir -p /root/app
WORKDIR /root/app
COPY . .
RUN npm install
RUN npm install -g serve
RUN npm run build
CMD ["serve", "-s", "build"]
