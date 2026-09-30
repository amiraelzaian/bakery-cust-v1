import { Bot, User, CreditCard } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Link from "next/link";

const linkClass =
  "font-medium text-primary underline underline-offset-2 transition hover:opacity-80";

export default function AssistantMessage({ message }) {
  const isUser = message.role === "user";

  const bubbleClass = isUser
    ? "rounded-tr-md bg-primary text-primary-foreground"
    : message.isError
      ? "rounded-tl-md border border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
      : "rounded-tl-md border border-border bg-background text-foreground";

  return (
    <div className={`flex items-start gap-3 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Bot size={18} />
        </div>
      )}

      <div className="flex max-w-[85%] flex-col gap-2 ">
        <div dir="auto" className={`rounded-2xl py-1.5 px-8  text-sm leading-6 ${bubbleClass} `}>
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              components={{
                p: ({ children }) => (
                  <p dir="auto" className="mb-4 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-card-foreground">{children}</strong>
                ),
                ul: ({ children }) => (
                  <ul className="mb-4 ms-5 list-disc space-y-1 last:mb-0">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="mb-4 ms-5 list-decimal space-y-1 last:mb-0">{children}</ol>
                ),
                li: ({ children }) => <li dir="auto">{children}</li>,
                table: ({ children }) => (
                  <div className="mb-4 overflow-x-auto last:mb-0">
                    <table className="w-full border-collapse text-sm">{children}</table>
                  </div>
                ),
                th: ({ children }) => (
                  <th className="border border-border bg-muted px-3 py-2 text-start font-semibold">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="border border-border px-3 py-2">{children}</td>
                ),
                a: ({ href, children }) => {
                  // Product link -> internal Next.js navigation
                  const match = href?.match(/\/explore\/([^/?#]+)/);
                  if (match) {
                    return (
                      <Link href={`/explore/${match[1]}`} className={linkClass}>
                        {children}
                      </Link>
                    );
                  }
                  // External link
                  return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                      {children}
                    </a>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          )}
        </div>

        {message.payment?.url && (
          <a
            href={message.payment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            <CreditCard size={16} />
            Pay now
          </a>
        )}
      </div>

      {isUser && (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
          <User size={18} />
        </div>
      )}
    </div>
  );
}