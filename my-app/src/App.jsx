import { useState, useRef, useEffect } from "react";

const API_URL = "http://localhost:8000/generate";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) throw new Error(`Server error: ${res.status}`);

      const data = await res.json();
      const reply = data.response;

      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { role: "bot", text: `Error: ${err.message}`, error: true }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={s.page}>
      <div style={s.window}>

        <div style={s.header}>
          <span style={s.dot} />
          <span style={s.headerTitle}>NLP Chatbot</span>
        </div>

        <div style={s.messages}>
          {messages.length === 0 && (
            <p style={s.empty}>Send a message to start the conversation.</p>
          )}
          {messages.map((m, i) => (
            <div key={i} style={{ ...s.row, justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                ...s.bubble,
                ...(m.role === "user" ? s.userBubble : s.botBubble),
                ...(m.error ? s.errorBubble : {}),
              }}>
                {m.text}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ ...s.row, justifyContent: "flex-start" }}>
              <div style={{ ...s.bubble, ...s.botBubble, padding: "12px 16px" }}>
                <span style={s.dotsWrap}>
                  <span style={{ ...s.dot2, animationDelay: "0s" }} />
                  <span style={{ ...s.dot2, animationDelay: "0.2s" }} />
                  <span style={{ ...s.dot2, animationDelay: "0.4s" }} />
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <div style={s.inputRow}>
          <input
            style={s.input}
            type="text"
            placeholder="Type a message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button
            style={{ ...s.sendBtn, opacity: loading || !input.trim() ? 0.4 : 1 }}
            onClick={sendMessage}
            disabled={loading || !input.trim()}
          >
            ↑
          </button>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; background: #f7f6f3; }
        @keyframes blink {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.75); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

const s = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'DM Sans', sans-serif",
    padding: "1.5rem",
  },
  window: {
    width: "100%",
    maxWidth: 520,
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #e5e3dc",
    display: "flex",
    flexDirection: "column",
    height: "80vh",
    maxHeight: 680,
    overflow: "hidden",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "14px 20px",
    borderBottom: "1px solid #e5e3dc",
    background: "#faf9f7",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#3B6D11",
    display: "inline-block",
    flexShrink: 0,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: 500,
    color: "#1a1a18",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "1.25rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  empty: {
    textAlign: "center",
    color: "#bbb",
    fontSize: 13,
    margin: "auto",
  },
  row: {
    display: "flex",
    width: "100%",
  },
  bubble: {
    maxWidth: "75%",
    padding: "10px 14px",
    borderRadius: 12,
    fontSize: 14,
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  userBubble: {
    background: "#1a1a18",
    color: "#fff",
    borderBottomRightRadius: 4,
  },
  botBubble: {
    background: "#f0ede8",
    color: "#1a1a18",
    borderBottomLeftRadius: 4,
  },
  errorBubble: {
    background: "#fcebeb",
    color: "#a32d2d",
  },
  dotsWrap: {
    display: "inline-flex",
    gap: 5,
    alignItems: "center",
    height: 16,
  },
  dot2: {
    width: 7,
    height: 7,
    borderRadius: "50%",
    background: "#999",
    display: "inline-block",
    animation: "blink 1.2s infinite",
  },
  inputRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 14px",
    borderTop: "1px solid #e5e3dc",
    background: "#faf9f7",
  },
  input: {
    flex: 1,
    border: "1px solid #e0ded8",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 14,
    color: "#1a1a18",
    background: "#fff",
    outline: "none",
    fontFamily: "inherit",
  },
  sendBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    background: "#1a1a18",
    color: "#fff",
    border: "none",
    fontSize: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "opacity 0.15s",
  },
};
