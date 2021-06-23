import React, { useEffect, useState } from "react";

export default function useScroll() {
  const [scrollPostion, setScrollPostion] = useState(null);

  const handleScroll = () => {
    setScrollPostion(window.scrollY);
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);

    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollPostion;
}
