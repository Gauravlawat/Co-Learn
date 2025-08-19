# 🚀 CO-LEARN

[cite_start]CO-LEARN is a community-focused, geo-social web application designed to connect local users for in-person skill sharing. [cite: 262] [cite_start]It features a live, interactive map for discovering sessions and real-time WebSocket integration to foster immediate community engagement. [cite: 262, 263]

---

## ✨ Features

-   [cite_start]**Live Interactive Map**: Discover local skill-sharing sessions and events happening near you in real-time. [cite: 262]
-   [cite_start]**Real-time Session Broadcasting**: New sessions are instantly broadcast to all connected users using a Socket.IO WebSocket layer. [cite: 263]
-   **User Authentication**: Secure user registration and login functionality.
-   **Session Management**: Users can create, view details of, and join skill-sharing sessions.
-   **Community Profiles**: Users can list skills they want to teach and skills they want to learn.

---

## 🛠️ Tech Stack

-   [cite_start]**Frontend**: React.js, Redux Toolkit [cite: 239]
-   [cite_start]**Backend**: Node.js, Express.js [cite: 266]
-   [cite_start]**Database**: MongoDB [cite: 266]
-   [cite_start]**Real-time Communication**: Socket.IO [cite: 263]
-   [cite_start]**Version Control**: Git & GitHub [cite: 244]

---

## 📊 Application Flow & Architecture

To understand how the application works, here are two diagrams illustrating the user flow and the system's technical architecture.

### User Flow Diagram

This diagram shows the typical journey a user takes through the CO-LEARN application.

```mermaid
graph TD;
    A[User Lands on Page] --> B{Has Account?};
    B -- No --> C[Registers for a New Account];
    C --> D[Logs In];
    B -- Yes --> D;
    D --> E[Views Interactive Map with Local Sessions];
    E --> F[Clicks on a Session to See Details];
    F --> G[Joins a Session];
    G --> H[Attends In-Person & Learns a New Skill!];
