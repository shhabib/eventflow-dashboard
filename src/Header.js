import React from "react";

function Header({ currentView, onViewChange }) {
  return (
    <header className="app-header">
      <h1>EventFlow Analytics</h1>
      <nav className="view-toggle">
        <button
          onClick={() => onViewChange("Dashboard")}
          className={currentView === "Dashboard" ? "active" : ""}
        >
          Dashboard
        </button>
        <button
          onClick={() => onViewChange("SessionList")}
          className={currentView === "SessionList" ? "active" : ""}
        >
          Sessions
        </button>
      </nav>
    </header>
  );
}

export default Header;