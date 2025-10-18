// Module 1, Lesson 3: Data Architecture in Production
// Mock data for EventFlow Analytics Dashboard
export const eventData = {
  name: "TechConf 2025",
  date: "2025-03-15",
  venue: "San Francisco Convention Center",
  sessions: [
    {
      id: 1,
      title: "Introduction to React",
      speaker: "Jane Doe",
      description:
        "A beginner-friendly session covering the fundamentals of React, including components, props, and state.",
      startTime: "2025-03-15T09:00:00Z",
      endTime: "2025-03-15T10:00:00Z",
      attendees: [
        { id: 101, name: "Alice Johnson", checkInTime: "2025-03-15T08:55:00Z" },
        { id: 102, name: "Bob Williams", checkInTime: "2025-03-15T08:58:00Z" },
        { id: 103, name: "Charlie Brown", checkInTime: "2025-03-15T09:01:00Z" },
      ],
    },
    {
      id: 2,
      title: "Advanced State Management in React",
      speaker: "John Smith",
      description:
        "Explore advanced state management techniques using Context API and third-party libraries like Redux.",
      startTime: "2025-03-15T10:30:00Z",
      endTime: "2025-03-15T11:30:00Z",
      attendees: [
        { id: 201, name: "Diana Prince", checkInTime: "2025-03-15T10:25:00Z" },
        { id: 202, name: "Clark Kent", checkInTime: "2025-03-15T10:28:00Z" },
      ],
    },
    {
      id: 3,
      title: "Mastering TypeScript with React",
      speaker: "Jane Doe",
      description:
        "Learn how to build robust and scalable React applications with TypeScript, covering types, interfaces, and generics.",
      startTime: "2025-03-15T13:00:00Z",
      endTime: "2025-03-15T14:30:00Z",
      attendees: [
        { id: 101, name: "Alice Johnson", checkInTime: "2025-03-15T12:55:00Z" },
        { id: 202, name: "Clark Kent", checkInTime: "2025-03-15T12:58:00Z" },
        { id: 301, name: "Bruce Wayne", checkInTime: "2025-03-15T13:00:00Z" },
        { id: 302, name: "Peter Parker", checkInTime: "2025-03-15T13:02:00Z" },
        { id: 303, name: "Tony Stark", checkInTime: "2025-03-15T13:05:00Z" },
      ],
    },
    {
      id: 4,
      title: "The Future of Web Development",
      speaker: "Emily White",
      description:
        "A keynote session on emerging trends, WebAssembly, server components, and the future of the web platform.",
      startTime: "2025-03-16T09:00:00Z",
      endTime: "2025-03-16T10:00:00Z",
      attendees: [
        { id: 101, name: "Alice Johnson", checkInTime: "2025-03-16T08:50:00Z" },
        { id: 102, name: "Bob Williams", checkInTime: "2025-03-16T08:52:00Z" },
        { id: 103, name: "Charlie Brown", checkInTime: "2025-03-16T08:55:00Z" },
        { id: 201, name: "Diana Prince", checkInTime: "2025-03-16T08:58:00Z" },
        { id: 202, name: "Clark Kent", checkInTime: "2025-03-16T08:59:00Z" },
        { id: 301, name: "Bruce Wayne", checkInTime: "2025-03-16T09:00:00Z" },
      ],
    },
    {
      id: 5,
      title: "GraphQL for Modern Applications",
      speaker: "John Smith",
      description:
        "A practical guide to building and consuming GraphQL APIs, comparing it with traditional REST APIs.",
      startTime: "2025-03-16T11:00:00Z",
      endTime: "2025-03-16T12:00:00Z",
      attendees: [
        { id: 102, name: "Bob Williams", checkInTime: "2025-03-16T10:55:00Z" },
        { id: 302, name: "Peter Parker", checkInTime: "2025-03-16T10:58:00Z" },
        { id: 303, name: "Tony Stark", checkInTime: "2025-03-16T11:01:00Z" },
      ],
    },
  ],
};