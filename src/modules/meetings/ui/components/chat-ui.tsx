import LoadingState from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { Channel as StreamChannel } from "stream-chat";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

import { Channel, Chat, MessageInput, MessageList, Thread, useCreateChatClient, Window } from "stream-chat-react";

import "stream-chat-react/dist/css/v2/index.css";

type Props = {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string | null | undefined;
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
      image: userImage as string,
    },
  });

  useEffect(() => {
    if (!client) return;

    const channel = client.channel("messaging", meetingId, {
      members: [userId]
    })

    setChannel(channel);

  }, [client, meetingId, userId])
  if (!client) {
    return <LoadingState title="Loading Chat" description="This may take a few seconds" />
  }

  return (
  <div className="bg-white rounded-lg border overflow-hidden">
    <Chat client={client}>
      <Channel channel={channel}>
        <Window>
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 truncate">{meetingName}</h2>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
            <MessageList />
          </div>

          {/* Message Input */}
          <MessageInput />
        </Window>

        {/* Thread view */}
        <Thread />
      </Channel>
    </Chat>
  </div>
);

};

export default ChatUI;
