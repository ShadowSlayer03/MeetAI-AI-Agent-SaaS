import EmptyState from "@/components/empty-state";
import React from "react";

const ProcessingState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 bg-white rounded-lg px-4 py-5">
      <EmptyState
        image="/processing.svg"
        title="Meeting completed"
        description="This meeting was completed, a summary will appear soon."
      />
    </div>
  );
};

export default ProcessingState;
