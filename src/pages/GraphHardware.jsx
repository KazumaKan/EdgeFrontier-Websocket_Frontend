import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
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

const GraphHardware = () => {
  const { lastMessage } = useWebSocket("wss://server-test-v1-0.onrender.com", {
    shouldReconnect: () => true,
  });

  const [dataHistory, setDataHistory] = useState([]);

  useEffect(() => {
    try {
      if (lastMessage?.data) {
        const parsedData = JSON.parse(lastMessage.data);

        if (parsedData.Data) {
          const newRecord = {
            CO2: parsedData.Data.CO2,
            HUMID: parsedData.Data.HUMID,
            PRESSURE: parsedData.Data.PRESSURE,
            RA: parsedData.Data.RA,
            TEMP: parsedData.Data.TEMP,
            VOC: parsedData.Data.VOC,
            TimeStamp: parsedData.TimeStamp,
          };

          // Update the state with a max of 100 records
          setDataHistory((prev) => {
            const updatedHistory = [...prev, newRecord];
            return updatedHistory.length > 100
              ? updatedHistory.slice(-100)
              : updatedHistory;
          });
        }
      }
    } catch (err) {
      console.error("Error parsing WebSocket message:", err);
    }
  }, [lastMessage]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Live Data Chart</h1>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dataHistory}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="TimeStamp"
            tickFormatter={(tick) => tick.split(" ")[1]}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="CO2"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="HUMID" stroke="#82ca9d" />
          <Line type="monotone" dataKey="PRESSURE" stroke="#ffc658" />
          <Line type="monotone" dataKey="RA" stroke="#ff7300" />
          <Line type="monotone" dataKey="TEMP" stroke="#387908" />
          <Line type="monotone" dataKey="VOC" stroke="#ff6384" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GraphHardware;
