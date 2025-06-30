import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  meetingId: string;
};

const UpcomingState = ({ meetingId }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting yet to be started"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button asChild className="w-full lg:w-auto">
          <Link href={`/call/${meetingId}`}>
            <VideoIcon />
            Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default UpcomingState;
