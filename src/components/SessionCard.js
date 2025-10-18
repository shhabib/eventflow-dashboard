import React from "react";
import "./SessionCard.css";

const SessionCard = ({ session, onUpdateAttendance }) => {
  const handleAttendanceChange = (e) => {
    const newCount = parseInt(e.target.value, 10);
    // Ensure newCount is a non-negative number before updating.
    if (!isNaN(newCount) && newCount >= 0) {
      onUpdateAttendance(session.id, newCount);
    }
  };

  return (
    <div className="session-card">
      <h3>{session.title}</h3>
      <p>
        <strong>Speaker:</strong> {session.speaker}
      </p>
      <p>
        <strong>Time:</strong> {session.time} | <strong>Room:</strong>{" "}
        {session.room}
      </p>
      <div className="attendance-control">
        <label htmlFor={`attendance-${session.id}`}>Attendees:</label>
        <input
          type="number"
          id={`attendance-${session.id}`}
          value={session.attendees.length}
          onChange={handleAttendanceChange}
          min="0"
        />
      </div>
    </div>
  );
};

export default SessionCard;