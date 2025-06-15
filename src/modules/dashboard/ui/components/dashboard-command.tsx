"use client";

import { CommandInput, CommandItem, CommandList, ResponsiveCommandDialog } from "@/components/ui/command";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardCommand = ({open, setOpen}: Props) => {
  return (
    <ResponsiveCommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Find a meeting or agent" />
      <CommandList>
        <CommandItem>
            Test
        </CommandItem>
      </CommandList>
    </ResponsiveCommandDialog>
  );
};

export default DashboardCommand;
