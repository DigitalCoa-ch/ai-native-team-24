import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ICN | AI for a Better World",
  description: "ICN Team Homepage — Contributing to a better world using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}