
"use client";

import { useEffect, useRef, useState } from "react";
import MessageBubble from "@/components/messageBubble";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
        }),
      });

      const data = await res.json();

      const aiMessage: Message = {
        role: "assistant",
        content: data.reply || "No response from AI",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 text-slate-800">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6">

        {/* ================= EMPTY STATE ================= */}
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-1 text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-slate-900 mb-4">
              BlinkAI...
            </h1>
            <p className="text-slate-500 mb-10">
              BlinkAI is your intelligent assistant, ready in a blink.
            </p>

            <div className="w-full max-w-xl flex gap-3 items-center bg-white p-3 rounded-2xl shadow-xl/10 border border-slate-200">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="pl-2 flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-md hover:shadow-lg hover:bg-slate-800 active:scale-95 transition-all duration-200"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        ) : (
          /* ================= CHAT STATE ================= */
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-50 shadow-xl/20 border border-slate-200 p-6 space-y-3">
              {messages.map((msg, index) => (
                <MessageBubble key={index} role={msg.role} content={msg.content} />
              ))}

              {loading && (
                <MessageBubble role="assistant" content="AI is thinking..." />
              )}

              <div ref={messageEndRef} />
            </div>

            {/* Input */}
            <div className="mt-3 flex gap-3 items-center bg-white p-2 rounded-2xl shadow-xl/30 border border-slate-200">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={loading}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                className="pl-2 flex-1 bg-transparent outline-none text-slate-700 placeholder:text-slate-400 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white text-sm font-medium shadow-md hover:shadow-lg hover:bg-slate-800 active:scale-95 transition-all duration-200"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
