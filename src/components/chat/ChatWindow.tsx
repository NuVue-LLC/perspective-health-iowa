"use client";

import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import Link from "next/link";
import { X, Phone } from "lucide-react";
import { ChatInput } from "./ChatInput";
import { LeadCaptureCard } from "./LeadCaptureCard";
import { getWelcomeMessage, type ChatMessage } from "@/lib/chatbot";

interface ChatWindowProps {
  onClose: () => void;
  pathname?: string;
}

function TypingIndicator() {
  return (
    <div className="flex items-start gap-2 mb-3">
      <div className="bg-sage-100 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[80%]">
        <div className="flex gap-1">
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce-dot" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}

function QuickReplies({
  suggestions,
  onSelect,
  disabled,
}: {
  suggestions: string[];
  onSelect: (text: string) => void;
  disabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-1.5 mb-3">
      {suggestions.map((text) => (
        <button
          key={text}
          onClick={() => onSelect(text)}
          disabled={disabled}
          className="rounded-full border border-purple/30 bg-purple/5 px-3 py-1 text-xs font-medium text-purple transition-colors hover:bg-purple/10 hover:border-purple/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {text}
        </button>
      ))}
    </div>
  );
}

// Parses text and converts internal paths like /services/hormone-health into clickable links
function parseMessageContent(text: string, isUser: boolean): ReactNode[] {
  const linkPattern = /((?:Learn more|More info|Details|Visit|See):?\s*)(\/[a-z0-9/-]+)/gi;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text)) !== null) {
    // Text before the match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const label = match[1];
    const path = match[2];
    // Build a friendly label from the path
    const pageName = path
      .split("/")
      .filter(Boolean)
      .pop()
      ?.replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()) || path;

    parts.push(label);
    parts.push(
      <Link
        key={match.index}
        href={path}
        className={`underline font-medium ${
          isUser ? "text-white" : "text-purple hover:text-purple/80"
        }`}
      >
        {pageName} →
      </Link>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <div className={`flex mb-3 ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-2xl px-4 py-2.5 max-w-[80%] text-sm leading-relaxed whitespace-pre-line ${
          isUser
            ? "bg-purple text-white rounded-tr-sm"
            : "bg-sage-100 text-charcoal rounded-tl-sm"
        }`}
      >
        {isUser ? message.content : parseMessageContent(message.content, false)}
      </div>
    </div>
  );
}

export function ChatWindow({ onClose, pathname }: ChatWindowProps) {
  const welcome = getWelcomeMessage(pathname);
  const welcomeMessage: ChatMessage = { role: "assistant", content: welcome.content };

  const [messages, setMessages] = useState<ChatMessage[]>([welcomeMessage]);
  const [suggestions, setSuggestions] = useState<string[]>(welcome.suggestions);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [liveMessage, setLiveMessage] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);

  // Count user messages (excluding welcome)
  const userMessageCount = messages.filter((m) => m.role === "user").length;
  const showCallbackPill = userMessageCount >= 1 && !showLeadForm && !leadSubmitted;

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm, scrollToBottom]);

  // Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // Focus trap — keep Tab cycling inside the chat window
  useEffect(() => {
    const el = windowRef.current;
    if (!el) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    el.addEventListener("keydown", handleTab);
    return () => el.removeEventListener("keydown", handleTab);
  }, []);

  const handleSend = async (content: string) => {
    const userMessage: ChatMessage = { role: "user", content };
    setMessages((prev) => [...prev, userMessage]);
    setSuggestions([]);
    setIsLoading(true);
    setError(null);

    try {
      const fetchStart = Date.now();

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...messages.filter((m) => m !== welcomeMessage),
            userMessage,
          ],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Ensure typing indicator shows for at least 600ms so it feels natural
      const elapsed = Date.now() - fetchStart;
      const minDelay = 600;
      if (elapsed < minDelay) {
        await new Promise((r) => setTimeout(r, minDelay - elapsed));
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setLiveMessage(data.message);

      if (data.suggestions && Array.isArray(data.suggestions)) {
        setSuggestions(data.suggestions);
      } else {
        setSuggestions([]);
      }

      // Show lead form if API says so and hasn't been submitted already
      if (data.showLeadForm && !leadSubmitted) {
        setShowLeadForm(true);
      }
    } catch {
      setError(
        "I'm having trouble connecting. Please try again or call our office for immediate help."
      );
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmitSuccess = () => {
    setShowLeadForm(false);
    setLeadSubmitted(true);
    const confirmMessage: ChatMessage = {
      role: "assistant",
      content:
        "Your request has been sent! A member of our team will be in touch within 1 business day. Is there anything else I can help you with in the meantime?",
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setSuggestions(["Our Services", "Hours & Location", "New Patient Info"]);
  };

  const handleLeadDismiss = () => {
    setShowLeadForm(false);
    const dismissMessage: ChatMessage = {
      role: "assistant",
      content:
        "No problem at all! Feel free to keep asking questions — I'm here to help. You can also reach us anytime at (515) 724-0377.",
    };
    setMessages((prev) => [...prev, dismissMessage]);
    setSuggestions(["Our Services", "Hours & Location", "Insurance"]);
  };

  const handleRequestCallback = () => {
    if (!leadSubmitted) {
      setShowLeadForm(true);
      const offerMessage: ChatMessage = {
        role: "assistant",
        content: "I'd be happy to have our team reach out! Just fill out the quick form below.",
      };
      setMessages((prev) => [...prev, offerMessage]);
      setSuggestions([]);
    }
  };

  return (
    <div
      ref={windowRef}
      role="dialog"
      aria-label="Chat with Perspective Health"
      className="fixed bottom-20 right-4 z-50 flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 animate-slide-up sm:w-[380px] sm:h-[520px] inset-2 sm:inset-auto sm:bottom-20 sm:right-4"
    >
      {/* Screen reader announcements */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {liveMessage}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between bg-purple text-white px-4 py-3 rounded-t-2xl flex-shrink-0">
        <div>
          <h2 className="font-semibold text-sm" id="chat-title">Perspective Health</h2>
          <p className="text-xs text-white/70">Ask us anything</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full p-1 hover:bg-purple/80 transition-colors"
          aria-label="Close chat"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {messages.map((msg, i) => (
          <MessageBubble key={i} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        {showLeadForm && (
          <LeadCaptureCard
            onSubmitSuccess={handleLeadSubmitSuccess}
            onDismiss={handleLeadDismiss}
          />
        )}
        {error && (
          <div className="mb-3 rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700">
            {error}
          </div>
        )}
        {suggestions.length > 0 && !isLoading && !showLeadForm && (
          <QuickReplies
            suggestions={suggestions}
            onSelect={handleSend}
            disabled={isLoading}
          />
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Request a Callback pill */}
      {showCallbackPill && (
        <div className="px-3 pb-1 flex justify-center">
          <button
            onClick={handleRequestCallback}
            className="flex items-center gap-1.5 rounded-full border border-purple/20 bg-purple/5 px-3 py-1 text-[11px] font-medium text-purple transition-colors hover:bg-purple/10 hover:border-purple/40"
          >
            <Phone className="h-3 w-3" />
            Request a Callback
          </button>
        </div>
      )}

      {/* Input */}
      <ChatInput onSend={handleSend} disabled={isLoading || showLeadForm} />
    </div>
  );
}
