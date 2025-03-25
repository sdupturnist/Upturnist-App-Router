"use client"

import { createContext, useContext, useEffect, useState } from "react";

// Create a context for theme management
const ThemeContext = createContext();

// ThemeProvider component to manage theme state
export function ThemeProvider({ children }) {
  // Function to get the initial theme from sessionStorage or default to 'light'
  const getInitialTheme = () => {
    if (typeof window !== "undefined") { // Ensure this runs only in the browser
      try {
        const savedTheme = sessionStorage.getItem("theme");
        return savedTheme ? JSON.parse(savedTheme) : "light"; // Default to 'light'
      } catch (error) {
        console.error("Failed to parse theme from sessionStorage", error);
        return "light"; // Default to 'light' in case of error
      }
    }
    return "light"; // Default to 'light' for SSR
  };

  const [theme, setTheme] = useState(getInitialTheme);

  // Effect to apply the theme class to the <html> element
  useEffect(() => {
    const htmlElement = document.body; // Use document.body instead of document.documentElement

    if (theme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    }

    // Save the theme to sessionStorage
    sessionStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]); // Re-run the effect when the theme changes

  // Function to toggle between dark and light theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Provide the theme and toggle function to the rest of the app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useThemeContext() {
  return useContext(ThemeContext);
}
