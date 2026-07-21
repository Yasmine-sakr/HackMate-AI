import { useEffect, useRef, useState } from "react";
import { FaFilePdf, FaMarkdown, FaRobot } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import { askGemini } from "./services/gemini";
import ChatInput from "./components/ChatInput";
import ChatWindow from "./components/ChatWindow";
import HackathonCanvas from "./components/HackathonCanvas";
import LandingPage from "./components/LandingPage";
import "./App.css";

const CHAT_STORAGE_KEY = "hackmate-chat";
const CANVAS_STORAGE_KEY = "hackmate-canvas";
const STARTED_KEY = "hackmate-started";
const THEME_KEY = "hackmate-theme";
const createMessage = (role, content) => ({ id: crypto.randomUUID(), role, content, timestamp: new Date().toISOString() });
const welcomeMessage = {
  id: 1,
  role: "assistant",
  content:
    "Hey, I’m HackMate. Tell me your hackathon idea, team skills, or deadline—and we’ll turn it into a plan.",
};
const readStorage = (key, fallback) => { try { const value = localStorage.getItem(key); return value ? JSON.parse(value) : fallback; } catch { return fallback; } };

function canvasMarkdown(canvas) {
  const section = (title, value) => `## ${title}\n${Array.isArray(value) ? value.map((item) => `- ${item}`).join("\n") : value}\n`;
  return ["# Hackathon Canvas", section("Idea Summary", canvas.ideaSummary), section("MVP", canvas.mvp), section("Tech Stack", canvas.techStack), section("Team Roles", canvas.teamRoles), section("48-Hour Plan", canvas.plan48Hours), section("Monetization", canvas.monetization), section("Winning Tips", canvas.winningTips)].join("\n");
}

export default function App() {
  const [hasStarted, setHasStarted] = useState(() => localStorage.getItem(STARTED_KEY) === "true");
  const [messages, setMessages] = useState(() => { const saved = readStorage(CHAT_STORAGE_KEY, null); return Array.isArray(saved) && saved.length ? saved : [welcomeMessage]; });
  const [canvasData, setCanvasData] = useState(() => readStorage(CANVAS_STORAGE_KEY, null));
  const [isLoading, setIsLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) !== "light");
  const bottomRef = useRef(null);

  useEffect(() => { document.body.classList.toggle("light-mode", !darkMode); localStorage.setItem(THEME_KEY, darkMode ? "dark" : "light"); }, [darkMode]);
  useEffect(() => { localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages)); }, [messages]);
  useEffect(() => { if (canvasData) localStorage.setItem(CANVAS_STORAGE_KEY, JSON.stringify(canvasData)); else localStorage.removeItem(CANVAS_STORAGE_KEY); }, [canvasData]);

  const handleNewChat = () => { setIsLoading(false); setMessages([welcomeMessage]); setCanvasData(null); };
  const handleUpdateCanvas = (key, value) => setCanvasData((current) => current ? { ...current, [key]: value } : current);
  const download = (blob, name) => { const url = URL.createObjectURL(blob); const anchor = document.createElement("a"); anchor.href = url; anchor.download = name; anchor.click(); URL.revokeObjectURL(url); };
  const handleExportCanvas = async (format) => {
    if (!canvasData) return;
    const markdown = canvasMarkdown(canvasData);
    if (format === "md") { download(new Blob([markdown], { type: "text/markdown;charset=utf-8" }), "HackMate_Canvas.md"); return; }
    const printable = document.createElement("article");
    printable.dir = "auto";
    printable.style.cssText = "width:800px;padding:36px;color:#111827;background:#fff;font-family:Arial,'Noto Sans Arabic',sans-serif;line-height:1.6;white-space:pre-wrap";
    printable.textContent = markdown;
    document.body.appendChild(printable);
    try { const { default: html2pdf } = await import("html2pdf.js"); await html2pdf().set({ margin: 10, filename: "HackMate_Canvas.pdf", image: { type: "jpeg", quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: "mm", format: "a4", orientation: "portrait" } }).from(printable).save(); } finally { printable.remove(); }
  };
  const handleSend = async (content) => {
    const prompt = content?.trim();
    if (!prompt || isLoading) return;
    const userMessage = {
  id: Date.now(),
  role: "user",
  content: prompt,
};
    const history = [...messages, userMessage].slice(-12).map(({ role, content: messageContent }) => ({ role, content: messageContent }));
    setMessages((current) => [...current, userMessage]);
    setIsLoading(true);
    try {
      const response = await askGemini(history);
      if (response?.type === "canvas" && response.canvas) { setCanvasData(response.canvas); setMessages((current) => [...current, createMessage("assistant", "✅ Your Hackathon Canvas has been generated successfully.")]); }
      else if (response?.type === "chat" && response.content?.trim()) setMessages((current) => [...current, createMessage("assistant", response.content.trim())]);
      else throw new Error("The AI returned an invalid response.");
    } catch (error) { console.error("Gemini request failed:", error); setMessages((current) => [...current, createMessage("assistant", "I couldn’t reach the AI service right now. Please check your connection and try again.")]); }
    finally { setIsLoading(false); }
  };
  if (!hasStarted) return <LandingPage onStart={() => { localStorage.setItem(STARTED_KEY, "true"); setHasStarted(true); }} />;
  return <main className="app-shell"><section className="chat-card" aria-label="HackMate AI chat"><header className="chat-header"><div className="header-copy"><p className="eyebrow">YOUR AI CO-FOUNDER</p><h1>HackMate AI</h1></div><div className="brand-mark"><FaRobot /></div><span className="status"><span />Online</span><button className="new-chat-button" type="button" onClick={handleNewChat} disabled={isLoading}><FiPlus />New Chat</button><button className="theme-toggle" type="button" onClick={() => setDarkMode((current) => !current)} aria-label="Toggle theme">{darkMode ? "☀️" : "🌙"}</button></header><ChatWindow messages={messages} isLoading={isLoading} bottomRef={bottomRef} />{canvasData && <><HackathonCanvas content={canvasData} onUpdateCanvas={handleUpdateCanvas} /><div className="canvas-actions-bottom"><button className="export-button" type="button" onClick={() => handleExportCanvas("md")}><FaMarkdown /><span>Markdown</span></button><button className="export-button" type="button" onClick={() => handleExportCanvas("pdf")}><FaFilePdf /><span>PDF</span></button></div></>}<ChatInput onSend={handleSend} isLoading={isLoading} /></section><footer className="app-footer"><p>Made with ❤️ by <strong>Yasmine Sakr</strong></p><div className="footer-links"><a href="https://www.linkedin.com/in/yasmine-sakr-952690326" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://github.com/Yasmine-sakr" target="_blank" rel="noreferrer">GitHub</a><a href="https://discord.gg/3JrAtNJQ5" target="_blank" rel="noreferrer">Discord</a></div></footer></main>;
}
