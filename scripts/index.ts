import fs from "fs";
import os from "os";
import path from "path";
import { watch } from "fs";
import { serve } from "bun";
import fetch from "node-fetch";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@1password/sdk";

async function fetchAnthropicApiKey() {
  const anthropic_api_key =
    process.env.ANTHROPIC_API_KEY;
  console.log(anthropic_api_key);
  return anthropic_api_key;
}

const anthropic_api_key = await fetchAnthropicApiKey();
const client = new Anthropic({ apiKey: anthropic_api_key });

const WATCH_DIR = "/home/adnan/Desktop/";
const username = os.userInfo().username;
const PORT = 8080;
const desktopPath = `/home/${username}/Desktop`;
const imagePath = `${desktopPath}/received-image.png`;
const connectedClients = new Set();

async function solve_leet_code_img(img_path) {
  const base64EncodedImage = fs.readFileSync(img_path, "base64");
  const msg = await client.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2024,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Describe the simplest solution to the problem in modern JavaScript 2025",
          },
          {
            type: "image",
            source: {
              type: "base64",
              media_type: "image/png",
              data: base64EncodedImage,
            },
          },
        ],
      },
    ],
  });

  // Return the text we want to display on our HTML page
  return msg.content[0].text;
}

/**
 * Creates an HTML page that:
 *  - Shows the image
 *  - Loads Terser and Highlight.js from CDNs
 *  - Displays two code blocks: Original and "comments-removed"
 *  - Uses SSE to refresh if needed
 */
function makeHTML(result) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Terser & Highlight.js Demo</title>

  <!-- Highlight.js Default Theme -->
  <link rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>

  <!-- Terser from unpkg -->
  <script src="https://unpkg.com/terser/dist/bundle.min.js"></script>

  <style>
    body {
      margin: 20px;
      font-family: sans-serif;
    }
    pre {
      border: 1px solid #ddd;
      background: #f8f8f8;
      padding: 10px;
      overflow-x: auto;
    }
    h2 {
      margin-top: 1.2em;
      margin-bottom: 0.5em;
    }
  </style>

  <script>
    // Set up SSE to refresh the page if "/events" says "refresh"
    const eventSource = new EventSource('/events');
    eventSource.onmessage = (event) => {
      if (event.data === 'refresh') {
        window.location.reload();
      }
    };
    eventSource.onerror = (error) => {
      console.error('EventSource error:', error);
      window.location.reload();
    };
  </script>
</head>
<body>
  <h1>Hello World ${Date.now()}</h1>
  <img src="/image" width="800" height="450" alt="Received Image" />

  <h2>Original Code/Text (as returned by Anthropic)</h2>
  <pre><code id="originalCode" class="language-javascript"></code></pre>

  <h2>Processed Code (comments removed)</h2>
  <pre><code id="processedCode" class="language-javascript"></code></pre>

  <script>
    // The "result" from Anthropic - assume it's some JS code with comments
    const codeWithComments = \`${escapeBackticks(result)}\`;

    // We'll show the original code in #originalCode
    document.getElementById('originalCode').textContent = codeWithComments;

    // Use Terser to remove comments, but keep it "beautified"
    Terser.minify(codeWithComments, {
      mangle: false,
      compress: false,
      format: {
        comments: false,
        beautify: true,
      },
    }).then(minified => {
      // If successful, show the stripped code in #processedCode
      document.getElementById('processedCode').textContent =
        minified.code || "// Terser produced no code!";

      // Apply syntax highlighting
      hljs.highlightElement(document.getElementById('originalCode'));
      hljs.highlightElement(document.getElementById('processedCode'));
    }).catch(err => {
      // If Terser fails, just show an error
      document.getElementById('processedCode').textContent =
        "// Error stripping comments: " + err.toString();
    });

    // Helper to handle backticks in the "result" string
    function escapeBackticks(str) {
      return str.replace(/`/g, '\\\`');
    }
  </script>
</body>
</html>`;
}

function notifyClients() {
  const encoder = new TextEncoder();
  const message = encoder.encode("data: refresh\n\n");
  for (const controller of connectedClients) {
    try {
      controller.enqueue(message);
    } catch {
      connectedClients.delete(controller);
    }
  }
}

function start_server() {
  serve({
    port: PORT,
    idleTimeout: 255,
    async fetch(req, server) {
      const url = new URL(req.url);
      const pathname = url.pathname;
      console.log(pathname);

      // SSE endpoint for refreshing
      if (pathname === "/events") {
        let controller;
        const stream = new ReadableStream({
          start(c) {
            controller = c;
            const encoder = new TextEncoder();
            // Announce the connection
            controller.enqueue(encoder.encode("data: connected\n\n"));
          },
          cancel() {
            connectedClients.delete(controller);
          },
        });
        connectedClients.add(controller);
        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        });
      }

      // Endpoint for receiving an image
      if (pathname === "/receive-image") {
        const body = await req.blob();
        const arrayBuffer = await body.arrayBuffer();
        fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
        notifyClients();
        return new Response("Image received");
      }

      // Endpoint for serving the uploaded image
      if (pathname === "/image") {
        try {
          const imageData = fs.readFileSync(imagePath);
          return new Response(imageData, {
            headers: { "Content-Type": "image/png" },
          });
        } catch (error) {
          return new Response("Image not found", { status: 404 });
        }
      }

      // Default route: Solve the LeetCode problem from the image, then show HTML
      const result = await solve_leet_code_img(imagePath);
      return new Response(makeHTML(result), {
        headers: { "Content-Type": "text/html" },
      });
    },
  });
}

watch(WATCH_DIR, async (eventType, filename) => {
  if (filename !== "screenshot.png") return;

  try {
    const filePath = path.join(WATCH_DIR, filename);
    const file = Bun.file(filePath);
    console.log(`Sending ${filename} to server...`);

    const response = await fetch(TARGET_URL, {
      method: "POST",
      body: file,
      headers: { "Content-Type": "image/png" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(`Successfully sent ${filename}`);
  } catch (error) {
    console.error("Error sending file:", error);
  }
});

start_server();