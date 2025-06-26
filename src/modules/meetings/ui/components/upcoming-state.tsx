import EmptyState from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, BanIcon, VideoIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelling: boolean;
};

const UpcomingState = ({ meetingId, onCancelMeeting, isCancelling }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-4 py-5">
      <EmptyState
        image="/upcoming.svg"
        title="Meeting yet to be started"
        description="Once you start this meeting, a summary will appear here"
      />
      <div className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full">
        <Button
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelling}
        >
          <BanIcon />
          Cancel Meeting
        </Button>
        <Button asChild className="w-full lg:w-auto" disabled={isCancelling}>
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
