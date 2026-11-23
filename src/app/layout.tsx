import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayasree Online",
  description: "The Jayasree ecosystem — Law Books, Advocate's Diary, and Legal Digest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F4EFEB] text-[#161412] antialiased">
        {children}
      </body>
    </html>
  );
}
