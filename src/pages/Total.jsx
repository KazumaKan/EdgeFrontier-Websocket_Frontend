import useWebSocketData from "./DataHost"; // Import the custom hook from DataHost
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

const Total = () => {
  // Use the custom hook to get data and chartData
  const { data, chartData } = useWebSocketData();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">
          Real-time data received from the WebSocket server. Below are the live
          updates:
        </p>
      </div>

      {/* Display Data Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <DataCard title="CO2" value={data.CO2} />
        <DataCard title="Humidity" value={data.HUMID} />
        <DataCard title="Pressure" value={data.PRESSURE} />
        <DataCard title="Temperature" value={data.TEMP} />
        <DataCard title="VOC" value={data.VOC} />
      </div>

      {/* Display Charts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="font-bold text-xl">CO2 Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="CO2" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-bold text-xl">Humidity Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="HUMID" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-bold text-xl">Pressure Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="PRESSURE" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-bold text-xl">Temperature Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="TEMP" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="font-bold text-xl">VOC Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="0 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="VOC" stroke="#ff0000" />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

export default Total;
