import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Geosport Shield | Crisis Dashboard Prototype",
  description: "Level 2 prototype for Geosport Shield - AI-powered geopolitical risk assessment for sports events",
};

export default function ShieldLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
