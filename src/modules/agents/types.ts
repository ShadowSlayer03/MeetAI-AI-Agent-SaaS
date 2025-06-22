import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

// This helps to define the types based on the output of procedure rather than getting it from schema
export type AgentGetOne = RouterOutput["agents"]["getOne"];
export type AgentGetManyResponse = RouterOutput["agents"]["getMany"];
export type AgentGetMany = AgentGetManyResponse["items"][number];
