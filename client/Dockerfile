FROM node:20-alpine

WORKDIR /src/usr/app

# # Install pnpm
RUN npm install -g pnpm

COPY ./package.json ./

# Install project dependencies
RUN pnpm i

COPY . .

EXPOSE 5173

CMD ["pnpm", "dev"]