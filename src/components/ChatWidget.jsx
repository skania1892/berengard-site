// src/components/ChatWidget.jsx
import { useState, useRef } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  async function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const resp = await fetch("/.netlify/functions/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await resp.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply || "Sorry, no reply." }]);
    } catch (e) {
      setMessages((m) => [...m, { role: "assistant", content: "Error reaching AI. Try again." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* Launcher button — bottom-left */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-4 left-4 z-40 rounded-full px-4 py-3 shadow-lg border bg-white/90 backdrop-blur text-slate-800 hover:bg-white"
        aria-label="Open Elan chat"
      >
        💬 Elan
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 left-4 z-40 w-80 max-h-[70vh] rounded-2xl shadow-2xl border bg-white overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-slate-800 text-white text-sm font-semibold">
            Elan — Berengard Assistant
          </div>
          <div className="p-3 space-y-3 overflow-y-auto flex-1">
            {messages.length === 0 && (
              <div className="text-sm text-slate-500">Hi! Ask me about services, consults, or support.</div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block rounded-xl px-3 py-2 text-sm ${m.role === "user" ? "bg-slate-200" : "bg-slate-100"}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-500">Thinking…</div>}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button onClick={send} className="rounded-lg px-3 py-2 text-sm bg-slate-800 text-white hover:bg-slate-700">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
