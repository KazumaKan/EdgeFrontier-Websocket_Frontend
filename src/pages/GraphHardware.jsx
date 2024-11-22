import { useEffect, useState } from "react";
import socket from "./DataHost"; // นำเข้า WebSocket instance จาก DataServer.js
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

  const [chartData, setChartData] = useState([
    {
      name: "Data 1",
      CO2: 0,
      HUMID: 0,
      PRESSURE: 0,
      TEMP: 0,
      VOC: 0,
      time: new Date().toLocaleTimeString(),
    },
  ]);

  useEffect(() => {
    // ฟังข้อความที่เข้ามาจาก WebSocket
    socket.onmessage = (event) => {
      try {
        if (event.data) {
          const parsedData = JSON.parse(event.data); // แปลงข้อมูลจากข้อความ JSON
          console.log(parsedData); // พิมพ์ข้อมูลที่ได้รับ

          // ฟังก์ชันจัดการข้อมูล
          const formatData = (value) => {
            return typeof value === "number" ? value.toFixed(2) : value;
          };

          const validateEvent = (event) => {
            return /^[a-zA-Z]*$/.test(event) ? event : "Invalid Event";
          };

          // อัปเดตข้อมูล
          setData({
            CO2: formatData(parsedData.Data.CO2),
            HUMID: formatData(parsedData.Data.HUMID),
            PRESSURE: formatData(parsedData.Data.PRESSURE),
            RA: formatData(parsedData.Data.RA),
            TEMP: formatData(parsedData.Data.TEMP),
            VOC: formatData(parsedData.Data.VOC),
            Event: validateEvent(parsedData.Event),
            HardwareID: parsedData.HardwareID,
            TimeStamp: parsedData.TimeStamp,
          });

          // อัปเดตข้อมูลกราฟ โดยไม่รีเฟรชข้อมูลเดิม
          setChartData((prevState) => [
            ...prevState,
            {
              name: `Data ${prevState.length + 1}`,
              CO2: parsedData.Data.CO2,
              HUMID: parsedData.Data.HUMID,
              PRESSURE: parsedData.Data.PRESSURE,
              TEMP: parsedData.Data.TEMP,
              VOC: parsedData.Data.VOC,
              time: new Date().toLocaleTimeString(), // เพิ่มเวลาใหม่
            },
          ]);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    // ทำการ clean up เมื่อ component ถูก unmount
    return () => {
      socket.onmessage = null; // เคลียร์ listener
    };
  }, []); // ใช้ useEffect เพื่อเริ่มต้นฟังก์ชันการรับข้อมูล

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">
          Real-time data received from the WebSocket server. Below are the live
          updates:
        </p>
      </div>

      {/* แสดงกราฟ */}
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

export default GraphHardware;
