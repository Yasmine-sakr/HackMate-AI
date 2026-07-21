import { useState } from "react";
import TypingText from "./TypingText";

export default function ChatMessage({ message }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";
  const copy = async () => { try { await navigator.clipboard.writeText(message.content); setCopied(true); setTimeout(() => setCopied(false), 1500); } catch { setCopied(false); } };
  return <div className={`message-row ${isUser ? "message-row--user" : ""}`}><div className="message-avatar" aria-hidden="true">{isUser ? "Y" : "H"}</div><div className={`message-bubble ${isUser ? "message-bubble--user" : "message-bubble--assistant"}`}><div className="message-top"><span className="message-label">{isUser ? "You" : "HackMate"}</span>{!isUser && <button className="copy-btn" type="button" onClick={copy}>{copied ? "Copied" : "Copy"}</button>}</div>{isUser ? <p>{message.content}</p> : <TypingText text={message.content} />}{message.timestamp && <time className="message-time">{new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>}</div></div>;
}
