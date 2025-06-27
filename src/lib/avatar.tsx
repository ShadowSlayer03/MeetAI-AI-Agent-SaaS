import React from "react";
import { createAvatar } from "@dicebear/core";
import { botttsNeutral, initials } from "@dicebear/collection";

type Props = {
  seed: string;
  variant: "botttsNeutral" | "initials";
};

const generateAvatarURI = ({ seed, variant }: Props) => {
  let avatar;

  if (variant === "botttsNeutral") {
    avatar = createAvatar(botttsNeutral, { seed });
  }else{
    avatar = createAvatar(initials, {seed})
  }
  return avatar.toDataUri();
};

export default generateAvatarURI;
