"use client";
import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Bot, Sparkles, RotateCcw } from "lucide-react";

import { useAssistant } from "@/hooks/useAssistant";
import AssistantMessage from "./AssistantMessage";
import AssistantInput from "./AssistantInput";
import TypingIndicator from "./TypingIndicator";

const STORAGE_KEY = "golden-crumbs-assistant";
const MAX_HISTORY = 30;

const SUGGESTIONS = [
  { icon: "🍰", label: "Browse products", text: "What products do you have?" },
  { icon: "🗂️", label: "Categories", text: "What categories do you have?" },
  { icon: "🛒", label: "My cart", text: "What's in my cart?" },
  { icon: "❤️", label: "My wishlist", text: "Show my wishlist" },
  { icon: "🧾", label: "Checkout", text: "I want to place my order" },
  { icon: "📦", label: "My orders", text: "Show my orders" },
];

export default function AssistantChat() {
  const [messages, setMessages] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const endRef = useRef(null);
  const queryClient = useQueryClient();
  const { sendMessage, isPending } = useAssistant();

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) setMessages(JSON.parse(saved));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {}
  }, [messages, hydrated]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isPending]);

  // Keep the rest of the site in sync with what the assistant changed.
  // Replace these query keys with the ones your cart/wishlist/orders hooks use.
  const syncSite = (actions = []) => {
    const types = new Set(actions.map((a) => a.type));
    if (types.has("cart_updated")) queryClient.invalidateQueries({ queryKey: ["cart"] });
    if (types.has("wishlist_updated")) queryClient.invalidateQueries({ queryKey: ["wishlist"] });
    if (types.has("orders_updated")) queryClient.invalidateQueries({ queryKey: ["orders"] });
  };

  const handleSend = async (content) => {
    const text = content.trim();
    if (!text || isPending) return;

    const history = messages
      .filter((m) => !m.isError)
      .slice(-MAX_HISTORY)
      .map(({ role, content }) => ({ role, content }));

    setMessages((prev) => [...prev, { role: "user", content: text }]);

    try {
      const data = await sendMessage({ message: text, history });
      const actions = data?.actions || [];
      syncSite(actions);

      const payment = actions.find((a) => a.type === "payment_required");
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data?.reply || "Sorry, I couldn't generate a response. Please try again.",
          payment: payment ? { url: payment.url } : undefined,
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          isError: true,
          content: err?.message || "Something went wrong. Please try again.",
        },
      ]);
    }
  };

  const handleReset = () => {
    setMessages([]);
    sessionStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden  bg-card shadow-sm">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-border px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Bot size={21} />
          </div>
          <div>
            <h2 className="font-semibold text-card-foreground">Golden Crumbs Assistant</h2>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Online
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={handleReset}
              disabled={isPending}
              className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-foreground disabled:opacity-50"
            >
              <RotateCcw size={13} />
              New chat
            </button>
          )}
         
        </div>
      </div>

            {/* messagess */}
      <div className="custom-scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-5">
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Bot size={32} />
            </div>
            <h3 className="text-lg font-semibold text-card-foreground">Welcome to Golden Crumbs!</h3>
            <p className="mt-2  text-sm leading-6 text-muted-foreground">
              I can find products, manage your cart and wishlist, place orders and track them.
            </p>

            <div className="mt-6 grid w-full  gap-2 sm:grid-cols-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  onClick={() => handleSend(s.text)}
                  className="cursor-pointer rounded-xl border border-border bg-background px-4 py-3 text-left text-sm transition hover:border-primary hover:bg-primary/5"
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mx-auto flex w-full flex-col gap-4">
            {messages.map((message, index) => (
              <AssistantMessage key={`${message.role}-${index}`} message={message} />
            ))}
            {isPending && <TypingIndicator />}
            <div ref={endRef} />
          </div>
        )}
      </div>

      {/* Quick actions */}
      {messages.length > 0 && (
        <div className="custom-scrollbar flex shrink-0 gap-2 overflow-x-auto border-t border-border px-4 py-2">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              type="button"
              disabled={isPending}
              onClick={() => handleSend(s.text)}
              className="shrink-0 rounded-full border border-border bg-background px-3 py-1.5 text-xs transition hover:border-primary hover:bg-primary/5 disabled:opacity-50"
            >
              {s.icon} {s.label}
            </button>
          ))}
        </div>
      )}

      {/* Input (pinned to the bottom of the card) */}
      <div className="shrink-0">
        <AssistantInput onSend={handleSend} disabled={isPending} />
      </div>
    </div>
  );
}