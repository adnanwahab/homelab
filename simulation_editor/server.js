// server.js
import { serve } from "bun";
import ollama from "ollama";

import fs from "fs";

async function handleGithubWebhook(req) {
  const payload = await req.json();
  
  // Log or process the webhook payload
  console.log('Received webhook:', payload.action, payload.repository?.full_name);
  
  // You might want to save webhooks to a file
  fs.appendFileSync('github-webhooks.log', 
    `${new Date().toISOString()}: ${payload.action} on ${payload.repository?.full_name}\n`
  );
  
  return new Response('Webhook received', { status: 200 });
}

async function chat(message) {
  const response = await ollama.chat({
    model: "llama3.2",
    messages: [{ role: "user", content: message }],
  });
  console.log(response.message.content);
  return response.message.content;
}
serve({
  port: 8080,
  async fetch(req) {
    const url = new URL(req.url);
    const msg = url.searchParams.get('msg');
    const response = await chat(msg);
    // If it's a preflight request
     // Add webhook route
     if (url.pathname === '/webhook/github') {
        if (req.method === 'POST') {
          return handleGithubWebhook(req);
        }
        return new Response('Only POST requests are accepted', { status: 405 });
      }

    return new Response(response, {
        headers: {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',           // Allow all domains (for development)
            'Access-Control-Allow-Methods': 'GET, POST',  // Specify allowed methods
            'Access-Control-Allow-Headers': 'Content-Type'
          }
    });

  },
});
