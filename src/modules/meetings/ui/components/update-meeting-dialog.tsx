"use client";

import ResponsiveDialog from "@/components/responsive-dialog";
import React from "react";
import MeetingForm from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingsGetOne } from "../../types";

type UpdateMeetingDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues: MeetingsGetOne;
};

const UpdateMeetingDialog = ({
  open,
  onOpenChange,
  initialValues,
}: UpdateMeetingDialogProps) => {
  const router = useRouter();

  return (
    <ResponsiveDialog
      title="Edit Meeting"
      description="Edit the meeting details"
      open={open}
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false);
        }}
        onCancel={() => onOpenChange(false)}
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  );
};

export default UpdateMeetingDialog;
