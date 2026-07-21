import { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import LoadingBubble from "./LoadingBubble";

export default function ChatWindow({
  messages,
  isLoading,
  bottomRef,
}) {
  useEffect(() => {
    bottomRef?.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, isLoading, bottomRef]);

  return (
    <div className="chat-window" aria-live="polite">
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id || `${message.role}-${index}`}
          message={message}
        />
      ))}

      {isLoading && <LoadingBubble />}

      <div ref={bottomRef} />
    </div>
  );
}