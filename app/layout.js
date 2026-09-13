import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import QueryProvider from "@/components/providers/QueryProvider";
import { Lovers_Quarrel } from "next/font/google";

export const loversQuarrel = Lovers_Quarrel({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}