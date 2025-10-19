import React, { useEffect } from "react";
import MetricsDisplay from "./MetricsDisplay";
import AttendanceChart from "./AttendanceChart";
import "./Dashboard.css";

const Dashboard = ({ sessions }) => {
  useEffect(() => {
    console.log('Dashboard component has mounted');
  
    // Store the interval ID so we can clear it later
    const intervalId = setInterval(() => {
      console.log('Dashboard is active...');
    }, 3000);
  
    // Return a cleanup function that React will call on unmount
    return () => {
      clearInterval(intervalId);
      console.log("Cleaning up the dashboard interval.");
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  console.log('%cDashboard Component Rendered', 'color: blue; font-weight: bold;');

  console.log('Calculating dashboard analytics...');
  const analyticsStartTime = performance.now();

  // Analytics calculations
  const totalAttendance = sessions.reduce(
    (sum, session) => sum + session.attendees.length,
    0
  );
  const totalSessions = sessions.length;
  const averageAttendance =
    totalSessions > 0 ? Math.round(totalAttendance / totalSessions) : 0;

  // Data transformation for the chart
  const chartData = sessions.map(session => ({
    name: session.title.length > 15 ? 
    session.title.substring(0, 15) + '...' : session.title,
    attendance: session.attendees.length,
  }));

  const analyticsEndTime = performance.now();
  console.log(
    `-> Dashboard analytics calculation took: ${(analyticsEndTime - analyticsStartTime).toFixed(2)} ms`
  );

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard</h2>
      <MetricsDisplay
        totalSessions={totalSessions}
        totalAttendance={totalAttendance}
        averageAttendance={averageAttendance}
      />
      <AttendanceChart data={chartData} />
    </div>
  );
};

export default Dashboard;