import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Lovers_Quarrel } from "next/font/google";
import GoogleAuthProvider from "@/components/providers/GoogleProvider";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/layout/ScrollToTop";

export const loversQuarrel = Lovers_Quarrel({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="custom-scrollbar">
      <body>
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
      </body>
    </html>
  );
}