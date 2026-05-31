import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY;

if (!apiKey) {
  throw new Error("GROQ_API_KEY is missing in environment variables");
}

const groq = new Groq({
  apiKey,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string") {
      return new Response("Message is required", { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",

      messages: [
        {
          role: "system",
          content: `
You are BlinkAI, a premium AI assistant designed for speed, clarity, and modern UX-style responses.

Core behavior rules:
- Respond in a clean, structured, visually scannable format.
- Use Markdown properly (headings, bullets, code blocks where needed).
- Prefer short paragraphs instead of long walls of text.
- Use bullet points for explanations and steps.
- Keep tone confident, friendly, modern, and minimal — like a high-end AI product.
- Avoid repetition and filler phrases.
- If the user asks something technical, explain step-by-step.
- If the user asks something simple, respond briefly and directly.
- Never end responses abruptly; always complete the thought naturally.
- If code is required, format it cleanly and production-ready.
`,
        },
        {
          role: "user",
          content: message,
        },
      ],

      temperature: 0.7,
      max_tokens: 1200,
      stream: true,
    });

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of completion) {
            // safer extraction
            const content = chunk?.choices?.[0]?.delta?.content;

            if (!content || typeof content !== "string") continue;

            controller.enqueue(encoder.encode(content));
          }
        } catch (err) {
          console.error("Stream error:", err);

          controller.enqueue(
            encoder.encode("\n\n Response interrupted. Please try again."),
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Groq API Error:", error);

    return new Response(
      JSON.stringify({
        error: "Failed to generate response",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
