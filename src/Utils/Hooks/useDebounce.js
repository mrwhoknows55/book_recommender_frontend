import React, { useState } from "react";
import { useHistory } from "react-router";

export default function useDebounce() {
  const [typingTimeout, setTypingTimeout] = useState("");
  const history = useHistory();

  const debounce = (func, wait = 1000) => {
    clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      func();
      // history.push("/search");
    }, wait);
    setTypingTimeout(timeout);
  };
  return debounce;
}
