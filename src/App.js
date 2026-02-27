import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Chatpage from "./Chatpage";
import Historypage from "./Historypage";

function Layout({ conversations, setConversations }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHistory = location.pathname === "/history";

  return (
    <div className="app-wrapper">
      <aside className="sidebar">
        <button
          className="sidebar-btn new-chat"
          onClick={() => navigate("/")}
        >
          <span className="sidebar-icon">🤖</span>
          New Chat
        </button>
        <button
          className={`sidebar-btn past-conv ${isHistory ? "active" : ""}`}
          onClick={() => navigate("/history")}
        >
          Past Conversations
        </button>
      </aside>
      <div className="main-content">
        <div className="top-bar">
          🤖 Bot AI
        </div>
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
  const [conversations, setConversations] = useState([]);

  return (
    <Router>
      <Layout conversations={conversations} setConversations={setConversations} />
    </Router>
  );
}