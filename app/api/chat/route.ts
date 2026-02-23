// this is the api route that connects your app to OpenAI 
// and returns an AI response 

import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if(!message) {
      return NextResponse.json(
        {error: "Message is required"},
        {status: 400}
      );
    }

    const completion = await groq.chat.completions.create({
      model:  "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `
            Rules: 
            - Never sound rude or robotic.
            - Always use clear spacing between paragraphs.
            - Always use simple language.
            - Use bullet points when explaining lists.
            - Keep answers short (3-6 lines) as long as the user does not demand for long answers.
            - Sound conversational, friendly and supportive.
            - Avoid very long paragraphs.
            - Make the response visually clean and easy to read.
            - Don't use abusive language.
            - Use proper markdown bullet lists using "-" not "*"

          `,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return NextResponse.json({
      reply: completion.choices[0]?.message?.content || "No response",
    });
    
  } catch (error: any) {
    console.error("Groq Error:", error?.message || error);

    return NextResponse.json(
      {error: "Something went wrong"},
      {status: 500}
    )
    
  }
}