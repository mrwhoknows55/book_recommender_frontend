import React, { useState } from "react";

export default function useDebounce() {
  const [typingTimeout, setTypingTimeout] = useState("");

  const debounce = (func, wait = 1000) => {
    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => func(), wait);
    setTypingTimeout(timeout);
  };
  return debounce;
}
