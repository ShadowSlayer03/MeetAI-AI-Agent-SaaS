"use client";

import ErrorState from "@/components/error-state";
import { MeetingsGetOne } from "@/modules/meetings/types";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import React from "react";
import CallProvider from "../components/call-provider";

type Props = {
  meetingId: string;
};

const CallView = ({ meetingId }: Props) => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  ) as MeetingsGetOne;

  if (data.status === "completed") {
    return (
      <div className="flex h-screen items-center">
        <ErrorState title="Meeting has ended" description="You can no longer join the meeting" />
      </div>
    );
  }

  return <CallProvider meetingId={meetingId} meetingName={data.name} />;
};

export default CallView;
