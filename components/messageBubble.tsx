
// "use client";

// import ReactMarkdown from "react-markdown";

// interface MessageBubbleProps {
//   role: "user" | "assistant";
//   content: string;
// }

// export default function MessageBubble({
//   role,
//   content,
// }: MessageBubbleProps) {
//   const isUser = role === "user";

//   return (
//     <div
//       className={`flex w-full mb-4 ${
//         isUser ? "justify-end" : "justify-start"
//       }`}
//     >
//       <div
//         className={`
//           max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm
//           ${
//             isUser
//               ? "bg-slate-900 text-white rounded-br-md"
//               : "bg-slate-200 text-slate-800 rounded-bl-md"
//           }
//         `}
//       >
//         {isUser ? (
//           <p className="whitespace-pre-wrap">{content}</p>
//         ) : (
//           <ReactMarkdown
//             components={{
//               p: ({ children }) => (
//                 <p className="mb-2 whitespace-pre-wrap">{children}</p>
//               ),
//               ul: ({ children }) => (
//                 <ul className="list-disc ml-5 mb-2 space-y-1">
//                   {children}
//                 </ul>
//               ),
//               ol: ({ children }) => (
//                 <ol className="list-decimal ml-5 mb-2 space-y-1">
//                   {children}
//                 </ol>
//               ),
//               li: ({ children }) => <li>{children}</li>,
//               strong: ({ children}) => (
//                 <strong className="font-semibold">{children}</strong>
//               ),
//               code: ({ children }) => (
//                 <code className="bg-slate-300 text-slate-900 px-1 py-0.5 rounded text-xs">
//                   {children}
//                 </code>
//               ),
//             }}
//           >
//             {content}
//           </ReactMarkdown>
//         )}
//       </div>
//     </div>
//   );
// }



"use client";

import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function MessageBubble({
  role,
  content,
}: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div
      className={`flex w-full mb-3 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`
          max-w-[85%] sm:max-w-[70%] 
          px-4 py-3 
          rounded-2xl 
          text-sm sm:text-base 
          leading-relaxed 
          shadow-sm
          ${
            isUser
              ? "bg-slate-900 text-white rounded-br-md"
              : "bg-slate-200 text-slate-800 rounded-bl-md"
          }
        `}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap break-words">
            {content}
          </p>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className="mb-2 whitespace-pre-wrap break-words">
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc ml-5 mb-2 space-y-1">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal ml-5 mb-2 space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="break-words">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold">{children}</strong>
              ),
              code: ({ children }) => (
                <code className="bg-slate-300 text-slate-900 px-1.5 py-0.5 rounded text-xs sm:text-sm break-words">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-slate-800 text-white p-3 rounded-lg overflow-x-auto text-xs sm:text-sm mb-2">
                  {children}
                </pre>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}
