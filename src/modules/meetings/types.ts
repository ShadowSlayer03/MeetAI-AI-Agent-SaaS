import { AppRouter } from "@/trpc/routers/_app";
import { inferRouterOutputs } from "@trpc/server";

type RouterOutput = inferRouterOutputs<AppRouter>;

// This helps to define the types based on the output of procedure rather than getting it from schema
export type MeetingsGetOne = RouterOutput["meetings"]["getOne"];
export type MeetingsGetManyResponse = RouterOutput["meetings"]["getMany"];
export type MeetingsGetMany = MeetingsGetManyResponse["items"][number];

export enum MeetingStatus {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
  Processing = "processing",
  Cancelled = "cancelled",
}
