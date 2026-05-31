"use client";

import { useEffect, useRef, useState } from "react";

import MessageBubble from "@/components/messageBubble";
import ChatInput from "@/components/chatInput";
import TypingIndicator from "@/components/typingIndicator";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatContainer() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messageEndRef = useRef<HTMLDivElement | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);
  const assistantIdRef = useRef<string | null>(null);
  const streamBufferRef = useRef("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }, 30);

    return () => clearTimeout(timeout);
  }, [messages, loading]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: input,
    };

    const assistantId = crypto.randomUUID();
    assistantIdRef.current = assistantId;
    streamBufferRef.current = "";

    setMessages((prev) => [
      ...prev,
      userMessage,
      { id: assistantId, role: "assistant", content: "" },
    ]);

    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.content }),
        signal: controller.signal,
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        streamBufferRef.current += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantIdRef.current
              ? { ...msg, content: streamBufferRef.current }
              : msg,
          ),
        );
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen overflow-hidden text-zinc-900">
      <div className="absolute inset-0 bg-[#f4f6fb]" />
      <div className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-indigo-300/30 blur-[120px]" />
        <div className="absolute bottom-[-200px] right-[-200px] h-[700px] w-[700px] rounded-full bg-sky-300/30 blur-[140px]" />
      </div>
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 flex h-full flex-col">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6">
            <div className="mb-6 rounded-full border border-white/70 bg-white/70 px-5 py-2 shadow-md backdrop-blur-2xl">
              <span className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                BlinkAI is online
              </span>
            </div>

            <h1 className="text-center text-6xl font-semibold tracking-tight text-zinc-900 sm:text-7xl">
              Blink<span className="text-indigo-500">AI</span>
            </h1>

            <p className="mt-4 max-w-xl text-center text-sm text-zinc-500 sm:text-base">
              A lightweight, fast and modern AI chat experience built for
              clarity and speed.
            </p>

            <div className="mt-10 w-full max-w-3xl">
              <div>
                <ChatInput
                  value={input}
                  setValue={setInput}
                  onSend={handleSend}
                  loading={loading}
                  placeholder="Ask anything..."
                />
              </div>

              <p className="mt-3 text-center text-xs text-zinc-400">
                Responses may not always be accurate.
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* CHAT AREA */}
            <div className="flex-1 overflow-y-auto px-4 pb-40 pt-10 sm:px-6">
              <div className="mx-auto flex w-full max-w-4xl flex-col space-y-6">
                {messages.map((msg) => (
                  <MessageBubble
                    key={msg.id}
                    role={msg.role}
                    content={msg.content}
                  />
                ))}

                {loading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex justify-start">
                    <div className="rounded-2xl border border-white/60 bg-white/70 px-4 py-3 backdrop-blur-xl shadow-sm">
                      <TypingIndicator />
                    </div>
                  </div>
                )}

                <div ref={messageEndRef} />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full px-4 pb-6 sm:px-6">
              <div className="mx-auto max-w-3xl">
                <div className="rounded-3xl border border-white/60 bg-white/80 p-2 shadow-2xl backdrop-blur-2xl">
                  <ChatInput
                    value={input}
                    setValue={setInput}
                    onSend={handleSend}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
