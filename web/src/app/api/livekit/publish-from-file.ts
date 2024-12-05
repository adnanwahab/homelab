// 2. Publish from FFmpeg

import type { NextApiRequest, NextApiResponse } from "next";
import ffmpeg from "fluent-ffmpeg";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const { inputFile, rtmpUrl } = req.body;

      // Set up FFmpeg command
      ffmpeg(inputFile)
        .outputOptions([
          "-c:v libx264",
          "-preset veryfast",
          "-c:a aac",
          "-f flv",
        ])
        .output(rtmpUrl)
        .on("end", () => {
          console.log("Stream ended");
        })
        .on("error", (err) => {
          console.error("Error:", err);
        })
        .run();

      res.status(200).json({ message: "Stream started" });
    } catch (error) {
      res.status(500).json({ error: "Failed to start stream" });
    }
  }
}
