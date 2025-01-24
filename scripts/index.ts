import fs from "fs";
import os from "os";

import { serve } from "bun";

import fetch from "node-fetch";

import { watch } from "fs";

import Anthropic from "@anthropic-ai/sdk";

const anthropic_api_key = await fetchAnthropicApiKey();

const client = new Anthropic({
    apiKey: anthropic_api_key,
});

const WATCH_DIR = "/home/adnan/Desktop/";
const username = os.userInfo().username;

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
                        text: "Describe the simplest solution to the problem in modern javascript 2025",
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
    return msg.content[0].text;
}

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

const PORT = 8080;

const desktopPath = `/home/${username}/Desktop`;
const imagePath = `${desktopPath}/received-image.png`;

const makeHTML = (result: string) => `<html>

<head>
<script>
// Initialize EventSource connection
const eventSource = new EventSource('/events');

// Handle SSE messages
eventSource.onmessage = (event) => {
console.log(event.data);
  if (event.data === 'refresh') {
    console.log('refresh');
    window.location.reload();
  }
};

// Handle EventSource connection events
eventSource.onerror = (error) => {
   window.location.reload();
  console.error('EventSource error:', error);
};
</script>
</head>
<body><h1>Hello World ${Date.now()}</h1>
<img src="/image" width="900" height="500" />
<div id="result">
${result}
</div>
</body></html>`;

const connectedClients = new Set<ReadableStreamDefaultController<any>>();

function start_server() {
    serve({
        port: PORT,
        idleTimeout: 255, // 30 seconds timeout

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

                const response = new Response(stream, {
                    headers: {
                        "Content-Type": "text/event-stream",
                        "Cache-Control": "no-cache",
                        Connection: "keep-alive",
                    },
                });

                // Store the controller to be able to send updates
                connectedClients.add(controller);

                return response;
            }

            if (pathname === "/receive-image") {
                const body = await req.blob();
                const arrayBuffer = await body.arrayBuffer();
                fs.writeFileSync(imagePath, Buffer.from(arrayBuffer));
                notifyClients();
                return new Response("Image received");
            }

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
            const result = await solve_leet_code_img(imagePath);

            return new Response(makeHTML(result), {
                headers: {
                    "Content-Type": "text/html",
                },
            });
        },
    });
}

// Function to notify all clients to refresh
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

import { createClient } from "@1password/sdk";

async function fetchAnthropicApiKey() {
    // Connect to the existing browser session using the WebSocket debugger URL
    const anthropic_api_key =
        process.env.ANTHROPIC_API_KEY ||
        "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";
    console.log(anthropic_api_key);
    return anthropic_api_key;
}

start_server();
