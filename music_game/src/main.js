function initializeWebSocket() {
    const socket = new WebSocket('ws://localhost:5173/ws');

    socket.onopen = () => {
        console.log('WebSocket connection established');
    };

    socket.onmessage = (event) => {
        console.log(`Received message: ${event.data}`);
    };

    socket.onclose = () => {
        console.log('WebSocket connection closed');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };
}

export default initializeWebSocket;