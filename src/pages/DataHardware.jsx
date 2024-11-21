import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const WebSocket = () => {
  const { lastMessage } = useWebSocket("wss://server-test-v1-0.onrender.com", {
    // host server
    shouldReconnect: () => true, // When the connect is lost, it will reconnect immediately
  });

  // Declare a "data" variable
  const [data, setData] = useState({
    CO2: "Loading...",
    HUMID: "Loading...",
    PRESSURE: "Loading...",
    RA: "Loading...",
    TEMP: "Loading...",
    VOC: "Loading...",
    Event: "Loading...",
    HardwareID: "Loading...",
    TimeStamp: "Loading...",
  });

  //   Manage something that will happen
  useEffect(() => {
    try {
      if (lastMessage?.data) {
        // Check if the data is entered in "lastMessage"
        const parsedData = JSON.parse(lastMessage.data); // Convert JavaScript Obj. to JSON
        console.log(parsedData); // Print the converted data into parsedData

        // Format numerical values to two decimal places
        const formatData = (value) => {
          return typeof value === "number" ? value.toFixed(2) : value;
        };

        // Function to validate if the Event value contains only alphabetic characters
        const validateEvent = (event) => {
          // Check if the event is alphabetic using regex
          return /^[a-zA-Z]*$/.test(event) ? event : "Invalid Event";
        };

        // Update state with new data
        setData(
          parsedData.Data
            ? {
                CO2: formatData(parsedData.Data.CO2),
                HUMID: formatData(parsedData.Data.HUMID),
                PRESSURE: formatData(parsedData.Data.PRESSURE),
                RA: formatData(parsedData.Data.RA),
                TEMP: formatData(parsedData.Data.TEMP),
                VOC: formatData(parsedData.Data.VOC),
                Event: validateEvent(parsedData.Event),
                HardwareID: parsedData.HardwareID,
                TimeStamp: parsedData.TimeStamp,
              }
            : data
        );
      }
    } catch (err) {
      // Save error that occur in try
      console.error("Error parsing WebSocket message:", err);
    }
  }, [lastMessage]);

  return (
    // Data block
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">
          Real-time data received from the WebSocket server. Below are the live
          updates:
        </p>
      </div>

      {/* Show data on the creat block */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataCard title="CO2" value={data.CO2} />
        <DataCard title="Humidity" value={data.HUMID} />
        <DataCard title="Pressure" value={data.PRESSURE} />
        <DataCard title="Radiation (RA)" value={data.RA} />
        <DataCard title="Temperature" value={data.TEMP} />
        <DataCard title="VOC" value={data.VOC} />
        <DataCard title="Event" value={data.Event} />
        <DataCard title="Hardware ID" value={data.HardwareID} />
        <DataCard title="Timestamp" value={data.TimeStamp} />
      </div>
    </div>
  );
};

// Reusable DataCard component for displaying key-value pairs
const DataCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-700 mt-2">{value}</p>
    </div>
  );
};

export default WebSocket;
