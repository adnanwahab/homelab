function initializeWebSocket() {
        const socket = new WebSocket("ws://localhost:8080");

socket.addEventListener('open', () => {
  console.log("Connected to the server");
  socket.send("Hello server");
});

    socket.addEventListener('message', (event) => {
        console.log("Message from server:", event.data);
    });

    // setInterval(() => {
    //     socket.send("Hello server");
    // }, 1000);



    document.getElementById('send').addEventListener('click', () => {
        const message = document.getElementById('input').value;
        console.log(message);
        socket.send(message);
    });

    document.getElementById('autocomplete').addEventListener('click', () => {
        //const message = document.getElementById('input').value;
        console.log('autocomplete');
        socket.send('change styling of css to slate blue 300');
    });
}

export default initializeWebSocket;
