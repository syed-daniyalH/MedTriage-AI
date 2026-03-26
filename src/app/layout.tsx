import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Outfit, Spectral } from "next/font/google";
import { TriageDemoProvider } from "@/context/TriageDemoContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-body"
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading"
});

export const metadata: Metadata = {
  title: "MedTriage AI | Clinical Triage Support System",
  description:
    "MedTriage AI is a clinical triage support system for patient assessment, priority prediction, and queue monitoring."
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spectral.variable}`}>
        <TriageDemoProvider>{children}</TriageDemoProvider>
      </body>
    </html>
  );
}
