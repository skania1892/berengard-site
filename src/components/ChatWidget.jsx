// src/components/ChatWidget.jsx
import { useState, useRef } from "react";
import ReactMarkdown from "react-markdown";

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
              <div className="space-y-2">
                <div className="text-sm text-slate-500">
                  Hi! Ask me about services, consults, or support.
                </div>
                <div className="text-[11px] leading-relaxed text-slate-400">
                  I&rsquo;m an AI assistant, so I can get things wrong — please
                  confirm anything important. Messages are sent to our AI
                  provider to generate a reply and aren&rsquo;t stored. Don&rsquo;t
                  share sensitive or confidential information.
                </div>
              </div>
            )}
				{messages.map((m, i) => (
				  <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
					{/* text-slate-800 is REQUIRED, not decorative. App.jsx's root sets
					    text-slate-200 for the dark page, and this panel is inside it —
					    so without an explicit colour the bubbles inherit near-white text
					    on a near-white bubble (user bubble was 1.00:1, literally
					    invisible). Any new element in this widget needs its own colour. */}
					<div
					  className={`inline-block rounded-xl px-3 py-2 text-sm text-slate-800 ${
						m.role === "user" ? "bg-slate-200" : "bg-slate-100"
					  }`}
					  style={{ maxWidth: "100%" }}
					>
					  {m.role === "assistant" ? (
						<ReactMarkdown
						  components={{
							p: (props) => <p className="mb-2" {...props} />,
							ul: (props) => <ul className="list-disc pl-5 mb-2" {...props} />,
							ol: (props) => <ol className="list-decimal pl-5 mb-2" {...props} />,
							li: (props) => <li className="mb-1" {...props} />,
							strong: (props) => <strong className="font-semibold" {...props} />
						  }}
						>
						  {m.content}
						</ReactMarkdown>
					  ) : (
						m.content
					  )}
					</div>
				  </div>
				))}
            {loading && <div className="text-xs text-slate-500">Thinking…</div>}
          </div>

          <div className="p-3 border-t bg-white">
            <div className="flex gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Type a message…"
                className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm bg-white text-slate-900 placeholder:text-slate-500"
              />
              <button
                onClick={send}
                className="rounded-lg px-3 py-2 text-sm text-white hover:opacity-95"
                style={{ backgroundColor: BRAND_NAVY }}
              >
                Send
              </button>
            </div>
            {/* Always-visible AI disclosure — required context even mid-conversation */}
            <p className="mt-2 text-[10px] leading-snug text-slate-400 text-center">
              AI-generated · may be inaccurate ·{" "}
              <a
                href="/privacy.html#ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-slate-600"
              >
                how we handle your messages
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
