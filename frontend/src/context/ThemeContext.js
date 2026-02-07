import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");

  // AUTO THEME BY TIME (Kailasa logic)
  useEffect(() => {
    const hour = new Date().getHours();
    const autoTheme = hour >= 6 && hour < 18 ? "light" : "dark";

    const saved = localStorage.getItem("theme");
    const finalTheme = saved || autoTheme;

    setTheme(finalTheme);
    document.documentElement.setAttribute(
      "data-theme",
      finalTheme
    );
  }, []);

  useEffect(() => {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 18) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}, []);


  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
