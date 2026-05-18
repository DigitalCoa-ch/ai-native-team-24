import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Native Team 24",
  description: "AI Native Enterprise Lab - Team 24",
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