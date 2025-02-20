import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { trpc } from "@elysiajs/trpc";

import { appRouter } from "./server";

const app = new Elysia()
  .use(cors())
  .use(trpc(appRouter, { endpoint: "" }))
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
