import { useEffect, useState } from "react";
import { dataStore } from "./DataHost"; // Import the data store

const DataHardware = () => {
  const [data, setData] = useState(dataStore); // Initialize state with dataStore values

  useEffect(() => {
    // Set up an interval to check for changes every 2 seconds
    const interval = setInterval(() => {
      setData({ ...dataStore }); // Update state with the latest data from dataStore
    }, 2000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Function to format timestamp
  const formatTimeStamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Formats the timestamp as a local string (e.g., "11/23/2024, 4:35:50 PM")
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">
          Real-time data received from the WebSocket server. Below are the live
          updates:
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataCard title="CO2" value={data.CO2} />
        <DataCard title="Humidity" value={data.HUMID} />
        <DataCard title="Pressure" value={data.PRESSURE} />
        <DataCard title="Radiation (RA)" value={data.RA} />
        <DataCard title="Temperature" value={data.TEMP} />
        <DataCard title="VOC" value={data.VOC} />
        <DataCard title="Event" value={data.Event} />
        <DataCard title="Hardware ID" value={data.HardwareID} />
        {/* Format the timestamp */}
        <DataCard title="Timestamp" value={formatTimeStamp(data.TimeStamp)} />
      </div>
    </div>
  );
};

const DataCard = ({ title, value }) => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <h2 className="font-bold text-lg">{title}</h2>
      <p className="text-gray-700 mt-2">{value}</p>
    </div>
  );
};

export default DataHardware;
