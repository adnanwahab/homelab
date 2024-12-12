// server.js
import { serve } from 'bun';

serve({
  port: 8080,
  
  // The fetch handler is called for all HTTP requests.
  // We check if this request is a websocket upgrade request.
  fetch(req, server) {
    if (server.upgrade(req)) {
      // If server.upgrade returns true, the request is being upgraded to a WebSocket.
      // We don’t need to return an HTTP response here.
      return;
    }

    // For non-WebSocket requests, respond with a simple text message.
    return new Response("This is a WebSocket server. Connect via WS!");
  },

  // The `websocket` property is used to handle WebSocket-related events.
  websocket: {
    // Called when a WebSocket connection is successfully established.
    open(ws) {
      console.log("WebSocket connection opened");
      ws.send("Hello from server! Feel free to send a message.");
    },

    // Called whenever a message is received from the client.
    message(ws, message) {
      console.log("Received message from client:", message);
      // Echo the message back to the client
      ws.send(`You said: ${message}`);
    },

    // Called when the client closes the WebSocket connection.
    close(ws) {
      console.log("WebSocket connection closed");
    },
  }
});