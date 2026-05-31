"use client";

import { useState, memo } from "react";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Copy, Check } from "lucide-react";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === "user";

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const cleanText = content
        .replace(/```[\s\S]*?```/g, (match) => match.replace(/```/g, ""))
        .replace(/\*\*/g, "");

      await navigator.clipboard.writeText(cleanText);

      setCopied(true);

      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Copy failed:", error);
    }
  };

  return (
    <div
      className={`flex w-full animate-in fade-in slide-in-from-bottom-2 duration-300 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          group relative max-w-[90%] sm:max-w-[78%]
          overflow-hidden rounded-[28px]
          px-5 py-4
          text-[14px] leading-7
          shadow-sm backdrop-blur-xl transition-all duration-300 ease-out
          ${
            isUser
              ? "rounded-br-md bg-gradient-to-br from-zinc-900 to-zinc-800 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
              : "rounded-bl-md border border-white/70 bg-white/80 text-zinc-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
          }
        `}
      >
        {!isUser && (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.03] to-sky-500/[0.03]" />
        )}

        {/* Copy Button */}
        {!isUser && (
          <button
            onClick={handleCopy}
            disabled={copied}
            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/70 text-zinc-500 opacity-0 backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:text-zinc-900 group-hover:opacity-100"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        )}

        <div className="relative z-10">
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{content}</p>
          ) : (
            <div className="prose prose-zinc max-w-none break-words">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => (
                    <p className="mb-2 last:mb-0 leading-7">{children}</p>
                  ),

                  code: ({ children }) => (
                    <code className="rounded-md bg-zinc-900 px-1.5 py-0.5 text-sm text-white">
                      {children}
                    </code>
                  ),

                  pre: ({ children }) => (
                    <pre className="my-4 overflow-x-auto rounded-2xl bg-zinc-950 p-4 text-sm text-white">
                      {children}
                    </pre>
                  ),

                  ul: ({ children }) => (
                    <ul className="ml-5 list-disc space-y-1">{children}</ul>
                  ),

                  ol: ({ children }) => (
                    <ol className="ml-5 list-decimal space-y-1">{children}</ol>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(MessageBubble);