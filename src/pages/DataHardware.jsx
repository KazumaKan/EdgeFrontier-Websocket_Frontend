import { useEffect, useState } from "react";
import socket from "./DataHost"; // Import the socket from DataHost.js

const DataHardware = () => {
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

  useEffect(() => {
    // ฟังข้อความที่เข้ามาจาก WebSocket
    socket.onmessage = (event) => {
      try {
        if (event.data) {
          const parsedData = JSON.parse(event.data); // แปลงข้อมูลจากข้อความ JSON
          console.log(parsedData); // พิมพ์ข้อมูลที่ได้รับ

          // ฟังก์ชันจัดการการ format ข้อมูล
          const formatData = (value) => {
            // ตรวจสอบว่า value เป็นตัวเลขหรือไม่
            if (typeof value === "number" && !isNaN(value)) {
              return value.toFixed(2); // แสดงเป็นทศนิยม 2 ตำแหน่ง
            }
            return value; // หากไม่ใช่ตัวเลขให้ส่งค่าตามเดิม
          };

          // ฟังก์ชัน validate ข้อมูล Event
          const validateEvent = (event) => {
            return /^[a-zA-Z]*$/.test(event) ? event : "Invalid Event";
          };

          // อัปเดต state เมื่อได้รับข้อมูล
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
        console.error("Error parsing WebSocket message:", err);
      }
    };

    // ทำการ clean up เมื่อ component ถูก unmount
    return () => {
      socket.onmessage = null; // เคลียร์ listener
    };
  }, [data]); // ใช้ useEffect เพื่ออัปเดตข้อมูลทุกครั้งที่มีการเปลี่ยนแปลง

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <h1 className="text-2xl font-bold mb-4">WebSocket Data Stream</h1>
        <p className="text-gray-600">
          Real-time data received from the WebSocket server. Below are the live
          updates:
        </p>
      </div>

      {/* แสดงข้อมูล */}
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

export default DataHardware;
