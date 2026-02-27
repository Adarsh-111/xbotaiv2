import React, { useState, useRef, useEffect } from "react";
import { getAIResponse } from "./Data";
import Feedbackmodal from "./Feedbackmodal";

const SUGGESTIONS = [
  { title: "Hi, what is the weather", desc: "Get immediate AI generated response" },
  { title: "Hi, what is my location?", desc: "Get immediate AI generated response" },
  { title: "Hi, what is the temperature", desc: "Get immediate AI generated response" },
  { title: "Hi, how are you", desc: "Get immediate AI generated response" },
];

function formatTime(date) {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export default function Chatpage({ conversations, setConversations }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [reactions, setReactions] = useState({});
  const [showModal, setShowModal] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleAsk = (questionText) => {
    const q = (questionText !== undefined ? questionText : input).trim();
    if (!q) return;
    const now = new Date();
    const userMsg = {
      id: Date.now(),
      role: "user",
      text: q,
      time: formatTime(now),
    };
    const aiMsg = {
      id: Date.now() + 1,
      role: "ai",
      text: getAIResponse(q),
      time: formatTime(now),
    };
    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const handleReaction = (msgId, type) => {
    setReactions((prev) => ({
      ...prev,
      [msgId]: prev[msgId] === type ? null : type,
    }));
  };

  const handleSave = () => {
    if (messages.length === 0) return;
    setShowModal(true);
  };

  const handleFeedbackSubmit = ({ rating, feedback }) => {
    const conv = {
      id: Date.now(),
      date: new Date(),
      messages: messages.map((m) => ({
        ...m,
        reaction: reactions[m.id] || null,
      })),
      rating,
      feedback,
    };
    setConversations((prev) => [...prev, conv]);
    setMessages([]);
    setReactions({});
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAsk();
  };

  return (
    <>
      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome-screen">
            <h2 className="welcome-title">How Can I Help You Today?</h2>
            <div className="bot-avatar-large">🤖</div>
            <div className="suggestion-cards">
              {SUGGESTIONS.map((s, i) => (
                <div
                  key={i}
                  className="suggestion-card"
                  onClick={() => handleAsk(s.title)}
                >
                  <strong>{s.title}</strong>
                  <span>{s.desc}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="message-wrapper">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.role === "user" ? "user-message" : "ai-message"}`}
              >
                <div className="msg-avatar">
                  {msg.role === "user" ? "🧑" : "🤖"}
                </div>
                <div className="msg-content">
                  <div className="msg-sender">
                    {msg.role === "user" ? "You" : <span>Soul AI</span>}
                  </div>
                  <p className="msg-text">{msg.text}</p>
                  <div className="msg-time">{msg.time}</div>
                  {msg.role === "ai" && (
                    <div className="msg-actions">
                      <button
                        className={`action-btn ${reactions[msg.id] === "like" ? "active" : ""}`}
                        onClick={() => handleReaction(msg.id, "like")}
                        title="Like"
                      >
                        👍
                      </button>
                      <button
                        className={`action-btn ${reactions[msg.id] === "dislike" ? "active" : ""}`}
                        onClick={() => handleReaction(msg.id, "dislike")}
                        title="Dislike"
                      >
                        👎
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <form className="input-bar" onSubmit={handleSubmit}>
        <input
          className="chat-input"
          type="text"
          placeholder="Message Bot AI…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="btn-ask" type="submit">Ask</button>
        <button className="btn-save" type="button" onClick={handleSave}>Save</button>
      </form>

      {showModal && (
        <Feedbackmodal
          onClose={() => setShowModal(false)}
          onSubmit={handleFeedbackSubmit}
        />
      )}
    </>
  );
}