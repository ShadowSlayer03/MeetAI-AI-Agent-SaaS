"use client";

import ErrorState from "@/components/error-state";
import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DataTable } from "../../../../components/data-table";
import { columns } from "../components/columns";
import EmptyState from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import DataPagination from "../../../../components/data-pagination";
import { useRouter } from "next/navigation";
import { AgentGetManyResponse } from "../../types";

export const AgentsView = () => {
  const router = useRouter();
  const trpc = useTRPC();

  const [filters, setFilters] = useAgentsFilters();

  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({ ...filters })
  ) as { data: AgentGetManyResponse };

  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`/agents/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) => setFilters({ page })}
      />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first agent"
          description="Create an agent to join your meetings, agents will follow instructions and interact with participants during the call."
        />
      )}
    </div>
  );
};

export const AgentsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds..."
    />
  );
};

export const AgentsViewError = () => {
  return (
    <ErrorState
      title="Failed to load agents"
      description="Please try again later!"
    />
  );
};
