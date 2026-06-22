# BlinkAI

## Project Overview

BlinkAI is a modern AI chat application designed to deliver fast, clean, and distraction-free conversations with an AI assistant.

Unlike traditional chat platforms that focus on accounts, chat history, and complex dashboards, BlinkAI follows a stateless architecture that prioritizes speed, simplicity, and user experience.

The application provides real-time AI responses, streaming output, markdown rendering, syntax highlighting, and a polished premium interface.

This project demonstrates:

* AI-powered conversational interfaces
* Real-time response streaming
* Modern frontend architecture
* Stateless application design
* Responsive UI/UX development
* API integration with Large Language Models

---

# Live Deployment

## Public Working URL

https://blink-ai-sigma.vercel.app/
---

# Why BlinkAI

Many AI chat applications become cluttered with:

* Complex navigation
* User account management
* Large chat histories
* Unnecessary features

BlinkAI focuses on a simple goal:

> Ask a question and receive an AI response as quickly as possible.

The result is a lightweight and distraction-free AI experience.

---

# Core Features

## AI Chat Interface

Users can interact with an AI assistant through a clean and responsive chat interface.

---

## Real-Time Streaming Responses

Responses are streamed token-by-token, creating a more natural and interactive experience.

---

## Markdown Rendering

AI responses support:

* Headings
* Lists
* Tables
* Code blocks
* Rich text formatting

---

## Syntax Highlighting

Code snippets are automatically formatted and highlighted for improved readability.

---

## Copy Response Support

Users can instantly copy AI-generated responses with a single click.

---

## Smart Chat Experience

The application includes:

* Auto-scrolling messages
* Typing indicators
* Auto-resizing input field
* Smooth message animations
* Loading states

---

## Responsive Design

BlinkAI is fully responsive and optimized for:

* Desktop
* Tablet
* Mobile devices

---

# Application Workflow

The system performs the following steps:

1. User enters a prompt
2. Request is sent to the AI API
3. AI generates a response
4. Response is streamed in real time
5. Markdown is rendered
6. User can copy or continue the conversation

---

# System Architecture

```text
User Prompt
      ↓
Next.js Frontend
      ↓
API Route
      ↓
Groq API
      ↓
LLM Processing
      ↓
Streaming Response
      ↓
BlinkAI Interface
```

---

# Tech Stack

## Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

---

## AI

* Groq API
* Llama 3.1 8B Instant

---

## UI Libraries

* React Markdown
* React Syntax Highlighter

---

## Deployment

* Vercel

---

# Project Structure

```text
app/
│
├── api/
│   └── chat/
│
├── page.tsx
│
components/
│
├── ChatContainer.tsx
├── ChatInput.tsx
├── MessageBubble.tsx
├── typingIndicator.tsx
│
public/
│
└── README.md
```

---

# Key Engineering Concepts Used

* Large Language Models (LLMs)
* AI API Integration
* Streaming Responses
* Component-Based Architecture
* Stateless Design
* Markdown Parsing
* Syntax Highlighting
* Responsive UI Development

---

# Challenges Solved

* Real-time response streaming
* Smooth chat experience
* Markdown rendering
* Code syntax highlighting
* Auto-scroll behavior
* Loading and typing states
* Responsive interface design

---

# Author

## Shania Mansoori

---

# Support

If you found this project useful, consider giving it a star on GitHub.
