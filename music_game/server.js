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
    return new Response(response, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

  },
});
console.log("server started")
