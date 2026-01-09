import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard");
        console.log("Dashboard data:", res.data); // debug log
        setData(res.data);
      } catch (error) {
        console.error("Error loading dashboard data", error);
      }
    };
    fetchDashboardData();
  }, []);

  if (!data) return <div>Loading dashboard...</div>;
  if (!data.postsByRoom?.length)
    return <div>No dashboard data available yet. Try creating some posts!</div>;

  const COLORS = ["#007bff", "#00c49f", "#ff8042", "#ff4c4c", "#8884d8"];

  return (
    <><Navbar />
    <div className="dashboard-container">
      <h1>📊 Project Dashboard</h1>
      <div className="stats-grid">
        <div className="card blue">
          <h3>Total Posts</h3>
          <p>{data.totalPosts}</p>
        </div>
        <div className="card green">
          <h3>Total Likes</h3>
          <p>{data.totalLikes}</p>
        </div>
        <div className="card red">
          <h3>Total Comments</h3>
          <p>{data.totalComments}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Most Active Rooms</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.postsByRoom}>
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
    </>
  );
}
