import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { PageArrows } from "@/components/PageArrows";
import { PageTransition } from "@/components/PageTransition";
import { NavDirectionProvider } from "@/components/NavDirectionContext";
import { SocialLinks } from "@/components/SocialLinks";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Scrollytelling Portfolio",
  description: "A high-end personal portfolio built with Next.js and Canvas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-[#121212] text-white`}>
        <NavDirectionProvider>
          <CustomCursor />
          <Navbar />
          <PageArrows />
          <SocialLinks />
          <PageTransition>{children}</PageTransition>
        </NavDirectionProvider>
      </body>
    </html>
  );
}
