// import { useEffect, useState } from "react";
// import axios from "axios";
// import LogoutButton from "../../components/LogoutButton";

// const STORAGE_KEY = "adiyogi_ai_chat";

// export default function AIChatScreen({ setAIEnergy }) {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [mode, setMode] = useState("brief");
//   const [language, setLanguage] = useState("en");
//   const [voice, setVoice] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /* ---------- LOAD CHAT HISTORY ---------- */
//   useEffect(() => {
//     const saved = localStorage.getItem(STORAGE_KEY);
//     if (saved) setMessages(JSON.parse(saved));
//   }, []);

//   /* ---------- SAVE CHAT HISTORY ---------- */
//   useEffect(() => {
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
//   }, [messages]);

//   /* ---------- VOICE (SIMPLE & STABLE) ---------- */
//   const speak = (text) => {
//     if (!voice) return;

//     speechSynthesis.cancel();

//     const utter = new SpeechSynthesisUtterance(text);
//     utter.lang =
//       language === "te"
//         ? "te-IN"
//         : language === "hi"
//         ? "hi-IN"
//         : "en-IN";

//     utter.rate = 0.8;
//     utter.pitch = 0.9;
//     utter.volume = 1;

//     speechSynthesis.speak(utter);
//   };

//   /* ---------- SEND MESSAGE ---------- */
//   const send = async () => {
//     if (!input.trim()) return;

//     const userMsg = { role: "user", text: input };
//     setMessages((prev) => [...prev, userMsg]);
//     setLoading(true);

//     try {
//       const response = await axios.post("/api/v1/ai/ask", {
//         message: input,
//         language,
//         mode,
//       });

//       const reply =
//         response?.data?.reply || "Silence remains…";

//       const aiMsg = { role: "ai", text: reply };
//       setMessages((prev) => [...prev, aiMsg]);

//       if (setAIEnergy) {
//         setAIEnergy(1);
//         setTimeout(() => setAIEnergy(0), 1200);
//       }

//       speak(reply);
//     } catch (err) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "ai", text: "Silence remains…" },
//       ]);
//     }

//     setInput("");
//     setLoading(false);
//   };

//   const clearChat = () => {
//     localStorage.removeItem(STORAGE_KEY);
//     setMessages([]);
//   };

//   return (
//     <div style={styles.container}>
//       {/* HEADER */}
//       <div style={styles.header}>
//         <h2>AdiYogi AI</h2>
//         <LogoutButton />
//       </div>

//       {/* CONTROLS */}
//       <div style={styles.controls}>
//         <select value={mode} onChange={(e) => setMode(e.target.value)}>
//           <option value="brief">Brief</option>
//           <option value="guided">Guided</option>
//         </select>

//         <select value={language} onChange={(e) => setLanguage(e.target.value)}>
//           <option value="en">English</option>
//           <option value="te">తెలుగు</option>
//           <option value="hi">हिंदी</option>
//         </select>

//         <button onClick={() => setVoice(!voice)}>
//           {voice ? "🔊 Voice ON" : "🔇 Voice OFF"}
//         </button>

//         <button onClick={clearChat}>🗑 Clear</button>
//       </div>

//       {/* CHAT */}
//       <div style={styles.chat}>
//         {messages.map((m, i) => (
//           <div
//             key={i}
//             style={{
//               ...styles.msg,
//               alignSelf: m.role === "user" ? "flex-end" : "flex-start",
//             }}
//           >
//             {m.text}
//           </div>
//         ))}
//         {loading && <div style={styles.muted}>Thinking…</div>}
//       </div>

//       {/* INPUT */}
//       <div style={styles.inputBox}>
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Ask gently…"
//         />
//         <button onClick={send}>Send</button>
//       </div>
//     </div>
//   );
// }

// /* ---------- STYLES ---------- */
// const styles = {
//   container: {
//     minHeight: "100vh",
//     padding: 20,
//     background: "rgba(2,6,23,0.55)",
//     color: "#e5e7eb",
//     borderRadius: 12,
//     display: "flex",
//     flexDirection: "column",
//   },
//   header: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   controls: {
//     display: "flex",
//     gap: 8,
//     marginBottom: 10,
//     flexWrap: "wrap",
//   },
//   chat: {
//     flex: 1,
//     display: "flex",
//     flexDirection: "column",
//     gap: 8,
//     marginBottom: 12,
//   },
//   msg: {
//     maxWidth: "75%",
//     padding: 10,
//     borderRadius: 10,
//     background: "#111827",
//   },
//   muted: {
//     color: "#94a3b8",
//     fontSize: 13,
//   },
//   inputBox: {
//     display: "flex",
//     gap: 10,
//   },
// };



import { useEffect, useRef, useState } from "react";
import axios from "axios";

const API_AI = "http://localhost:5000/api/v1/ai/ask";
const API_CHATS = "http://localhost:5000/api/v1/chats";

// TEMP user id (later replace with auth/JWT)
const USER_ID = "guest-user";

export default function AIChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("brief");
  const [voice, setVoice] = useState(false);
  const [loading, setLoading] = useState(false);

  const [chatId, setChatId] = useState(null);
  const chatEndRef = useRef(null);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ================= VOICE ================= */
  const speak = (text) => {
    if (!voice || !text) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-IN";
    u.rate = 0.85;
    u.pitch = 0.9;
    speechSynthesis.speak(u);
  };

  /* ================= ENSURE CHAT EXISTS (SAFE) ================= */
  const ensureChat = async (firstMessage) => {
    if (chatId) return chatId;

    try {
      const res = await axios.post(`${API_CHATS}/new`, {
        userId: USER_ID,
        title: firstMessage.slice(0, 40),
      });

      setChatId(res.data._id);
      return res.data._id;
    } catch (err) {
      console.warn("⚠️ Chat creation failed, continuing without DB");
      return null;
    }
  };

  /* ================= SEND ================= */
  const send = async () => {
    if (!input.trim() || loading) return;

    const question = input.trim();
    setInput("");
    setLoading(true);

    // show instantly in UI
    setMessages((m) => [...m, { role: "user", text: question }]);

    let activeChatId = null;

    try {
      // 🔹 try DB chat creation
      activeChatId = await ensureChat(question);

      // 🔹 try saving user message
      if (activeChatId) {
        axios.post(`${API_CHATS}/message/${activeChatId}`, {
          role: "user",
          text: question,
        }).catch(() =>
          console.warn("⚠️ User message save failed")
        );
      }

      // 🔹 ask AI (MAIN FLOW)
      const res = await axios.post(API_AI, {
        message: question,
        mode,
      });

      const reply =
        res?.data?.reply ||
        "🕉️ I am present. The answer could not flow just now.";

      setMessages((m) => [...m, { role: "ai", text: reply }]);

      // 🔹 try saving AI reply
      if (activeChatId) {
        axios.post(`${API_CHATS}/message/${activeChatId}`, {
          role: "ai",
          text: reply,
        }).catch(() =>
          console.warn("⚠️ AI message save failed")
        );
      }

      speak(reply);
    } catch (err) {
      console.error("AI ERROR:", err);
      setMessages((m) => [
        ...m,
        { role: "ai", text: "🕉️ Something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  /* ================= CLEAR ================= */
  const clearChat = () => {
    setMessages([]);
    setChatId(null);
  };

  const focusInput = () => {
    document.getElementById("adiyogi-input")?.focus();
  };

  /* ================= UI ================= */
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>🕉 AdiYogi AI</h2>
      </div>

      <div style={styles.controls}>
        <button
          onClick={() => setMode("brief")}
          style={mode === "brief" ? styles.activeBtn : styles.btn}
        >
          Brief
        </button>

        <button
          onClick={() => setMode("guided")}
          style={mode === "guided" ? styles.activeBtn : styles.btn}
        >
          Guided
        </button>

        <button onClick={() => setVoice((v) => !v)} style={styles.btn}>
          {voice ? "🔊 Voice ON" : "🔇 Voice OFF"}
        </button>

        <button onClick={clearChat} style={styles.btn}>
          Clear
        </button>

        <button onClick={focusInput} style={styles.askInlineBtn}>
          🕉 Ask AdiYogi
        </button>
      </div>

      <div style={styles.chat}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              ...styles.msg,
              alignSelf: m.role === "user" ? "flex-end" : "flex-start",
              background: m.role === "user" ? "#1f2937" : "#020617",
            }}
          >
            {m.text}
          </div>
        ))}

        {loading && (
          <div style={styles.thinking}>🧘 Shiva listens…</div>
        )}

        <div ref={chatEndRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          id="adiyogi-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask AdiYogi…"
          style={styles.inputField}
        />
        <button
          onClick={send}
          disabled={loading}
          style={{
            ...styles.sendBtn,
            opacity: loading ? 0.6 : 1,
          }}
        >
          ➤
        </button>
      </div>

      <div style={styles.enterHint}>
        Press <span style={styles.key}>Enter</span> to send
      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    minHeight: "100vh",
    padding: 20,
    background: "rgba(2,6,23,0.6)",
    backdropFilter: "blur(6px)",
    color: "#e5e7eb",
    display: "flex",
    flexDirection: "column",
  },
  header: { marginBottom: 10 },
  controls: {
    display: "flex",
    gap: 10,
    marginBottom: 10,
    flexWrap: "wrap",
  },
  btn: {
    padding: "7px 14px",
    borderRadius: 8,
    background: "#020617",
    color: "#e5e7eb",
    border: "1px solid #334155",
    cursor: "pointer",
  },
  activeBtn: {
    padding: "7px 14px",
    borderRadius: 8,
    background: "#0f172a",
    color: "#22d3ee",
    border: "1px solid #22d3ee",
  },
  askInlineBtn: {
    padding: "7px 16px",
    borderRadius: 999,
    background: "#0f172a",
    color: "#22d3ee",
    border: "1px solid #22d3ee",
  },
  chat: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 10,
    overflowY: "auto",
    marginBottom: 10,
  },
  msg: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 12,
  },
  thinking: {
    color: "#94a3b8",
    fontSize: 13,
  },
  inputBox: {
    display: "flex",
    gap: 10,
    padding: 10,
    borderRadius: 12,
    background: "rgba(15,23,42,0.6)",
    border: "1px solid #1e293b",
  },
  inputField: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: 10,
    border: "1px solid #334155",
    background: "#020617",
    color: "#e5e7eb",
  },
  sendBtn: {
    padding: "12px 18px",
    borderRadius: 10,
    background: "#0f172a",
    color: "#22d3ee",
    border: "1px solid #22d3ee",
    fontWeight: 600,
  },
  enterHint: {
    marginTop: 6,
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "right",
  },
  key: {
    padding: "2px 6px",
    borderRadius: 4,
    background: "#020617",
    border: "1px solid #334155",
    fontSize: 11,
  },
};