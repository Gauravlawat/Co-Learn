# 🚀 CO-LEARN: A Geo-Social Skill-Sharing Platform

CO-LEARN is a community-focused, geo-social web application built with the MERN stack. It's designed to connect local users for in-person skill sharing, featuring a live, interactive map for event discovery and real-time updates to foster immediate community engagement.

---

## ✨ Key Features

-   **Live Interactive Map**: Discover local skill-sharing sessions and events happening near you in real-time.
-   **Real-time Session Broadcasting**: New sessions are instantly broadcast to all connected users using a Socket.IO WebSocket layer.
-   **User Authentication**: Secure user registration, login, and **logout** functionality.
-   **Personalized Dashboard**: A user-specific dashboard to manage created sessions and joined events.
-   **Session Management**: Users can create, view details of, and join skill-sharing sessions.
-   **Community Profiles**: Users can list skills they want to teach and skills they want to learn.

---

## 📊 Workflow & Architecture Diagrams

This section illustrates the project's workflow from both a user's perspective and a technical perspective. *GitHub will automatically render these text blocks into diagrams.*

### User Journey Workflow

This diagram shows the typical path a user takes, now including the dashboard and logout options.

```mermaid
graph TD;
    A[User Visits Website] --> B{Has an Account?};
    B -- No --> C[Registers for a New Account];
    C --> D[Logs In];
    B -- Yes --> D;
    D --> E{What to do?};
    E -- Find a Session --> F[Views Interactive Map];
    E -- Manage My Activity --> G[Goes to Dashboard];
    E -- End Session --> H[Logs Out];
    F --> I[Joins a Session];
    I --> J[Attends In-Person];
