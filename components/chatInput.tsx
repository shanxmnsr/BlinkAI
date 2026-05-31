"use client";

import { useRef, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

interface ChatInputProps {
  value: string;
  setValue: (value: string) => void;
  onSend: () => void;
  loading: boolean;
  placeholder?: string;
}

export default function ChatInput({
  value,
  setValue,
  onSend,
  loading,
  placeholder = "Message BlinkAI...",
}: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isSendingRef = useRef(false);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;

    requestAnimationFrame(() => {
      el.style.height = "0px";
      el.style.height = Math.min(el.scrollHeight, 160) + "px";
    });
  }, []);

  useEffect(() => {
    autoResize();
  }, [value, autoResize]);

  const handleSend = useCallback(() => {
    if (!value.trim() || loading || isSendingRef.current) return;

    isSendingRef.current = true;

    onSend();

    setTimeout(() => {
      isSendingRef.current = false;
    }, 500);
  }, [value, loading, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="
        group relative overflow-hidden rounded-[30px]
        border border-white/70 bg-white/75 p-2
        shadow-[0_20px_80px_rgba(0,0,0,0.10)]
        backdrop-blur-2xl transition-all duration-300
        focus-within:shadow-[0_20px_100px_rgba(99,102,241,0.18)]
      "
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-transparent to-sky-500/5 opacity-0 transition-opacity duration-300 group-focus-within:opacity-100" />

      <div className="relative flex items-end gap-3">

        <textarea
          ref={textareaRef}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          onKeyDown={handleKeyDown}
          aria-label="Chat input"
          className="
            max-h-40 min-h-[56px] flex-1 resize-none overflow-hidden
            bg-transparent px-5 py-4 text-[15px] text-zinc-800 outline-none
            placeholder:text-zinc-400
            disabled:opacity-60
          "
        />

        <button
          onClick={handleSend}
          disabled={loading || !value.trim()}
          aria-label="Send message"
          className="
            mb-1 flex h-12 w-12 items-center justify-center rounded-2xl
            bg-gradient-to-br from-zinc-900 to-zinc-700 text-white
            shadow-lg transition-all duration-200
            hover:scale-105 hover:shadow-xl active:scale-95
            disabled:cursor-not-allowed disabled:opacity-40
          "
        >
          <ArrowUp className="h-5 w-5 transition-transform duration-200 group-active:translate-y-[1px]" />
        </button>
      </div>
    </div>
  );
}