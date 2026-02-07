import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [premium, setPremium] = useState(false);

  return (
    <AuthContext.Provider value={{ user, setUser, premium, setPremium }}>
      {children}
    </AuthContext.Provider>
  );
}
