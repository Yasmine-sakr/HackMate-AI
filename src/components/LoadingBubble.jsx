import { useEffect, useState } from "react";

const texts = [
  "🧠 Understanding your idea...",
  "⚙️ Building your MVP...",
  "🚀 Selecting the best Tech Stack...",
  "🏆 Finalizing your Hackathon Canvas..."
];

export default function LoadingBubble() {

  const [step, setStep] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {

      setStep((prev) => (prev + 1) % texts.length);

    }, 1200);

    return () => clearInterval(interval);

  }, []);

  return (

    <div className="message-row">

      <div className="message-avatar">
        H
      </div>

      <div className="loading-bubble">

        <span>{texts[step]}</span>

      </div>

    </div>

  );

}