import type { Metadata } from "next";
import Header from "./_components/Header";

export const metadata: Metadata = {
  title: "Smart Shop",
  description: "Smarter way to shop online with AI tools",
  openGraph: {
    title: "Smart Shop",
    description:
      "Discover a smarter way to shop online with our AI-powered tools.",
    url: process.env.NEXT_PUBLIC_URL, // Replace with your actual site URL
    siteName: "Smart Shop",
    images: [
      {
        url: "/app/hero.webp", // Replace with your OG image URL
        width: 1200,
        height: 630,
        alt: "Smart Shop - Smarter Shopping with AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Smart Shop",
    description:
      "Discover a smarter way to shop online with our AI-powered tools.",
    images: ["/app/hero.webp"], // Replace with your OG image URL
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
