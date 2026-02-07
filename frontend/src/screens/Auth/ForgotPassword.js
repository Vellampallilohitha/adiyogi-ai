// import { useState } from "react";
// import axios from "axios";

// export default function ForgotPassword({ goBack }) {
//   const [email, setEmail] = useState("");
//   const [token, setToken] = useState("");

//   const send = async () => {
//     const res = await axios.post("/api/v1/auth/forgot-password", { email });
//     setToken(res.data.token); // temporary (email later)
//   };

//   return (
//     <div className="reset-page">
//       <div className="reset-card">
//         <h2>Reset Password</h2>
//         <p className="subtitle">
//           Enter your registered email to receive reset instructions
//         </p>

//         <input
//           type="email"
//           placeholder="Registered Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <button className="reset-btn">Send Reset Link</button>

//         <p className="back-link" onClick={goBack}>
//           ← Back to Login
//         </p>
//       </div>
//     </div>
//   );
// }
// //     <div style={styles.box}>
// //       <h2>Reset Password</h2>

// //       <input
// //         placeholder="Registered Email"
// //         onChange={(e) => setEmail(e.target.value)}
// //       />

// //       <button onClick={send}>Send Reset</button>

// //       {token && (
// //         <p onClick={() => goReset(token)} style={styles.link}>
// //           Continue Reset →
// //         </p>
// //       )}
// //     </div>
// //   );
// // }



import { useState } from "react";
import "./reset.css";

export default function ForgotPassword({ goReset }) {
  const [email, setEmail] = useState("");

  const sendReset = () => {
    if (!email) {
      alert("Please enter registered email");
      return;
    }

    // temporary token (frontend-only flow)
    const token = "demo-reset-token";

    // ✅ THIS MUST EXIST
    goReset(token);
  };

  return (
    <div className="reset-page">
      <div className="reset-card">
        <h2>Reset Password</h2>
        <p className="sub">
          Enter your registered email to receive reset instructions
        </p>

        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={sendReset}>
          Send Reset Link
        </button>
      </div>
    </div>
  );
}