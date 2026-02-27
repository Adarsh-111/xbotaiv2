import React, { useState } from "react";

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? "#f5a623" : "#ddd" }}>
      &#9733;
    </span>
  ));
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  const today = new Date();
  if (d.toDateString() === today.toDateString()) return "Today's Chats";
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export default function Historypage({ conversations }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedConv = selectedId
    ? conversations.find((c) => c.id === selectedId)
    : null;

  const displayed = selectedConv ? [selectedConv] : conversations;

  const groups = {};
  displayed.forEach((conv) => {
    const label = formatDate(conv.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(conv);
  });

  return (
    <div className="history-container">
      <h2 className="history-title">Conversation History</h2>

      <div className="filter-bar">
        <span className="filter-label">Conversations:</span>
        <button
          className={`filter-btn ${!selectedId ? "active" : ""}`}
          onClick={() => setSelectedId(null)}
        >
          All
        </button>
        {conversations.map((conv) => {
          const firstUserMsg = conv.messages.find((m) => m.role === "user");
          const label = firstUserMsg ? firstUserMsg.text : "Chat";
          return (
            <button
              key={conv.id}
              className={`filter-btn ${selectedId === conv.id ? "active" : ""}`}
              onClick={() => setSelectedId(conv.id)}
            >
              {label}
            </button>
          );
        })}
      </div>

      {displayed.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-secondary)",
            marginTop: 40,
          }}
        >
          No conversations found.
        </p>
      ) : (
        Object.entries(groups).map(([label, convs]) => (
          <div key={label}>
            <div className="history-section-title">{label}</div>
            {convs.map((conv) => (
              <div key={conv.id} className="history-conversation">
                {conv.messages.map((msg) => (
                  <div key={msg.id} className="history-message">
                    <div className="history-avatar">
                      {msg.role === "user" ? "U" : "AI"}
                    </div>
                    <div>
                      <div className="history-msg-sender">
                        {msg.role === "user" ? "You" : <span>Soul AI</span>}
                      </div>
                      <p className="history-msg-text">{msg.text}</p>
                      <div className="history-msg-time">{msg.time}</div>
                      {msg.role === "ai" &&
                        conv.rating > 0 &&
                        msg.id ===
                          conv.messages.filter((m) => m.role === "ai")[0]
                            ?.id && (
                          <div className="history-feedback">
                            <span className="history-stars">
                              {renderStars(conv.rating)}
                            </span>
                            {conv.feedback && (
                              <div style={{ marginTop: 4 }}>
                                <strong>Feedback</strong>: {conv.feedback}
                              </div>
                            )}
                          </div>
                        )}
                      {msg.reaction && (
                        <div style={{ marginTop: 4, fontSize: 14 }}>
                          {msg.reaction === "like" ? "(+1)" : "(-1)"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}