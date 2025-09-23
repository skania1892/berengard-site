// src/components/ChatWidget.jsx
import { useState, useRef } from "react";

const BRAND_NAVY = "#0c4a6e";

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
      setMessages((m) => [
        ...m,
        { role: "assistant", content: data.reply || "Sorry, no reply." },
      ]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Error reaching AI. Try again." },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const launcherBase =
    "fixed bottom-4 left-4 z-40 rounded-full px-4 py-3 shadow-lg border transition-colors";
  const launcherClosed =
    "bg-white/95 text-slate-800 border-slate-300 hover:bg-white";
  const launcherOpen = "text-white";
  const launcherStyle = open ? { backgroundColor: BRAND_NAVY, borderColor: BRAND_NAVY } : {};

  return (
    <>
      {/* Launcher (closed: 💬 Arwen, open: − Arwen) */}
      <button
        onClick={() => setOpen((o) => !o)}
        className={`${launcherBase} ${open ? launcherOpen : launcherClosed}`}
        style={launcherStyle}
        aria-label={open ? "Minimize Arwen chat" : "Open Arwen chat"}
      >
        <span className="mr-2">{open ? "−" : "💬"}</span>
        <span className="font-medium">Arwen</span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-20 left-4 z-40 w-80 max-h-[70vh] rounded-2xl shadow-2xl border bg-white overflow-hidden flex flex-col">
          <div
            className="px-4 py-3 text-white text-sm font-semibold"
            style={{ backgroundColor: BRAND_NAVY }}
          >
            Arwen — Berengard Assistant
          </div>

          <div className="p-3 space-y-3 overflow-y-auto flex-1 bg-white/90">
            {messages.length === 0 && (
              <div className="text-sm text-slate-500">
                Hi! Ask me about services, consults, or support.
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div
                  className={`inline-block rounded-xl px-3 py-2 text-sm ${
                    m.role === "user" ? "bg-slate-200" : "bg-slate-100"
                  } ${m.role !== "user" ? "whitespace-pre-wrap" : ""}`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div className="text-xs text-slate-500">Thinking…</div>}
          </div>

          <div className="p-3 border-t flex gap-2 bg-white">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border px-3 py-2 text-sm"
            />
            <button
              onClick={send}
              className="rounded-lg px-3 py-2 text-sm text-white hover:opacity-95"
              style={{ backgroundColor: BRAND_NAVY }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
