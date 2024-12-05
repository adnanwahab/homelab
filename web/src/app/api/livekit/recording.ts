import type { NextApiRequest, NextApiResponse } from "next";
import { LiveKit } from "livekit-server-sdk";

const livekitClient = new LiveKit({
  apiKey: process.env.LIVEKIT_API_KEY!,
  apiSecret: process.env.LIVEKIT_API_SECRET!,
  host: process.env.LIVEKIT_HOST!,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { roomName } = req.body;

      // Start recording
      const recording = await livekitClient.startEgressRecording({
        roomName,
        output: {
          filepath: `recordings/${roomName}-${Date.now()}.mp4`,
        },
      });

      res.status(200).json({ egressId: recording.egressId });
    } catch (error) {
      res.status(500).json({ error: "Failed to start recording" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { egressId } = req.query;
      await livekitClient.stopEgress(egressId as string);
      res.status(200).json({ message: "Recording stopped" });
    } catch (error) {
      res.status(500).json({ error: "Failed to stop recording" });
    }
  }
}
