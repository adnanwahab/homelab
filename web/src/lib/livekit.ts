// lib/livekit.ts
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';


const apiKey = 'APItSbwXvSjh4cf';
const apiSecret = '118jYtOPXJUYVeH7ZMSlQSoMKzPNve6sATZ149DfmfYC';
const host = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';

// if (!apiKey || !apiSecret || !host) {
//   throw new Error("LIVEKIT_API_KEY, LIVEKIT_API_SECRET, and LIVEKIT_WS_URL must be set");
// }

export const roomService = new RoomServiceClient(host, apiKey, apiSecret);