import "./globals.css";
import { Lovers_Quarrel } from "next/font/google";
import AppProviders from "@/components/providers/AppProviders";

export const loversQuarrel = Lovers_Quarrel({
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Golden Crumbs",
  description: "Fresh baked goods, delivered.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon0.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="custom-scrollbar">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}