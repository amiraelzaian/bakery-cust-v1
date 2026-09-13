import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Lovers_Quarrel } from "next/font/google";
import GoogleAuthProvider from "@/components/providers/GoogleProvider";

export const loversQuarrel = Lovers_Quarrel({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <GoogleAuthProvider>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          </GoogleAuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}