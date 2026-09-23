"use client";

import ThemeProvider from "@/components/ui/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import GoogleAuthProvider from "@/components/providers/GoogleProvider";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Toaster } from "sonner";

export default function AppProviders({ children }) {
  return (
    <QueryProvider>
      <GoogleAuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ScrollToTop />
          <Toaster
            richColors
            position="top-center"
            toastOptions={{
              classNames: {
                toast: "bg-card! text-card-foreground! border-border! shadow-lg!",
                title: "text-foreground!",
                description: "text-muted-foreground!",
              },
            }}
          />
        </ThemeProvider>
      </GoogleAuthProvider>
    </QueryProvider>
  );
}