"use client";

export default function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-1 px-2 py-1"
      role="status"
      aria-live="polite"
      aria-label="AI is generating response"
    >
      <span className="sr-only">AI is generating response</span>

      <span className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:-0.3s] opacity-80" />

      <span className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse [animation-delay:-0.15s] opacity-60" />

      <span className="h-2 w-2 rounded-full bg-zinc-500 animate-pulse opacity-40" />
    </div>
  );
}