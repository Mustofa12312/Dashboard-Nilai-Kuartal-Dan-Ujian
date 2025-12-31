"use client";

import { useState, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  return {
    toast,
    showToast,
    clearToast: () => setToast(null),
  };
}
