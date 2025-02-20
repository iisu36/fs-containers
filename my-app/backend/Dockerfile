FROM oven/bun:latest

WORKDIR /usr/src/app

COPY . .

RUN bun install -p --frozen-lockfile

RUN bun build ./src/index.ts --outdir ./out --target bun

CMD [ "bun", "run", "./out/index.js" ]