import { useEffect } from "react";

export const ThemeToggle = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
};
