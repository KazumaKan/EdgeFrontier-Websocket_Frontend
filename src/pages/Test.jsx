import { useEffect, useState } from "react";
import socket from "./DataHost"; // Import the socket from DataHost.js
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Test = () => {
  // State to hold the latest data
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

  // State to accumulate data every 5 minutes
  const [graphData, setGraphData] = useState([]);
  // State for selected metrics
  const [selectedMetrics, setSelectedMetrics] = useState([
    "CO2",
    "HUMID",
    "PRESSURE",
    "RA",
    "TEMP",
    "VOC",
  ]);
  // State for controlling the time interval (5 minutes)
  const [intervalTime, setIntervalTime] = useState(0);

  // Use effect to listen for messages from the WebSocket
  useEffect(() => {
    // Function to handle incoming WebSocket messages
    const handleWebSocketMessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data); // Parse the WebSocket data
        const formatData = (value) =>
          typeof value === "number" ? value.toFixed(2) : value;

        // Update the state with the latest data
        setData({
          CO2: formatData(parsedData.Data.CO2),
          HUMID: formatData(parsedData.Data.HUMID),
          PRESSURE: formatData(parsedData.Data.PRESSURE),
          RA: formatData(parsedData.Data.RA),
          TEMP: formatData(parsedData.Data.TEMP),
          VOC: formatData(parsedData.Data.VOC),
          Event: parsedData.Event,
          HardwareID: parsedData.HardwareID,
          TimeStamp: parsedData.TimeStamp,
        });

        const newTimestamp = parsedData.TimeStamp;

        // Increment the interval time
        setIntervalTime((prev) => prev + 1);

        if (intervalTime >= 5) {
          // Add data to the graph every 5 minutes
          setGraphData((prevData) => [
            ...prevData,
            {
              name: `Data ${prevData.length + 1}`,
              CO2: parsedData.Data.CO2,
              HUMID: parsedData.Data.HUMID,
              PRESSURE: parsedData.Data.PRESSURE,
              TEMP: parsedData.Data.TEMP,
              VOC: parsedData.Data.VOC,
              RA: parsedData.Data.RA,
              time: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }), // Format time to show only hour and minute
            },
          ]);
          setIntervalTime(0); // Reset counter after sending data to graph
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    // Listen to WebSocket messages
    socket.addEventListener("message", handleWebSocketMessage);

    // Clean up listener when component unmounts
    return () => {
      socket.removeEventListener("message", handleWebSocketMessage);
    };
  }, [intervalTime]); // Add intervalTime as dependency

  // Filter graph data based on selected metrics
  const filteredGraphData = graphData.map((item) => {
    let filteredItem = { time: item.time };
    selectedMetrics.forEach((metric) => {
      filteredItem[metric] = item[metric];
    });
    return filteredItem;
  });

  // Handle metric selection for graph
  const handleMetricChange = (metric) => {
    setSelectedMetrics((prevState) =>
      prevState.includes(metric)
        ? prevState.filter((item) => item !== metric)
        : [...prevState, metric]
    );
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

      {/* Add checkboxes to select which metrics to show in the graph */}
      <div className="mb-4">
        {["CO2", "HUMID", "PRESSURE", "RA", "TEMP", "VOC"].map((metric) => (
          <label key={metric} className="mr-4">
            <input
              type="checkbox"
              checked={selectedMetrics.includes(metric)}
              onChange={() => handleMetricChange(metric)}
            />
            {metric}
          </label>
        ))}
      </div>

      {/* Display the chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={filteredGraphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetrics.includes("CO2") && (
            <Line type="monotone" dataKey="CO2" stroke="#8884d8" />
          )}
          {selectedMetrics.includes("HUMID") && (
            <Line type="monotone" dataKey="HUMID" stroke="#82ca9d" />
          )}
          {selectedMetrics.includes("PRESSURE") && (
            <Line type="monotone" dataKey="PRESSURE" stroke="#ff7300" />
          )}
          {selectedMetrics.includes("RA") && (
            <Line type="monotone" dataKey="RA" stroke="#ff0000" />
          )}
          {selectedMetrics.includes("TEMP") && (
            <Line type="monotone" dataKey="TEMP" stroke="#387908" />
          )}
          {selectedMetrics.includes("VOC") && (
            <Line type="monotone" dataKey="VOC" stroke="#0033cc" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Test;
