// import { useState } from "react";
// import axios from "axios";
// import "./login.css";

// export default function LoginScreen({ onSuccess, goRegister, goForgot }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const login = async () => {
//     try {
//       const res = await axios.post("/api/v1/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       onSuccess();
//     } catch {
//       setError("Invalid email or password");
//     }
//   };

//   return (
//     <div style={styles.box}>
//       <h2>Welcome Back 🕉️</h2>

//       <input
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {error && <p style={styles.error}>{error}</p>}

//       <button onClick={login}>Login</button>

//       <p onClick={goForgot} style={styles.link}>Forgot Password?</p>
//       <p onClick={goRegister} style={styles.link}>New User? Register</p>
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
//   error: { color: "#f87171" },
//   link: { color: "#7dd3fc", cursor: "pointer", marginTop: 10 },
// };


import { useState } from "react";
import axios from "axios";
import "./login.css";
import "./authBackground.css";
import "./authTransition.css";

export default function LoginScreen({ onSuccess, goRegister, goForgot }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [exiting, setExiting] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🌌 trigger cosmic exit
      setExiting(true);
      setTimeout(onSuccess, 900);
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className={`auth-page ${exiting ? "cosmic-exit" : ""}`}>
      <div className="auth-cloud cloud-1" />
      <div className="auth-cloud cloud-2" />

      <div className="login-card">
        <h2 className="login-title">Welcome Back 🕉️</h2>
        <p className="login-sub">Enter the MahaShiva Universe</p>

        <input
          className="login-input chakra-blue"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="login-input chakra-violet"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="login-error">{error}</p>}

        <button className="login-btn" onClick={login}>
          Login
        </button>

        <p className="auth-link" onClick={goForgot}>Forgot Password?</p>
        <p className="auth-link" onClick={goRegister}>New User? Register</p>
      </div>
    </div>
  );
}