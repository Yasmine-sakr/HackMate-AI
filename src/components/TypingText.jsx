import { useEffect, useState } from "react";

export default function TypingText({ text, speed = 12 }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => { let index = 0; const timer = window.setInterval(() => { index += 1; setDisplayed(text.slice(0, index)); if (index >= text.length) window.clearInterval(timer); }, speed); return () => window.clearInterval(timer); }, [text, speed]);
  return <p>{displayed}</p>;
}
