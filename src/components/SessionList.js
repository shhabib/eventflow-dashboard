import React from "react";
import SessionCard from "./SessionCard";
import "./SessionList.css";

function SessionList({ sessions, onUpdateAttendance }) {
  if (!sessions || sessions.length === 0) {
    return <p>No sessions match the current filters.</p>;
  }

  return (
    <div className="session-list">
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          onUpdateAttendance={onUpdateAttendance}
        />
      ))}
    </div>
  );
}

export default SessionList;