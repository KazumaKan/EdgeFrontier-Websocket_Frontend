// Create a new WebSocket instance and connect to the server
const socket = new WebSocket("wss://server-test-v1-1.onrender.com/demo");

// Listener for when the connection is successfully opened
socket.onopen = () => {
  console.log("WebSocket is connected");
};

// Listener for receiving messages from the WebSocket server
socket.onmessage = (event) => {
  console.log("Received message:", event.data);
  // You can pass the received message to a component or handle it here
};

// Listener for error events
socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

// Listener for when the connection is closed
socket.onclose = () => {
  console.log("WebSocket connection closed");
};

export default socket;
