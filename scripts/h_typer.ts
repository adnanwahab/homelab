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
        process.env.ANTHROPIC_API_KEY ||
        "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";
    console.log(anthropic_api_key);
    return anthropic_api_key;
}

const anthropic_api_key = await fetchAnthropicApiKey();
const client = new Anthropic({ apiKey: anthropic_api_key });

const WATCH_DIR = "/home/adnan/Desktop/";
const username = os.userInfo().username;
const PORT = 8000;
const desktopPath = `/home/${username}/Desktop`;
const imagePath = `${desktopPath}/received-image.png`;
const connectedClients = new Set<ReadableStreamDefaultController>();

/**
 * Calls Anthropic with an image, receives a textual answer describing
 * a solution in modern JavaScript, returns the text from the API.
 */
async function solve_leet_code_img(img_path: string) {
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

    // Return only the text from the first piece of content
    return msg.content[0].text;
}

/**
 * Creates an HTML page that:
 *   - Uses SSE (Server-Sent Events) to auto-refresh when an image is received
 *   - Displays the uploaded/received image
 *   - Loads Terser & Highlight.js from CDNs
 *   - Shows two code blocks: the original text from Anthropic, and a version
 *     with comments removed (via Terser)
 *   - Uses JSON.stringify to safely embed the text from Anthropic in the script
 */
function makeHTML(result: string): string {
    // Safely serialize "result" (which may include quotes, backticks, etc.)
    const safeResult = JSON.stringify(result);

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
    // Set up SSE to refresh if "/events" emits "refresh"
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

  <h2>Original Code/Text (from Anthropic)</h2>
  <pre><code id="originalCode" class="language-javascript"></code></pre>

  <h2>Processed Code (comments removed)</h2>
  <pre><code id="processedCode" class="language-javascript"></code></pre>

  <script>
    // The Anthropic result is safely embedded as a JS string
    const codeWithComments = ${safeResult};

    // Show the original text in #originalCode
    document.getElementById('originalCode').textContent = codeWithComments;

    // Run Terser to remove comments, keep it semi-readably formatted
    Terser.minify(codeWithComments, {
      mangle: false,
      compress: false,
      format: {
        comments: false,
        beautify: true,
      },
    })
    .then((minified) => {
      document.getElementById('processedCode').textContent =
        minified.code || "// Terser produced empty code!";
      // Syntax-highlight both code blocks
      hljs.highlightElement(document.getElementById('originalCode'));
      hljs.highlightElement(document.getElementById('processedCode'));
    })
    .catch((err) => {
      document.getElementById('processedCode').textContent =
        "// Error removing comments: " + err.toString();
    });
  </script>
</body>
</html>`;
}

/** Notifies all connected SSE clients to reload. */
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

/**
 * Main server logic.
 * - SSE endpoint at "/events".
 * - "/receive-image" to store the incoming image, then notify all clients.
 * - "/image" to serve the uploaded image.
 * - Default route: read the image with solve_leet_code_img(), render the HTML.
 */
function start_server() {
    serve({
        port: PORT,
        idleTimeout: 255,
        async fetch(req, server) {
            const url = new URL(req.url);
            const pathname = url.pathname;
            console.log(pathname);

            // SSE endpoint
            if (pathname === "/events") {
                let controller: ReadableStreamDefaultController;
                const stream = new ReadableStream({
                    start(c) {
                        controller = c;
                        const encoder = new TextEncoder();
                        // Send initial message
                        controller.enqueue(
                            encoder.encode("data: connected\n\n"),
                        );
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

            // Endpoint to receive an image
            if (pathname === "/receive-image") {
                const body = await req.blob();
                const arrayBuffer = await body.arrayBuffer();
                fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
                notifyClients();
                return new Response("Image received");
            }

            // Serve the uploaded image
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

            // Default route: run the OCR/solution pipeline, display the HTML
            const result = await solve_leet_code_img(imagePath);
            return new Response(makeHTML(result), {
                headers: { "Content-Type": "text/html" },
            });
        },
    });
}

// Watch a directory for a new "screenshot.png" and upload it somewhere else
watch(WATCH_DIR, async (eventType, filename) => {
    if (filename !== "screenshot.png") return;

    try {
        const filePath = path.join(WATCH_DIR, filename);
        const file = Bun.file(filePath);
        console.log(`Sending ${filename} to server...`);

        // Make sure you define or set this somewhere (e.g. in your .env or code).
        // For example: const TARGET_URL = "http://yourserver/receive-image";
        // Otherwise it won't know where to POST.
        const TARGET_URL =
            process.env.TARGET_URL || "http://localhost:8080/receive-image";

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
