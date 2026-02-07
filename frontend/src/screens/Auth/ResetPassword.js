// import { useState } from "react";
// import axios from "axios";

// export default function ResetPassword({ token, goLogin }) {
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const reset = async () => {
//     await axios.post("/api/v1/auth/reset-password", {
//       token,
//       newPassword: password,
//     });
//     setMsg("Password reset successful");
//   };

//   return (
//     <div style={styles.box}>
//       <h2>New Password</h2>

//       <input
//         type="password"
//         placeholder="New Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {msg && <p>{msg}</p>}

//       <button onClick={reset}>Reset</button>
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
//   link: { color: "#7dd3fc", cursor: "pointer" },
// };



import { useState } from "react";
import "./reset.css";

export default function ResetPassword({ token, goLogin }) {
  const [password, setPassword] = useState("");

  const savePassword = async () => {
    if (!password) {
      alert("Enter new password");
      return;
    }

    alert("Password reset successful!");
    goLogin(); // ✅ THIS WORKS
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p className="sub">Create a new password</p>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={savePassword}>
          Save New Password
        </button>

        <p className="back-link" onClick={goLogin}>
          ← Back to Login
        </p>
      </div>
    </div>
  );
}

