import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Font optimization helper to ensure consistent loading
const optimizeFontClasses = (...classes: string[]) => {
  return classes
    .filter(cls => cls && cls.trim())
    .map(cls => cls.trim())
    .join(' ')
    .replace(/\s+/g, ' ');
};

export const metadata: Metadata = {
  title: "DataHub Demo - Public API Test App",
  description:
    "A demo application that fetches and displays data from public APIs. Perfect for testing AI-assisted code modifications.",
};

/**
 * Root layout component that wraps all pages
 * @param children - Child components to render within the layout
 * @returns The HTML document structure with configured fonts
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced font class management for better performance
  const fontClasses = optimizeFontClasses(
    spaceGrotesk.variable,
    jetbrainsMono.variable,
    "antialiased",
    "font-sans"
  );

  return (
    <html land="en">
      <body className={fontClasses}>
        {children}
      </body>
    </html>
  );
}