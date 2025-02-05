import type { Metadata } from "next";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Smart Shop",
  description: "Shop Smarter with AI-Powered Recommendations",
  icons: {
    icon: "/icons/favicon.ico",
    shortcut: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="grid grid-rows-[auto,1fr] min-h-screen">
      <Header />
      {children}
    </div>
  );
}
