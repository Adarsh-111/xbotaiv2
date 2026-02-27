import React, { useState } from "react";

function renderStars(rating) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{ color: i < rating ? "#f5a623" : "#ddd" }}>
      *
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
  const [filterRating, setFilterRating] = useState(0);

  const filtered = filterRating
    ? conversations.filter((c) => c.rating === filterRating)
    : conversations;

  const groups = {};
  filtered.forEach((conv) => {
    const label = formatDate(conv.date);
    if (!groups[label]) groups[label] = [];
    groups[label].push(conv);
  });

  return (
    <div className="history-container">
      <h2 className="history-title">Conversation History</h2>

      <div className="filter-bar">
        <span className="filter-label">Filter by rating:</span>
        <button
          className={`filter-btn ${filterRating === 0 ? "active" : ""}`}
          onClick={() => setFilterRating(0)}
        >
          All
        </button>
        {[1, 2, 3, 4, 5].map((r) => (
          <button
            key={r}
            className={`filter-btn ${filterRating === r ? "active" : ""}`}
            onClick={() => setFilterRating(r)}
          >
            {"*".repeat(r)}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
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