import { watch } from "fs";
import { join } from "path";

const WATCH_DIR = "/Users/shelbernstein/Desktop";
const TARGET_URL = "https://cooperative-robotics.com/receive-image";

// Create a file watcher
watch(WATCH_DIR, async (eventType, filename) => {
  if (filename !== "screenshot.png") return;
  
  try {
    const filePath = join(WATCH_DIR, filename);
    const file = Bun.file(filePath);
    
    console.log(`Sending ${filename} to server...`);
    
    const response = await fetch(TARGET_URL, {
      method: "POST",
      body: file,
      headers: {
        "Content-Type": "image/png"
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    console.log(`Successfully sent ${filename}`);
  } catch (error) {
    console.error("Error sending file:", error);
  }
});

console.log(`Watching ${WATCH_DIR} for changes...`);