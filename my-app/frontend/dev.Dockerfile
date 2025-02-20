FROM oven/bun:latest

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN bun install

CMD [ "bun", "run", "dev:host" ]