import { serve } from "bun";

setInterval(() => {
  console.log("Server is running");
}, 5000);

const server = serve({
  port: 3001,
  fetch(req) {
    if (req.headers.get("upgrade") !== "websocket") {
      return new Response("Expected WebSocket", { status: 400 });
    }

    const { socket } = Bun.upgradeWebSocket(req);

    socket.onmessage = (event) => {
      console.log(`Message received: ${event.data}`);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  },
});

console.log(`WebSocket server is running at ws://localhost:3001`); 