import { useState, useMemo, useEffect } from "react";
import "./App.css";
import { eventData } from "./mockData.js"; // Correctly using a named import
import SessionList from "./components/SessionList";
import Dashboard from "./components/Dashboard";

function App() {
  console.log('%cApp Component Rendered', 'color: green; font-weight: bold;');
  // State initialization based on DATA_FLOW.md
  const [sessions, setSessions] = useState(eventData.sessions); // Correctly initializing with the sessions array
  const [view, setView] = useState("list"); // 'list' or 'dashboard'
  const [filters, setFilters] = useState({
    searchTerm: "",
    speaker: "all",
    date: "",
  });
  const [announcement, setAnnouncement] = useState('');

  // PERFORMANCE BASELINE: View switching triggers filtering
  // Current behavior: filteredSessions recalculates on every render
  // Impact: ~100 sessions filtered unnecessarily on view change

  /**
   * PERFORMANCE AUDIT FINDING:
   * This filtering logic is re-calculated on every single render of the App component.
   * This is inefficient because it runs even when the `sessions` or `filters` state
   * have not changed, for example, when only the `view` state changes.
   *
   * GOAL FOR NEXT LAB:
   * Refactor this to use a memoization hook (useMemo) so it only re-calculates
   * when `sessions` or `filters` actually change.
   */

  // useMemo will only recalculate when `sessions` or `filters` change.
  const filteredSessions = useMemo(() => {
    console.log('Filtering sessions...');

    // Start timing
    const filterStartTime = performance.now();

    const result = sessions.filter((session) => {
      const searchTermMatch = session.title
        .toLowerCase()
        .includes(filters.searchTerm.toLowerCase());

      const speakerMatch =
        filters.speaker === "all" || session.speaker === filters.speaker;

      return searchTermMatch && speakerMatch;
    });

    // End timing
    const filterEndTime = performance.now();
    console.log(`-> Session filtering took: ${(filterEndTime - filterStartTime).toFixed(2)} ms`);

    return result;
  }, [sessions, filters]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleUpdateAttendance = (sessionId, newCount) => {
    setSessions((prevSessions) =>
      prevSessions.map((session) => {
        if (session.id === sessionId) {
          // Create a new attendees array with the specified count
          const newAttendees = Array.from({ length: newCount }, (_, index) => ({
            id: session.attendees[index]?.id || `temp-${index}`,
            name: session.attendees[index]?.name || `Attendee ${index + 1}`,
            checkInTime:
              session.attendees[index]?.checkInTime || new Date().toISOString(),
          }));
          // Return a new session object with the updated attendees
          return { ...session, attendees: newAttendees };
        }
        return session;
      })
    );
  };

  // Handler for view change
  const handleViewChange = (newView) => {
    setView(newView);
  };

  // useMemo will only recalculate when `sessions` changes.
  const speakers = useMemo(
    () => [...new Set(sessions.map((session) => session.speaker))],
    [sessions]
  );
  
  // Announce changes for screen readers
  useEffect(() => {
    if (filteredSessions.length > 0) {
      setAnnouncement(`Found ${filteredSessions.length} sessions.`);
    } else {
      setAnnouncement('No sessions found for the current filters.');
    }
  }, [filteredSessions]); // Dependency array is crucial

  return (
    <div className="App">
      {/* ARIA Live Region for screen reader announcements */}
      <div className="visually-hidden" aria-live="polite" aria-atomic="true">
        {announcement}
      </div>
      <header className="app-header">
        <h1>EventFlow Analytics</h1>
        <nav className="view-toggle" aria-label="Main navigation">
          <button
            onClick={() => handleViewChange('list')}
            className={view === 'list' ? 'active' : ''}
            aria-current={view === 'list' ? 'page' : undefined}
          >
            List View
          </button>
          <button
            onClick={() => handleViewChange('dashboard')}
            className={view === 'dashboard' ? 'active' : ''}
            aria-current={view === 'dashboard' ? 'page' : undefined}
          >
            Dashboard View
          </button>
        </nav>
      </header>

      <main>
        <section aria-labelledby="filter-heading">
          <h2 id="filter-heading" className="visually-hidden">Filter Controls</h2>
          <form className="filter-controls" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="search-input">Search by title:</label>
              <input
                type="text"
                id="search-input"
                name="searchTerm"
                value={filters.searchTerm}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <label htmlFor="speaker-select">Filter by speaker:</label>
              <select
                id="speaker-select"
                name="speaker"
                value={filters.speaker}
                onChange={handleFilterChange}
              >
                <option value="all">All Speakers</option>
                {speakers.map(speaker => (
                  <option key={speaker} value={speaker}>{speaker}</option>
                ))}
              </select>
            </div>
          </form>
        </section>

        {/* Conditional rendering based on the 'view' state */}
        {view === "list" ? (
          <SessionList
            sessions={filteredSessions}
            onUpdateAttendance={handleUpdateAttendance}
          />
        ) : (
          <Dashboard sessions={filteredSessions} />
        )}
      </main>
    </div>
  );
}

export default App;
