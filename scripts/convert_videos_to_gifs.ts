#!/usr/bin/env bun

import { readdirSync, existsSync, mkdirSync } from "fs";
import { spawnSync } from "bun";

const inputDir = "/Users/shelbernstein/homelab/web/public/vis/needs_processing";
const outputDir = "/Users/shelbernstein/homelab/web/public/vis/animated_gifs";

// Ensure the output directory exists
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Read all files from inputDir
const files = readdirSync(inputDir);

// Filter for .mp4 files and convert to .gif
files.forEach((file) => {
  if (file.endsWith(".mp4")) {
    const inputPath = `${inputDir}/${file}`;
    const outputPath = `${outputDir}/${file.replace(".mp4", ".gif")}`;

    console.log(`Converting: ${inputPath} → ${outputPath}`);

    // Invoke ffmpeg to convert MP4 to GIF
    const { status, stderr } = spawnSync([
      "ffmpeg",
      "-i",
      inputPath,
      "-vf",
      // adjust scale or frame rate if desired, e.g. scale=320:-1
      "scale=-1:-1:flags=lanczos,fps=15",
      "-loop",
      "0",
      outputPath,
    ]);

    // Check status for errors
    if (status !== 0) {
      console.error(`Failed to convert ${inputPath}:`, new TextDecoder().decode(stderr));
    } else {
      console.log(`Successfully converted to ${outputPath}`);
    }
  }
});
