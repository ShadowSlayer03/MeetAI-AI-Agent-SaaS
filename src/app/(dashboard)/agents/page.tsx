import {
  AgentsView,
  AgentsViewError,
  AgentsViewLoading,
} from "@/modules/agents/server/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React, { Suspense } from "react";
import {ErrorBoundary} from "react-error-boundary";

const Page = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<AgentsViewLoading />}>
        <ErrorBoundary fallback={<AgentsViewError />}>
        <AgentsView />
          </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
