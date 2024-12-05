// export async function POST(req: Request) {

// }

// // pages/api/authenticate.js
import { AccessToken, RoomServiceClient } from 'livekit-server-sdk';

export default async function handler(req, res) {
  const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;

  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { identity } = req.body;

  if (!identity) {
    return res.status(400).json({ error: 'Missing identity' });
  }

  // Create an access token
  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
    identity,
  });

  at.addGrant({
    roomJoin: true,
    room: 'collaborative-canvas',
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();

  res.status(200).json({ token });
}