import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/Navbar";
import { CustomCursor } from "@/components/CustomCursor";
import { PageArrows } from "@/components/PageArrows";
import { NavDirectionProvider } from "@/components/NavDirectionContext";
import { SocialLinks } from "@/components/SocialLinks";
import { SpaceBackground } from "@/components/SpaceBackgroundLazy";
import { HeroLoadingProvider } from "@/components/HeroLoadingContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { MobilePanelProvider } from "@/components/MobilePanelContext";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Ravindra Singh | Software Developer",
  description: "Portfolio of Ravindra Singh Shekhawat - Full-Stack & GenAI Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/galaxy-model.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-[#000000] text-white`}>
        <NavDirectionProvider>
          <HeroLoadingProvider>
            <MobilePanelProvider>
              <SpaceBackground />
              <CustomCursor />
              <Navbar />
              <PageArrows />
              <SocialLinks />
              <LoadingScreen />
              {children}
            </MobilePanelProvider>
          </HeroLoadingProvider>
        </NavDirectionProvider>
      </body>
    </html>
  );
}
