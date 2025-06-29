import { useTRPC } from "@/trpc/client";
import { StreamChannel } from "@stream-io/node-sdk";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

import { useCreateChatClient } from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

type Props = {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | undefined;
};

const ChatUI = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();

  const { mutateAsync: generateChatToken } = useMutation(
    trpc.meetings.generateChatToken.mutationOptions()
  );

  const [channel, setChannel] = useState<StreamChannel>();

  const client = useCreateChatClient({
    apiKey: process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY!,
    tokenOrProvider: generateChatToken,
    userData: {
      id: userId,
      name: userName,
      image: userImage,
    },
  });

  return <div>ChatUI</div>;
};

export default ChatUI;
