// import { useState } from "react";
// import axios from "axios";
// import "./register.css";

// export default function RegisterScreen({ goLogin }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const register = async () => {
//     try {
//       await axios.post("/api/v1/auth/register", {
//         email,
//         password,
//       });
//       setMsg("Registered successfully. Please login.");
//     } catch {
//       setMsg("User already exists");
//     }
//   };

//   return (
//     <div style={styles.box}>
//       <h2>Create Account 🔱</h2>

//       <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//       <input
//         type="password"
//         placeholder="Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {msg && <p>{msg}</p>}

//       <button onClick={register}>Register</button>
//       <p onClick={goLogin} style={styles.link}>Back to Login</p>
//     </div>
//   );
// }

// const styles = {
//   box: {
//     maxWidth: 360,
//     margin: "80px auto",
//     padding: 24,
//     background: "rgba(2,6,23,0.7)",
//     borderRadius: 20,
//     color: "#e5e7eb",
//     textAlign: "center",
//   },
//   link: { color: "#7dd3fc", cursor: "pointer", marginTop: 10 },
// };

import { useState } from "react";
import axios from "axios";
import "./register.css";
import "./authBackground.css";

export default function RegisterScreen({ goLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    try {
      if (!name || !email || !password) {
        setError("All fields are required");
        return;
      }

      await axios.post("/api/v1/auth/register", {
        name,        // ✅ THIS WAS MISSING BEFORE
        email,
        password,
      });

      alert("Registered successfully 🙏 Please login");
      goLogin();
    } catch (err) {
      setError(
        err.response?.data?.msg || "Registration failed"
      );
    }
  };

  return (
    <div className="auth-page">
      {/* 🌫️ CLOUD BACKGROUND */}
      <div className="auth-cloud cloud-1"></div>
      <div className="auth-cloud cloud-2"></div>

      {/* 🧘 REGISTER CARD */}
      <div className="register-card">
        <h2 className="register-title">Begin the Journey 🔱</h2>
        <p className="register-sub">Enter the MahaShiva Universe</p>

        <input
          className="chakra-input chakra-red"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="chakra-input chakra-green"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="chakra-input chakra-violet"
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="register-btn" onClick={register}>
          ✨ Register
        </button>

        <p className="auth-link" onClick={goLogin}>
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}