import type { NextApiRequest, NextApiResponse } from 'next'
import { EgressClient } from '@livekit/server-sdk'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roomName } = req.body;
  if (typeof roomName !== 'string') {
    return res.status(400).json({error: 'Missing roomName'});
  }

  const apiKey = process.env.LIVEKIT_API_KEY!;
  const apiSecret = process.env.LIVEKIT_API_SECRET!;
  const host = process.env.LIVEKIT_SERVER_HOST!; // e.g. 'https://livekit.example.com'

  const egressClient = new EgressClient(host, apiKey, apiSecret);

  // Example: Start a composite egress and record to an S3 bucket or local file.
  // This requires that your LiveKit Egress is set up properly. 
  try {
    const egressInfo = await egressClient.startCompositeEgress({
      roomName,
      layout: 'grid',
      videoOnly: false,
      // Provide an output location here:
      fileOutputs: [{
        fileType: 'MP4',
        filepath: '/path/on/egress-server/recordings/my-room-recording.mp4',
      }],
    });
    res.status(200).json(egressInfo);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}