import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { PageArrows } from "@/components/PageArrows";
import { NavDirectionProvider } from "@/components/NavDirectionContext";
import { SocialLinks } from "@/components/SocialLinks";
import { SpaceBackground } from "@/components/SpaceBackground";
import { HeroLoadingProvider } from "@/components/HeroLoadingContext";
import { LoadingScreen } from "@/components/LoadingScreen";
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
      <body className={`${inter.variable} font-sans antialiased bg-[#000000] text-white`}>
        <NavDirectionProvider>
          <HeroLoadingProvider>
            <SpaceBackground />
            <CustomCursor />
            <Navbar />
            <PageArrows />
            <SocialLinks />
            <LoadingScreen />
            {children}
          </HeroLoadingProvider>
        </NavDirectionProvider>
      </body>
    </html>
  );
}
