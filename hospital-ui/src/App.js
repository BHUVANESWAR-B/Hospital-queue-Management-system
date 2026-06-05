import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

const chartData = [
  { time: "8AM", wait: 20 },
  { time: "10AM", wait: 45 },
  { time: "12PM", wait: 80 },
  { time: "2PM", wait: 60 },
  { time: "4PM", wait: 30 },
];

const queueData = [
  { id: "#P001", severity: "Critical", wait: "15 mins", priority: "High" },
  { id: "#P002", severity: "Moderate", wait: "40 mins", priority: "Medium" },
  { id: "#P003", severity: "Low", wait: "80 mins", priority: "Low" },
];

function App() {
  const [severity, setSeverity] = useState(3);
  const [doctors, setDoctors] = useState(5);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const predict = async () => {
    try {
      setLoading(true);

      const res = await axios.post("https://hospital-queue-management-system-ktar.onrender.com/predict", {
        severity,
        doctors,
      });

      setPrediction(res.data.waiting_time);
    } catch (error) {
      alert("⚠ Backend not connected!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-xl">
        <h1 className="text-2xl font-bold text-blue-600">CareFlow AI</h1>

        <div className="mt-6 space-y-3 text-gray-700">
          <Link to="/" className="block hover:text-blue-600 font-semibold">
            📊 Live Queue
          </Link>
          <Link to="/analytics" className="block hover:text-blue-600">
            📈 Analytics
          </Link>
          <Link to="/patient" className="block hover:text-blue-600">
            👥 Patient Flow
          </Link>
          <Link to="/staffing" className="block hover:text-blue-600">
            ⚙ Staffing
          </Link>
        </div>

        <button
          onClick={() =>
            alert("🚨 Emergency Mode Activated!\nAll critical patients prioritized.")
          }
          className="mt-10 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
        >
          🚨 Emergency Mode
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold">
          Smart Hospital Queue Optimization System
        </h1>
        <p className="text-gray-500">
          AI-powered patient flow optimization
        </p>

        {/* TOP SECTION */}
        <div className="grid grid-cols-2 gap-6 mt-6">

          {/* INPUT CARD */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Queue Predictor</h2>

            <label>Severity Level: {severity}</label>
            <input
              type="range"
              min="1"
              max="5"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full"
            />

            <label className="mt-4 block">
              Doctors Available: {doctors}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              value={doctors}
              onChange={(e) => setDoctors(e.target.value)}
              className="w-full"
            />

            <button
              onClick={predict}
              className="mt-5 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              {loading ? "Predicting..." : "Predict Waiting Time"}
            </button>
          </div>

          {/* OUTPUT CARD */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-600">Estimated Patient Wait</h2>

            {prediction ? (
              <h1 className="text-5xl font-bold text-green-600 mt-5">
                {prediction.toFixed(0)} mins
              </h1>
            ) : (
              <p className="mt-5 text-gray-400">
                Click predict to see result
              </p>
            )}

            <div className="mt-4 bg-green-100 text-green-800 p-2 rounded">
              Optimal Efficiency State 🚀
            </div>
          </div>
        </div>

        {/* CHART + INSIGHTS */}
        <div className="grid grid-cols-3 gap-6 mt-6">

          {/* CHART */}
          <div className="col-span-2 bg-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">Waiting Distribution</h2>

            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="wait" fill="#2563eb" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* AI INSIGHTS */}
          <div className="bg-blue-600 text-white p-6 rounded-xl shadow">
            <h2 className="font-semibold mb-4">AI Insights</h2>

            <p>⏱ Peak time: 11AM - 1PM</p>
            <p className="mt-2">
              👨‍⚕ Adding 1 doctor reduces wait by ~20%
            </p>

            <button
              onClick={() => alert("📊 Full Report Feature Coming Soon!")}
              className="mt-5 bg-white text-blue-600 px-4 py-2 rounded"
            >
              View Full Report →
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white p-6 mt-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Optimized Patient Queue</h2>

          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600">
                <th>ID</th>
                <th>Severity</th>
                <th>Wait</th>
                <th>Priority</th>
              </tr>
            </thead>

            <tbody>
              {queueData.map((row, index) => (
                <tr key={index} className="border-t">
                  <td>{row.id}</td>
                  <td>{row.severity}</td>
                  <td>{row.wait}</td>
                  <td className={
                    row.priority === "High"
                      ? "text-red-500"
                      : row.priority === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                  }>
                    {row.priority}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default App;