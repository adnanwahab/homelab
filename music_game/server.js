// server.js
import { serve } from "bun";
import ollama from "ollama";

async function chat(message) {
  const response = await ollama.chat({
    model: "llama3.2",
    messages: [{ role: "user", content: message }],
  });
  console.log(response.message.content);
  return response;
}
serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const msg = url.searchParams.get('msg');
    const response = await chat(msg);
    // If it's a preflight request
    if (req.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }

    return new Response(response, {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',           // Allow all domains (for development)
            'Access-Control-Allow-Methods': 'GET, POST',  // Specify allowed methods
            'Access-Control-Allow-Headers': 'Content-Type'
          }
    });

  },
});
