import fs from "fs";
import os from "os";
import path from "path";
import { watch } from "fs";
import { serve } from "bun";
import fetch from "node-fetch";
import OpenAI from "openai";
import { createClient } from "@1password/sdk";

/**
 * Fetches the OpenAI API key from environment or defaults.
 */
async function fetchOpenAIApiKey() {
    const openai_api_key =
        process.env.OPENAI_API_KEY || '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'
    console.log("openai_api_key", 123);
    return openai_api_key;
}

const openai_api_key = await fetchOpenAIApiKey();
const client = new OpenAI({ apiKey: openai_api_key });

const WATCH_DIR = "/home/adnan/Desktop/";
const username = os.userInfo().username;
const PORT = 8888;
const desktopPath = `/home/${username}/Desktop`;
const imagePath = `${desktopPath}/received-image.png`;
const connectedClients = new Set<ReadableStreamDefaultController>();

/**
 * Calls OpenAI with an image, receives a textual answer describing
 * a solution in modern JavaScript, returns the text from the API.
 */
async function solve_leet_code_img(img_path: string) {
    // return "dummy text if needed";
    const base64EncodedImage = fs.readFileSync(img_path, "base64");
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Describe the simplest solution to the problem in modern javascript 2025",
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: `data:image/png;base64,${base64EncodedImage}`,
                        },
                    },
                ],
            },
        ],
        max_tokens: 2024,
    });
    const result = response.choices?.[0]?.message?.content || "";

    //return result;
    // Optional second call for "improved" version
    const response_Improved = await client.chat.completions.create({
        model: "o1-preview",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text:
                            "improve this solution as much as possible and add asserts for a coder-pad-like environment for javascript 2025 \n" +
                            result,
                    },
                ],
            },
        ],
    });

    return response_Improved.choices?.[0]?.message?.content || result;
}

/**
 * Utility to safely escape HTML special characters.
 */
function escapeHTML(text: string) {
    return text.replace(/[&<>"']/g, (match) => {
        switch (match) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
        }
        return match;
    });
}

/**
 * Creates an HTML page that:
 *   1) Uses SSE (Server-Sent Events) to auto-refresh when an image is received.
 *   2) Displays the uploaded image.
 *   3) Loads Terser & Highlight.js from CDNs.
 *   4) Splits the original code into lines, highlights each line, and on hover:
 *      - highlights that line’s background
 *      - copies that line’s text to an <input>.
 *   5) Same with the processed (comments-removed) code.
 */
function makeHTML(result: string): string {
    // We store the raw text in a JS string:
    const safeResult = JSON.stringify(result);

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>o.type</title>

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
      position: relative;
    }
    h2 {
      margin-top: 1.2em;
      margin-bottom: 0.5em;
    }
    /* Each individual line */
    .code-line {
      display: inline-block;
      width: 100%;
    }
    /* Highlight the hovered line */
    .code-line.highlight-line {
      background-color: #fffb91; /* pale yellow */
    }
    /* Extra pointer styling so it’s clear lines are interactive */
    .code-line:hover {
      cursor: pointer;
    }
  </style>

  <script>
    // We'll do line-by-line splitting/hover in initCodeBlocks
    async function initCodeBlocks(codeWithComments) {
      // --- Original Code ---

      // 1) Split into lines, wrap each line in a span
      const originalLines = codeWithComments.split('\\n').map(line =>
        '<span class="code-line">' + ${escapeHTML.toString()}(line) + '</span>'
      ).join('\\n');

      // 2) Populate #originalCode
      const originalCodeEl = document.getElementById('originalCode');
      originalCodeEl.innerHTML = originalLines;

      // 3) Syntax highlight
      hljs.highlightElement(originalCodeEl);

      // 4) Hover/copy
      originalCodeEl.querySelectorAll('.code-line').forEach(span => {
        span.addEventListener('mouseenter', () => {
          span.classList.add('highlight-line');
          document.getElementById('lineInput').value = span.textContent;
        });
        span.addEventListener('mouseleave', () => {
          span.classList.remove('highlight-line');
        });
      });

      // --- Processed Code (comments removed) ---
      const result = await Terser.minify(codeWithComments, {
        mangle: false,
        compress: false,
        format: {
          comments: false,
          beautify: true
        }
      });
      const processedCode = result.code || '// Terser produced empty code!';

      const processedLines = processedCode.split('\\n').map(line =>
        '<span class="code-line">' + ${escapeHTML.toString()}(line) + '</span>'
      ).join('\\n');

      const processedCodeEl = document.getElementById('processedCode');
      processedCodeEl.innerHTML = processedLines;
      hljs.highlightElement(processedCodeEl);

      processedCodeEl.querySelectorAll('.code-line').forEach(span => {
        span.addEventListener('mouseenter', () => {
          span.classList.add('highlight-line');
          document.getElementById('lineInput').value = span.textContent;
        });
        span.addEventListener('mouseleave', () => {
          span.classList.remove('highlight-line');
        });
      });
    }
  </script>
</head>
<body>
  <h1>Hello World ${Date.now()}</h1>

  <img src="/image" width="800" height="450" alt="Received Image" />

  <h2>Original Code/Text (from OpenAI)</h2>
  <pre><code id="originalCode" class="language-javascript"></code></pre>

  <h2>Processed Code (comments removed)</h2>
  <pre><code id="processedCode" class="language-javascript"></code></pre>

  <script>
    // SSE auto-reload if the server pushes "refresh"
    const eventSource = new EventSource('/events');
    eventSource.onmessage = (event) => {
      if (event.data === 'refresh') {
        window.location.reload();
      }
    };
    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      window.location.reload();
    };

    // The server-passed string from OpenAI
    const codeWithComments = ${safeResult};
    // Initialize line-by-line logic
    initCodeBlocks(codeWithComments);
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
                console.log("Received image and wrote to desktop");
                // Optionally notify all clients to refresh
                // notifyClients();
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

            // Default route: run the solution pipeline, display the HTML
            const result = await solve_leet_code_img(imagePath);
            return new Response(makeHTML(result), {
                headers: { "Content-Type": "text/html" },
            });
        },
    });
}

// Watch a directory for "screenshot.png" and upload it to /receive-image
watch(WATCH_DIR, async (eventType, filename) => {
    if (filename !== "screenshot.png") return;

    try {
        const filePath = path.join(WATCH_DIR, filename);
        const file = Bun.file(filePath);
        console.log(`Sending ${filename} to server...`);

        // Provide an actual endpoint for posting the screenshot
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
console.log(
    `Server running at http://localhost:${PORT} - jupyyter.cooperative-robotics.com`,
);
