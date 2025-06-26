import EmptyState from "@/components/empty-state";
import React from "react";

const CancelledState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-4 py-5">
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="This meeting was cancelled."
      />
    </div>
  );
};

export default CancelledState;
