import Header from "@/components/layout/Header";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Lovers_Quarrel } from "next/font/google";
import QueryProvider from "@/components/providers/QueryProvider";

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
          <Header />
          {children}
        </ThemeProvider>
      </QueryProvider>
      </body>
    </html>
  );
}