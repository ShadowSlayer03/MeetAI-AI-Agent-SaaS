"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

function HomeView() {
  const trpc = useTRPC();
  const {data} = useQuery(trpc.hello.queryOptions({text: "Arjun"}))
  if (!data) return <div>Loading...</div>;
  return <div>{data?.greeting}</div>;
}

export default HomeView;
