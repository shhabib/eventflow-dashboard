# EventFlow Data Architecture

This document defines the data schemas, state management plan, and data transformation logic for the EventFlow application.

## 1. Data Schemas

### Session Schema

A `Session` object represents a single event talk or workshop. Its structure is:

```json
{
  "id": 1,
  "title": "Introduction to React Hooks",
  "speaker": "Jane Doe",
  "description": "A deep dive into the power and flexibility of React Hooks, covering useState, useEffect, and custom hooks.",
  "startTime": "2023-10-26T09:00:00Z",
  "endTime": "2023-10-26T10:00:00Z",
  "attendees": [
    {
      "id": 101,
      "name": "Alice Johnson",
      "checkInTime": "2023-10-26T08:55:00Z"
    },
    {
      "id": 102,
      "name": "Bob Williams",
      "checkInTime": "2023-10-26T08:58:00Z"
    }
  ]
}
```

### Attendee Schema

An `Attendee` object represents a single person checked into a session:

```json
{
  "id": 101,
  "name": "Alice Johnson",
  "checkInTime": "2023-10-26T08:55:00Z"
}
```

> **Design Note:** Including the `speaker` name directly on the `Session` object is a form of "denormalization." The trade-off is between data consistency and performance.
>
> - **Benefit (Performance):** We don't need to perform a separate lookup or "join" to find the speaker's name when displaying a session. This makes rendering session lists faster and simpler.
> - **Trade-off (Consistency):** If a speaker changes their name, we would need to update it in every session object they are associated with, rather than in just one central "speakers" table. For this application's scope, the performance benefit outweighs the consistency risk.

## 2. State Management Plan

The application follows a centralized state management pattern. The "single source of truth" for all core application data resides in the state of the top-level `App` component, as specified in `COMPONENTS.md`. This ensures a predictable, unidirectional data flow.

The main state object structure within `App` will be:

```javascript
// Main App component state
{
  sessions: [], // Complete array of Session objects from the data source.
  view: 'Dashboard', // String: 'Dashboard' or 'SessionList'.
  filters: {
    speaker: "all", // String: speaker name or "all".
    date: "", // String: ISO date or empty string.
    searchTerm: "" // String: text to search in title/description.
  }
}
```

### Example State Implementation

```javascript
// In the App component
const [sessions, setSessions] = useState(mockData);
const [view, setView] = useState("Dashboard");
const [filters, setFilters] = useState({
  speaker: "all",
  date: "",
  searchTerm: "",
});
```

> **Design Note:** Keeping `view` as a piece of state in `App` gives it complete control over the top-level UI. The `App` component can act as a router, deciding whether to render the `Dashboard` or the `SessionList` based on this single state variable. This simplifies logic, as child components like `Header` only need to notify `App` of a desired change, and `App` handles the rendering logic centrally.

## 3. Data Transformations

This section outlines how the raw `sessions` data is processed and calculated to derive the specific props required by the analytics components, as defined in `COMPONENTS.md`.

### Attendance Tracking Flow

The fundamental unit for most analytics is the number of attendees per session. This is calculated directly from the `Session` schema.

- **Calculation:** For any given `session` object, the total number of attendees is `session.attendees.length`.
- **Usage:** This simple calculation is the building block for all other attendance-based metrics, such as total event attendance and session popularity charts.

### Analytics Calculations

Based on the component props defined in `COMPONENTS.md`, the following calculations are needed before rendering the `Dashboard`.

- **Total Attendance (for `MetricsDisplay`):**

  - **Input:** Array of `Session` objects.
  - **Logic:** Sum the `attendees.length` for every session in the array.
  - **Output:** A single number (e.g., `1540`).
  - **Prop:** `totalAttendees` for `MetricsDisplay`.

- **Average Attendance (for `MetricsDisplay`):**

  - **Input:** Array of `Session` objects.
  - **Logic:** Calculate the **Total Attendance** and divide it by the number of sessions (`sessions.length`). Handle the case where the number of sessions is zero to avoid a division-by-zero error.
  - **Output:** A single number (e.g., `128.3`).
  - **Prop:** `averageAttendance` for `MetricsDisplay`.

- **Session Popularity Chart Data (for `AttendanceChart`):**
  - **Input:** Array of `Session` objects.
  - **Logic:** Map over the array of sessions to transform it into the structure required by the charting library.
  - **Output:** An array of objects, e.g., `[{ name: 'Intro to React', attendees: 150 }, { name: 'Advanced State', attendees: 110 }]`.
  - **Prop:** `chartData` for `AttendanceChart`.

### Speaker Performance Analysis

**Highest Average Attendance Speaker:**

1.  Start with the array of all `Session` objects.
2.  Group sessions by `speaker` name, creating a map or object where keys are speaker names and values are arrays of their sessions.
3.  For each speaker, calculate their total attendance and divide by their number of sessions to find their average.
4.  Iterate through the calculated averages to find the speaker with the highest value.
5.  Return the speaker's name and their average attendance.

> **Design Note:** These calculations can be performed in the `App` component and the results passed down, or in the `Dashboard` component itself. Performing them in `Dashboard` keeps the logic closer to where it's used. However, if the `sessions` array is very large, these calculations could become a performance bottleneck on every re-render. We will address this with optimization techniques like memoization in a later phase.

## 4. Integration Verification

This data architecture supports the following connections between the planning documents:

### PLAN.md Integration

- **Core Features:** The `Session` and `Attendee` schemas directly support the "Session & Attendee Tracking" feature. The "State Management Plan" and "Data Transformations" sections provide the foundation for "Real-time Analytics," "Interactive Data Visualizations," and "Dynamic Filtering."
- **Component Hierarchy:** The centralized state plan in `App` aligns perfectly with the hierarchy defined in `PLAN.md`, where `App` is the root that passes data down.
- **Data Flow:** The state plan and transformation logic directly enable the unidirectional data flow described in `PLAN.md`.

### COMPONENTS.md Integration

- **`App` Component:** The "State Management Plan" in this document is a direct implementation of the state requirements (`sessions`, `view`, `filters`) specified for the `App` component.
- **`Dashboard` & Children:** The "Data Transformations" section explicitly defines how to calculate the props (`totalAttendees`, `averageAttendance`, `chartData`) required by `MetricsDisplay` and `AttendanceChart`.
- **`SessionList` & Children:** The `filters` object in the state plan provides the necessary structure to manage the state for `FilterControls` and to pass filtered `sessions` data to `SessionList` and its `SessionItem` children.
