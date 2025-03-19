import { watch } from "fs";

const WATCH_DIR = "/home/adnan/Desktop/";
const PORT = 3000;
import { serve } from "bun";
/**
 * Generate a detailed explanation for code using Claude
 */
async function getExplanation(code: string, problemName: string) {
    try {
        const msg = await client.messages.create({
            model: "claude-3-7-sonnet-20250219",
            max_tokens: 2000,
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Please provide a detailed, step-by-step explanation of this ${problemName} solution code. Break down the approach, algorithm, and how each part works. Make it easy to understand for someone learning algorithms:

\`\`\`javascript
${code}
\`\`\`

Explain:
1. The core algorithm/strategy
2. What each section of code does
3. The time and space complexity analysis
4. Any edge cases handled
5. Any patterns or techniques used (e.g., two-pointers, sliding window)

Keep your explanation clear and thorough.`,
                        },
                    ],
                },
            ],
        });

        return msg.content[0].text;
    } catch (error) {
        console.error("Error getting explanation:", error);
        return "Failed to generate explanation. Please try again.";
    }
}

/**
 * Notifies all connected SSE clients to reload
 */
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
 * Get problem details by ID
 */
function getProblemById(id: number) {
    try {
        return db
            .query(
                `
      SELECT * FROM problems WHERE id = ?
    `,
                [id],
            )
            .get();
    } catch (error) {
        console.error("Error getting problem by ID:", error);
        return null;
    }
}

/**
 * Main server logic with expanded endpoints:
 * - SSE endpoint at "/events"
 * - "/receive-image" to store the incoming image and process it
 * - "/image" to serve the uploaded image
 * - "/history" to view problem history
 * - "/problem/:id" to view a specific problem
 * - "/explain" to get a detailed explanation of code
 * - "/feedback" to record user feedback on solutions
 * - Default route: process the image and render the solution HTML
 */
function start_server() {
    serve({
        port: PORT,
        idleTimeout: 255,
        async fetch(req, server) {
            const url = new URL(req.url);
            const pathname = url.pathname;
            console.log(`Request to ${pathname}`);

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

            // History page
            if (pathname === "/history") {
                return new Response(makeHistoryHTML(), {
                    headers: { "Content-Type": "text/html" },
                });
            }

            // View specific problem
            if (pathname.startsWith("/problem/")) {
                const problemId = parseInt(pathname.split("/").pop() || "0");
                if (isNaN(problemId) || problemId <= 0) {
                    return new Response("Invalid problem ID", { status: 400 });
                }

                const problem = getProblemById(problemId);
                if (!problem) {
                    return new Response("Problem not found", { status: 404 });
                }

                // Generate HTML for the specific problem
                return new Response(makeHTML(problem.solution), {
                    headers: { "Content-Type": "text/html" },
                });
            }

            // Get explanation for code
            if (pathname === "/explain" && req.method === "POST") {
                try {
                    const body = await req.json();
                    const { code, problemName } = body;

                    if (!code) {
                        return new Response("No code provided", {
                            status: 400,
                        });
                    }

                    const explanation = await getExplanation(
                        code,
                        problemName || "LeetCode problem",
                    );
                    return new Response(explanation, {
                        headers: { "Content-Type": "text/plain" },
                    });
                } catch (error) {
                    console.error("Error handling explain request:", error);
                    return new Response("Error processing request", {
                        status: 500,
                    });
                }
            }

            // Record feedback
            if (pathname === "/feedback" && req.method === "POST") {
                try {
                    const body = await req.json();
                    const { problemName, isHelpful, feedbackText } = body;

                    if (!problemName) {
                        return new Response("Problem name is required", {
                            status: 400,
                        });
                    }

                    recordFeedback(problemName, isHelpful, feedbackText);
                    return new Response("Feedback recorded", {
                        headers: { "Content-Type": "text/plain" },
                    });
                } catch (error) {
                    console.error("Error handling feedback:", error);
                    return new Response("Error recording feedback", {
                        status: 500,
                    });
                }
            }

            // Default route: process the image and display solution
            try {
                // Check if we have an image file
                let fileExists = false;
                try {
                    fs.accessSync(imagePath, fs.constants.F_OK);
                    fileExists = true;
                } catch (e) {
                    // File doesn't exist
                }

                if (fileExists) {
                    console.log("Solving LeetCode problem from image...");
                    const result = await solve_with_history(imagePath, {
                        language: "JavaScript",
                        approachCount: 2,
                        includeTestCases: true,
                        focusOnOptimality: true,
                    });

                    return new Response(makeHTML(result), {
                        headers: { "Content-Type": "text/html" },
                    });
                } else {
                    // No image found, show basic instructions
                    return new Response(
                        `
            <!DOCTYPE html>
            <html>
            <head>
              <title>LeetCode Solver - Waiting for Image</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
                  max-width: 800px;
                  margin: 0 auto;
                  padding: 2rem;
                  line-height: 1.6;
                }
                h1 { color: #4285f4; }
                .card {
                  background: #f8f9fa;
                  border-radius: 8px;
                  padding: 1.5rem;
                  margin: 2rem 0;
                  border-left: 5px solid #4285f4;
                }
                code {
                  background: #eee;
                  padding: 2px 4px;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <h1>LeetCode Solver</h1>
              <div class="card">
                <h2>Waiting for a LeetCode problem</h2>
                <p>Please take a screenshot of a LeetCode problem and save it as <code>screenshot.png</code> on your desktop.</p>
                <p>The application will automatically detect the file and process it.</p>
              </div>
            </body>
            </html>
          `,
                        {
                            headers: { "Content-Type": "text/html" },
                        },
                    );
                }
            } catch (error) {
                console.error("Error in default route:", error);
                return new Response(
                    `<html><body><h1>Error</h1><p>${error.message}</p></body></html>`,
                    {
                        headers: { "Content-Type": "text/html" },
                        status: 500,
                    },
                );
            }
        },
    });
}

// Watch a directory for a new "screenshot.png" and process it
watch(WATCH_DIR, async (eventType, filename) => {
    if (filename !== "screenshot.png") return;

    try {
        const filePath = path.join(WATCH_DIR, filename);
        const file = Bun.file(filePath);
        console.log(`Processing ${filename}...`);

        // Copy the file to the standard location
        const fileData = await file.arrayBuffer();
        fs.writeFileSync(imagePath, Buffer.from(fileData));

        // Notify any connected clients that a new image is available
        notifyClients();

        console.log(`Successfully processed ${filename}`);
    } catch (error) {
        console.error("Error processing file:", error);
    }
});

/**
 * Main function to start the application
 */
async function main() {
    try {
        console.log("Starting LeetCode Solver...");
        console.log(`Watching directory: ${WATCH_DIR}`);
        console.log(`Server running at http://localhost:${PORT}`);

        // Start the server
        start_server();

        console.log("Ready to process LeetCode problems!");
        console.log(
            "Take a screenshot of a LeetCode problem and save it as 'screenshot.png' on your desktop.",
        );
    } catch (error) {
        console.error("Error starting application:", error);
        process.exit(1);
    }
}

// Start the application
main();
