import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // const [theme, setTheme] = useState("light");
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    // setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    // Optionally, save theme preference to localStorage or similar
  };

  useEffect(() => {
    // document.documentElement.className = theme === "light" ? "light-theme" : "dark-theme";
    document.documentElement.className = theme === "dark" ? "dark-theme" : "light-theme";
  }, [theme]);


  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);