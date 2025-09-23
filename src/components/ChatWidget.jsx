import React, { useState } from "react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/.netlify/functions/ai-chat", {
        method: "POST",
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      }
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error: Unable to reach AI" },
      ]);
    }
  };

  return (
    <div className="fixed bottom-4 right-4">
      {isOpen ? (
        <div className="w-80 h-96 bg-white border border-gray-300 rounded-xl shadow-lg flex flex-col">
          <div className="bg-sky-800 text-white p-2 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Elan • Assistant</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "text-right text-slate-700"
                    : "text-left text-slate-900"
                }
              >
                {m.content}
              </div>
            ))}
          </div>
          <div className="p-2 flex gap-2 border-t">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 border rounded px-2 py-1 text-sm"
              placeholder="Type a message..."
            />
            <button
              onClick={sendMessage}
              className="bg-sky-800 text-white px-3 rounded"
            >
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-sky-800 text-white px-4 py-2 rounded-full shadow-lg"
        >
          💬 Chat
        </button>
      )}
    </div>
  );
}
