// DataHost.jsx
const socket = new WebSocket("wss://server-test-v1-1.onrender.com/demo");

// Declare variables to store data from the server
export const dataStore = {
  CO2: null,
  HUMID: null,
  PRESSURE: null,
  RA: null,
  TEMP: null,
  VOC: null,
  Event: null,
  HardwareID: null,
  TimeStamp: null,
};

// Listener for receiving messages from the WebSocket server
socket.onmessage = (event) => {
  try {
    if (event.data) {
      const parsedData = JSON.parse(event.data); // Parse the incoming JSON data
      console.log(parsedData); // Log received data

      // Update dataStore with new values
      dataStore.CO2 = parsedData.Data.CO2;
      dataStore.HUMID = parsedData.Data.HUMID;
      dataStore.PRESSURE = parsedData.Data.PRESSURE;
      dataStore.RA = parsedData.Data.RA;
      dataStore.TEMP = parsedData.Data.TEMP;
      dataStore.VOC = parsedData.Data.VOC;
      dataStore.Event = parsedData.Event;
      dataStore.HardwareID = parsedData.HardwareID;
      dataStore.TimeStamp = parsedData.TimeStamp;
    }
  } catch (err) {
    console.error("Error parsing WebSocket message:", err);
  }
};

// Other WebSocket events
socket.onopen = () => {
  console.log("WebSocket is connected");
};

socket.onerror = (error) => {
  console.error("WebSocket Error:", error);
};

socket.onclose = () => {
  console.log("WebSocket connection closed");
};

export default socket;
