"use client";

import { useRouter } from "next/navigation";

export default function MainButton({
  children,
  className = "",
  path,
  ...props
}) {
  const router = useRouter();

  return (
    <button
     suppressHydrationWarning
      onClick={() => router.push(path)}
      className={`w-full cursor-pointer rounded-xl bg-primary px-4 py-3 font-bold transition hover:opacity-90 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}