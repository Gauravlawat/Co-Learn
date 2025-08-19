# 🚀 CO-LEARN: A Geo-Social Skill-Sharing Platform

CO-LEARN is a community-focused, geo-social web application built with the MERN stack. [cite_start]It's designed to connect local users for in-person skill sharing, featuring a live, interactive map for event discovery and real-time updates to foster immediate community engagement. [cite: 1977, 1978]

---

## ✨ Key Features

* [cite_start]**Live Interactive Map**: Discover local skill-sharing sessions and events happening near you in real-time. [cite: 1977]
* [cite_start]**Real-time Session Broadcasting**: New sessions are instantly broadcast to all connected users using a Socket.IO WebSocket layer. 
* **User Authentication**: Secure user registration and login functionality.
* **Session Management**: Users can create, view details of, and join skill-sharing sessions.
* **Community Profiles**: Users can list skills they want to teach and skills they want to learn.

---

## 📊 Workflow & Architecture Diagrams

This section illustrates the project's workflow from both a user's perspective and a technical perspective. *GitHub will automatically render these text blocks into diagrams.*

### User Journey Workflow

This diagram shows the typical path a user takes when interacting with the CO-LEARN application.

```mermaid
graph TD;
    A[User Visits Website] --> B{Has an Account?};
    B -- No --> C[Registers for a New Account];
    C --> D[Logs In];
    B -- Yes --> D;
    D --> E[Views Interactive Map of Local Sessions];
    E --> F[Finds & Clicks on an Interesting Session];
    F --> G[Joins the Session];
    G --> H[Attends the Session In-Person];
