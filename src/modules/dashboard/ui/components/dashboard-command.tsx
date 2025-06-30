"use client";

import GeneratedAvatar from "@/components/generated-avatar";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, ResponsiveCommandDialog } from "@/components/ui/command";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction, useState } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({ open, setOpen }: Props) => {
  const router = useRouter();
  const trpc = useTRPC();
  const [search, setSearch] = useState("");

  const meetings = useQuery(trpc.meetings.getMany.queryOptions({
    search,
    pageSize: 100
  }))

  const agents = useQuery(trpc.agents.getMany.queryOptions({
    search,
    pageSize: 100
  }))



  return (
    <ResponsiveCommandDialog shouldFilter={false} open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" value={search} onValueChange={(val) => setSearch(val)} />
      <CommandList>
        <CommandGroup heading="Meetings">
          <CommandEmpty>
            <div className="text-muted-foreground text-sm">
              No meetings found
            </div>
          </CommandEmpty>
          {meetings.data?.items.map((meeting) => (
            <CommandItem onSelect={() => {
              router.push(`/meetings/${meeting.id}`);
              setOpen(false);
            }}
              key={meeting.id}
            >
              {meeting.name}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Agents">
          <CommandEmpty>
            <div className="text-muted-foreground text-sm">
              No agents found
            </div>
          </CommandEmpty>
          {agents.data?.items.map((agent) => (
            <CommandItem onSelect={() => {
              router.push(`/agents/${agent.id}`);
              setOpen(false);
            }}
              key={agent.id}
            >
              <GeneratedAvatar variant="botttsNeutral" className="size-5" seed={agent.name} />
              {agent.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </ResponsiveCommandDialog>
  );
};

export default DashboardCommand;
