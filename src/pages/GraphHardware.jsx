import { useEffect, useState } from "react";
import { dataStore } from "./DataHost"; // Import the data store
import Select from "react-select"; // Import react-select
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const GraphHardware = () => {
  const [chartData, setChartData] = useState([
    { time: new Date().toLocaleTimeString(), ...dataStore },
  ]);
  const [selectedVariables, setSelectedVariables] = useState(["CO2", "TEMP"]);

  // Colors for each variable to differentiate the lines
  const lineColors = {
    CO2: "#8884d8",
    HUMID: "#82ca9d",
    PRESSURE: "#ff7300",
    RA: "#ff0000",
    TEMP: "#ffbb00",
    VOC: "#0088cc",
  };

  // Option list for react-select
  const options = [
    { value: "CO2", label: "CO2" },
    { value: "HUMID", label: "Humidity" },
    { value: "PRESSURE", label: "Pressure" },
    { value: "RA", label: "Radiation (RA)" },
    { value: "TEMP", label: "Temperature" },
    { value: "VOC", label: "VOC" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString();
      setChartData((prevData) => {
        const updatedData = [...prevData, { time: newTime, ...dataStore }];
        console.log(updatedData); // Log the updated data
        return updatedData;
      });
    }, 120000); // Update data every 2 minutes

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  const handleSelectChange = (selectedOptions) => {
    setSelectedVariables(selectedOptions.map((option) => option.value));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">Real-time graph updates:</p>
        <Select
          isMulti
          value={options.filter((option) =>
            selectedVariables.includes(option.value)
          )}
          onChange={handleSelectChange}
          options={options}
          className="mt-2"
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedVariables.map((variable) => (
            <Line
              key={variable}
              type="monotone"
              dataKey={variable}
              stroke={lineColors[variable] || "#8884d8"} // Use the corresponding color for each variable
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphHardware;
  