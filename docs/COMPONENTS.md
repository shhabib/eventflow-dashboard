# EventFlow Component Specifications

This document defines the responsibility and props (the "contract") for each
component in the EventFlow application.

---

### `App`

- **Purpose**: The root component that orchestrates the entire application. It fetches data, manages application-level state, and renders the main layout.
- **Props:** None.
- **State**:
  - `sessions`: An array of all session objects fetched from the data source.
  - `view`: A string (`'Dashboard'` or `'SessionList'`) to control which main view is displayed.
  - `filters`: An object containing the current filter criteria (e.g., `{ speaker: 'Jane Doe' }`).
- **UI/Behavior**:
  - Renders the `Header` component.
  - Wraps the main content area with an `ErrorBoundary`.
  - Conditionally renders either the `Dashboard` or `SessionList` component based on the `view` state.
  - Manages data fetching for the session list.
  - Provides callback functions to child components to update state (e.g., changing the view).

---

### `Header`

- **Purpose**: Displays the application title and provides controls to switch between the 'Dashboard' and 'SessionList' views.
- **Props**:
  - `currentView`: The currently active view (`'Dashboard'` or `'SessionList'`).
  - `onViewChange`: A callback function to be called when the user clicks a view toggle button.
- **State**: None.
- **UI/Behavior**:
  - Displays the application title, "EventFlow Analytics".
  - Renders two buttons: "Dashboard" and "Sessions".
  - The button corresponding to the `currentView` prop will have an active state/style.
  - Calls `onViewChange` with the new view name when a button is clicked.

---

### `ErrorBoundary`

- **Purpose**: A standard React Error Boundary that catches JavaScript errors in its child component tree, logs them, and displays a fallback UI instead of a crashed component tree.
- **Props**:
  - `children`: The React nodes to render within the boundary.
- **State**:
  - `hasError`: A boolean that becomes `true` if an error is caught.
- **UI/Behavior**:
  - If `hasError` is `false`, it renders its `children` as normal.
  - If `hasError` is `true`, it renders a user-friendly fallback UI message, such as "Something went wrong. Please try refreshing the page."

---

### `Dashboard`

- **Purpose**: Displays a high-level overview of event analytics, including key metrics and data visualizations.
- **Props**:
  - `sessions`: The complete array of session data.
- **State**: None.
- **UI/Behavior**:
  - Renders the `MetricsDisplay` and `AttendanceChart` components.
  - Calculates and passes the necessary aggregated data as props to its children.

---

### `MetricsDisplay`

- **Purpose**: Shows key numerical metrics derived from the session data.
- **Props**:
  - `totalAttendees`: The total number of attendees across all sessions.
  - `averageAttendance`: The average number of attendees per session.
- **State**: None.
- **UI/Behavior**:
  - Displays distinct visual cards or sections for each metric.
  - Formats the numbers for readability.

---

### `AttendanceChart`

- **Purpose**: Visualizes session attendance data using a chart.
- **Props**:
  - `chartData`: An array of data points formatted for the charting library (e.g., `[{ name: 'Session A', attendees: 150 }, ...]`).
- **State**: None.
- **UI/Behavior**:
  - Renders a bar chart where each bar represents a session and its height corresponds to the number of attendees.
  - Includes labels for axes and tooltips for chart elements to provide more detail on hover.

---

### `SessionList`

- **Purpose**: Displays a filterable and detailed list of all event sessions.
- **Props**:
  - `sessions`: The array of session data to be displayed.
  - `filters`: The current filter object from the `App` state.
  - `onFilterChange`: A callback function to be passed down to `FilterControls`.
- **State**: None.
- **UI/Behavior**:
  - Renders `FilterControls` to allow users to refine the list.
  - Passes `filters` and `onFilterChange` props to `FilterControls`.
  - Maps over the `sessions` prop (which should be pre-filtered by `App`) and renders a `SessionItem` for each session.

---

### `FilterControls`

- **Purpose**: Provides UI controls (like dropdowns and text inputs) for filtering the session list.
- **Props**:
  - `filters`: The current filter object, used to make this a controlled component.
  - `onFilterChange`: A callback function that is called when any filter value changes.
- **State**: None (it is a controlled component).
- **UI/Behavior**:
  - Renders dropdowns for speakers and/or text inputs for session titles.
  - The values of the input controls are set by the `filters` prop.
  - When a user interacts with a control, it calls the `onFilterChange` prop with the new filter state.

---

### `SessionItem`

- **Purpose**: Displays the detailed information for a single session in the `SessionList`.
- **Props**:
  - `session`: An object containing the details of one session (e.g., `{ title: 'React Hooks', speaker: 'John Doe', attendees: 120 }`).
- **State**: None.
- **UI/Behavior**:
  - Renders the session's title, speaker name, and the number of attendees in a clear and organized layout.
