import "server-only"; 

import { StreamClient } from "@stream-io/node-sdk";

const STREAM_API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const STREAM_API_SECRET = process.env.STREAM_API_SECRET;

if (!STREAM_API_KEY || !STREAM_API_SECRET) {
  throw new Error("Stream API credentials are missing!");
}

export const streamVideo = new StreamClient(STREAM_API_KEY, STREAM_API_SECRET);
