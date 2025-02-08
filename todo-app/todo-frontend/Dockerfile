FROM node:22 AS base

WORKDIR /usr/src/app

COPY . .

ENV VITE_BACKEND_URL=http://localhost:8080/api

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "dist"]

FROM base AS test

ENV NODE_ENV=test

RUN --mount=type=bind,source=package.json,target=package.json \
  --mount=type=bind,source=package-lock.json,target=package-lock.json \
  --mount=type=cache,target=/root/.npm \
  npm ci --include=dev

COPY . .

RUN npm run test