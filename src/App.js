import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Chatpage from "./Chatpage";
import Historypage from "./Historypage";

function Layout({ conversations, setConversations }) {
  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <Link to="/" className="sidebar-link new-chat-link">
          <span className="sidebar-icon">AI</span>
          New Chat
        </Link>
        <Link to="/history" className="sidebar-link past-conv-link">
          Past Conversations
        </Link>
      </aside>

      <div className="main-content">
        <header className="top-bar">
          <h1>Bot AI</h1>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <Chatpage
                conversations={conversations}
                setConversations={setConversations}
              />
            }
          />
          <Route
            path="/history"
            element={<Historypage conversations={conversations} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  const [conversations, setConversations] = useState(() => {
    try {
      const saved = localStorage.getItem("xbotai_conversations");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "xbotai_conversations",
        JSON.stringify(conversations)
      );
    } catch {
      // ignore
    }
  }, [conversations]);

  return (
    <Router>
      <Layout
        conversations={conversations}
        setConversations={setConversations}
      />
    </Router>
  );
}