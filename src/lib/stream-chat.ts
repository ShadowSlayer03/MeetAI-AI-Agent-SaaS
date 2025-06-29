import "Server-only";

import {StreamChat} from "stream-chat";

const STREAM_CHAT_API_KEY = process.env.NEXT_PUBLIC_STREAM_CHAT_API_KEY;
const STREAM_CHAT_API_SECRET = process.env.STREAM_CHAT_SECRET_KEY;

if (!STREAM_CHAT_API_KEY || !STREAM_CHAT_API_SECRET) {
    throw new Error("Stream API credentials are missing!");
  }

export const streamChat = StreamChat.getInstance(
    STREAM_CHAT_API_KEY,
    STREAM_CHAT_API_SECRET
)