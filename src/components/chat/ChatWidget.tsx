"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./ChatWindow";

const NUDGE_DELAY = 8000; // 8 seconds

function getNudgeMessage(pathname: string): string {
  if (pathname.startsWith("/services/")) return "Want to know if this service is right for you?";
  if (pathname === "/services") return "Need help finding the right service?";
  if (pathname === "/insurance") return "Not sure if we take your insurance?";
  if (pathname === "/about") return "Want to learn more about our providers?";
  if (pathname === "/contact") return "Need quick answers before reaching out?";
  if (pathname === "/for-patients") return "First visit? I can walk you through it!";
  return "Need help finding the right service?";
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // Reset nudge dismissed state when navigating to a new page
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      setNudgeDismissed(false);
      setShowNudge(false);
    }
  }, [pathname]);

  useEffect(() => {
    // Don't show nudge if chat is open or already dismissed on this page
    if (isOpen || nudgeDismissed) {
      setShowNudge(false);
      return;
    }

    const timer = setTimeout(() => {
      setShowNudge(true);
    }, NUDGE_DELAY);

    return () => clearTimeout(timer);
  }, [isOpen, nudgeDismissed, pathname]);

  const handleOpen = () => {
    setIsOpen(true);
    setShowNudge(false);
    setNudgeDismissed(true);
  };

  return (
    <>
      {isOpen && (
        <ChatWindow
          onClose={() => setIsOpen(false)}
          pathname={pathname}
        />
      )}

      {/* Proactive nudge bubble */}
      {showNudge && !isOpen && (
        <div className="fixed bottom-20 right-4 z-50 animate-slide-up">
          <div className="relative bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-3 max-w-[220px]">
            <button
              onClick={handleOpen}
              className="text-sm text-charcoal text-left leading-snug"
            >
              <span className="font-medium text-purple">{getNudgeMessage(pathname)}</span>
            </button>
            {/* Triangle pointer */}
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-200 transform rotate-45" />
          </div>
        </div>
      )}

      <button
        onClick={() => {
          if (isOpen) {
            setIsOpen(false);
          } else {
            handleOpen();
          }
        }}
        className={`fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-charcoal hover:bg-charcoal-light"
            : "bg-purple hover:bg-purple/90 animate-pulse-soft"
        }`}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-7 w-7 text-white" />
        )}
      </button>
    </>
  );
}
