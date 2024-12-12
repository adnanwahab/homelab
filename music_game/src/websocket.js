function initializeWebSocket() {
        const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener('open', () => {
  console.log("Connected to the server");
  socket.send("Hello server");
});

    socket.addEventListener('message', (event) => {
        console.log("Message from server:", event.data);
    });

    setInterval(() => {
        socket.send("Hello server");
    }, 1000);
}

export default initializeWebSocket;
