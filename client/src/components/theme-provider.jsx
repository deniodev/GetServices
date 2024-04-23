import React, { createContext, useContext, useEffect, useState } from "react";

// Define props for ThemeProvider
const ThemeProviderProps = {
  children: React.ReactNode,
  defaultTheme: "system",
  storageKey: "vite-ui-theme",
};

// Initial state for ThemeProvider
const initialState = {
  theme: "system",
  setTheme: () => null,
};

// Create the context for ThemeProvider
const ThemeProviderContext = createContext(initialState);

// Define the ThemeProvider component
export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}) {
  // State to manage the theme
  const [theme, setTheme] = useState(() => (localStorage.getItem(storageKey)) || defaultTheme);

  // Effect to update theme based on changes
  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  // Value for the context
  const value = {
    theme,
    setTheme: (theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

// Custom hook to consume the theme
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
