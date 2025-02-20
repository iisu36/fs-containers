import { createTRPCReact } from "@trpc/react-query";
import type { inferRouterInputs } from "@trpc/server";
import type { AppRouter } from "../../../backend/src/server";

export type RouterInputs = inferRouterInputs<AppRouter>;
export const trpc = createTRPCReact<AppRouter>();
