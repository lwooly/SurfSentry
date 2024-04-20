FROM node:20-alpine

WORKDIR /src/usr/app

# # Install pnpm
RUN npm install -g pnpm

COPY ./package.json pnpm-lock.yaml ./

RUN pnpm i

COPY . .

EXPOSE 8080

CMD ["pnpm",  "dev"]