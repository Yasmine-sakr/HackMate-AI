import { useState } from "react";

const quickActions = {
  "Generate MVP": "Generate a practical MVP for my current hackathon idea.",
  "Tech Stack": "Recommend a tech stack for my current hackathon idea.",
  "Pitch Deck": "Create a pitch deck outline for my current hackathon idea.",
  "Business Model": "Suggest a business model for my current hackathon idea.",
  "Team Roles": "Recommend team roles for my current hackathon idea.",
};

export default function ChatInput({ onSend, isLoading }) {
  const [input, setInput] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const message = input.trim();
    if (!message || isLoading) return;
    onSend(message);
    setInput("");
  };
  return <div className="chat-composer"><form className="chat-input" onSubmit={submit}><input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about your next big idea..." aria-label="Message HackMate" disabled={isLoading} /><button type="submit" disabled={!input.trim() || isLoading}>{isLoading ? "Thinking..." : "Send"}</button></form><div className="quick-actions" aria-label="Quick actions">{Object.entries(quickActions).map(([label, prompt]) => <button className="quick-action" type="button" key={label} disabled={isLoading} onClick={() => onSend(prompt)}>{label}</button>)}</div></div>;
}
