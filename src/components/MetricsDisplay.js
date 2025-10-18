import React from "react";
import "./MetricsDisplay.css";

const MetricsDisplay = ({ totalSessions, totalAttendance, averageAttendance }) => {
  return (
    <div className="metrics-container">
      <div className="metric-card">
        <h4>Total Sessions</h4>
        <p>{totalSessions}</p>
      </div>
      <div className="metric-card">
        <h4>Total Attendance</h4>
        <p>{totalAttendance}</p>
      </div>
      <div className="metric-card">
        <h4>Average Attendance</h4>
        <p>{averageAttendance}</p>
      </div>
    </div>
  );
};

export default MetricsDisplay;