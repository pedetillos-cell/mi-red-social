"use client";

import { useEffect } from "react";

export default function ThemeScript() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme ? savedTheme === 'dark' : systemDark;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      // Aplicar a todos los elementos con clases dark
      const elements = document.querySelectorAll('[class*="dark:"]');
      elements.forEach(el => el.classList.add('dark'));
    }
  }, []);

  return null;
}