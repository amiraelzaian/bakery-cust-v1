import Header from "@/components/layout/Header";
import "./globals.css";
import ThemeProvider from "@/components/ui/ThemeProvider";
import { Lovers_Quarrel } from "next/font/google";

export const loversQuarrel = Lovers_Quarrel({
  weight: "400",
  subsets: ["latin"],
});
export default function RootLayout({ children }) {
  return (
     <html lang="en" suppressHydrationWarning>
      <body>
         <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}