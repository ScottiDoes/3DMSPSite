import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { SceneProvider } from "@/context/SceneContext";
import LenisProvider from "@/components/LenisProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nevada James Endpoint Partners — NinjaOne EMM Migrations for SLED",
  description:
    "Enterprise EMM migrations onto NinjaOne for State, Local & Education organizations — workflows, automations, and reporting intact. By Nevada James Endpoint Partners.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* Tailwind v4's PostCSS strips backdrop-filter from .css files,
            so we inject it here as a raw style tag it cannot touch. */}
        <style dangerouslySetInnerHTML={{ __html: `
          .glass-card {
            backdrop-filter: blur(32px) saturate(160%);
            -webkit-backdrop-filter: blur(32px) saturate(160%);
          }
        ` }} />
      </head>
      <body>
        <SceneProvider>
          <LenisProvider>{children}</LenisProvider>
        </SceneProvider>
      </body>
    </html>
  );
}
