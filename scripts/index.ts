import fs from "fs";
import os from "os";
import path from "path";
import { watch } from "fs";
import { serve } from "bun";
import fetch from "node-fetch";
import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@1password/sdk";

import OpenAI from "openai";

async function fetchOpenAIApiKey() {
    const openai_api_key = process.env.OPENAI_API_KEY;
    return openai_api_key;
}

const openai_api_key = await fetchOpenAIApiKey();
const client = new OpenAI({ apiKey: openai_api_key });


const WATCH_DIR = "/home/adnan/Desktop/";
const username = os.userInfo().username;
const PORT = 8080;
const desktopPath = `/home/${username}/Desktop`;
const imagePath = `${desktopPath}/received-image.png`;

const connectedClients = new Set<ReadableStreamDefaultController<any>>();

// Function to solve LeetCode problem from image
async function solve_leet_code_img(img_path: string) {
    const base64EncodedImage = fs.readFileSync(img_path, "base64");
    const response = await client.chat.completions.create({
        model: "gpt-4o",
        messages: [
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: "Describe the simplest solution to the problem in modern JavaScript 2025",
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
    const result = response.choices[0].message.content || "";
    return result;

    // const response_two = await client.chat.completions.create({
    //     model: "o1-preview",
    //     messages: [
    //         {
    //             role: "user",
    //             content: [
    //                 {
    //                     type: "text",
    //                     text: "Double check and improve this code and add some simple asserts to prove it is good",
    //                 },
    //                 {
    //                     type: "text",
    //                     text: result,
    //                 },
    //             ],
    //         },
    //     ],
    // });
    // return response_two.choices[0].message.content || '';
}

// Function to generate HTML content
function makeHTML(result: string): string {
    // Escape backticks, dollar signs, and newlines in the result
    const safeResult = result
        .replace(/`/g, "\\`")
        .replace(/\$/g, "\\$")
        .replace(/\n/g, "\\n");

    return `<html>
<head>
  <meta charset="utf-8" />
  <title>scripts/index.ts</title>

  <!-- Highlight.js Core & Default Theme -->

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

      margin-top: 2em;
    }
  </style>
</head>
<body>
    <h1>Hello Earth ${Date.now()}</h1>
    <img src="/image" width="900" height="500" />
  <h1>Remove Comments with Terser + Highlight.js</h1>

  <h2>Original Code (with comments)</h2>
  <pre><code id="originalCode" class="language-javascript"></code></pre>

  <h2>Processed Code (comments removed)</h2>
  <pre><code id="processedCode" class="language-javascript"></code></pre>

  <script>
    // Safely inject the code by escaping special characters
    const codeWithComments = \`${safeResult}\`.replace(/\\n/g, '\n');

    // Show the original code
    const originalCodeElement = document.getElementById('originalCode');
    originalCodeElement.textContent = codeWithComments;

    // Use try-catch to handle Terser errors gracefully
    async function processCode() {
        try {
            // First, wrap the code in a function to ensure it's valid JavaScript
            const wrappedCode = '(function() {\n' + codeWithComments + '\n})()';
            
            const result = await Terser.minify(wrappedCode, {
                mangle: false,
                compress: false,
                format: {
                    comments: false,
                    beautify: true,
                },
            });
            
            const processedCodeElement = document.getElementById('processedCode');
            // Remove the wrapper function from the result
            const cleanCode = result.code
                .replace(/^\(function\(\)\{/, '')
                .replace(/\}\)\(\);$/, '');
            processedCodeElement.textContent = cleanCode;

            // Highlight both code blocks
            hljs.highlightElement(originalCodeElement);
            hljs.highlightElement(processedCodeElement);
        } catch (error) {
            console.error('Terser error:', error);
            document.getElementById('processedCode').textContent = 'Error processing code: ' + error.message;
        }
    }

    processCode();

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


// Start the server
function start_server() {
    serve({
        port: PORT,
        idleTimeout: 255, // 255 seconds timeout

        async fetch(req, server) {
            const url = new URL(req.url);
            const pathname = url.pathname;
            console.log(pathname);

            // Handle SSE connections
            if (pathname === "/events") {
                let controller: ReadableStreamDefaultController<any>;

                const stream = new ReadableStream({
                    start(c) {
                        controller = c;
                        const encoder = new TextEncoder();

                        // Send initial connection message
                        controller.enqueue(
                            encoder.encode("data: connected\n\n"),
                        );
                    },

                    cancel() {
                        // Remove client when the stream is canceled (connection closed)
                        connectedClients.delete(controller);
                    },
                });

                // Store the controller to be able to send updates
                connectedClients.add(controller);

                return new Response(stream, {
                    headers: {
                        "Content-Type": "text/event-stream",
                        "Cache-Control": "no-cache",
                        Connection: "keep-alive",
                    },
                });
            }

            // Handle image reception
            if (pathname === "/receive-image") {
                console.log("Received image");
                const body = await req.blob();
                const arrayBuffer = await body.arrayBuffer();
                fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
                notifyClients();
                return new Response("Image received");
            }

            // Serve the image
            if (pathname === "/image") {
                try {
                    const imageData = fs.readFileSync(imagePath);
                    return new Response(imageData, {
                        headers: {
                            "Content-Type": "image/png",
                        },
                    });
                } catch (error) {
                    return new Response("Image not found", { status: 404 });
                }
            }

            // Solve LeetCode problem and serve HTML
            const result = await solve_leet_code_img(imagePath);

            return new Response(makeHTML(result), {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        },
    });
}

// Watch for new screenshots
watch(WATCH_DIR, async (eventType, filename) => {
    if (filename !== "screenshot.png") return;

    try {
        const filePath = path.join(WATCH_DIR, filename);
        const file = Bun.file(filePath);

        console.log(`Sending ${filename} to server...`);

        const response = await fetch(TARGET_URL, {
            method: "POST",
            body: file,
            headers: {
                "Content-Type": "image/png",
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`Successfully sent ${filename}`);
    } catch (error) {
        console.error("Error sending file:", error);
    }
});

// Start the server
start_server();

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

