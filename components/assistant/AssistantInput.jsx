import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function AssistantInput({ onSend, disabled = false }) {
  const [value, setValue] = useState("");
  const ref = useRef(null);

  // auto-grow
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  }, [value]);

  // refocus after the assistant replies
  useEffect(() => {
    if (!disabled) ref.current?.focus();
  }, [disabled]);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border bg-card p-3 sm:p-4">
      <div className="mx-auto flex w-full items-end gap-2 rounded-2xl border border-border bg-background p-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10">
        <textarea
          ref={ref}
          dir="auto"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          rows={1}
          maxLength={1000}
          placeholder="Ask me anything..."
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
        />
        <button
          type="button"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
      <p className="mx-auto mt-2 w-ful px-2 text-center text-xs text-muted-foreground">
        Press Enter to send · Shift + Enter for a new line
      </p>
    </div>
  );
}