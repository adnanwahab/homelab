import type { NextApiRequest, NextApiResponse } from 'next'
import { AccessToken } from '@livekit/server-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roomName, identity } = req.query;
  if (typeof roomName !== 'string' || typeof identity !== 'string') {
    return res.status(400).json({error: 'Missing roomName or identity'});
  }

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;

  const at = new AccessToken(apiKey, apiSecret, {
    identity,
    ttl: 3600, // 1 hour token
  });
  at.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const token = at.toJwt();
  res.status(200).json({ token });
}