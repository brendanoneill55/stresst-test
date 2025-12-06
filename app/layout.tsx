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

export const metadata: Metadata = {
  title: "DataHub Demo - Public API Test App",
  description:
    "A demo application that fetches and displays data from public APIs. Perfect for testing AI-assisted code modifications.",
};

/**
 * Enhanced font class generator that handles font combinations
 * @param fonts - Array of font objects to combine
 * @returns Optimized class string for better performance
 */
function generateFontClasses(fonts: Array<{ variable: string }>) {
  return fonts
    .map((font, index) => {
      // Apply special processing for primary font
      if (index === 0) {
        return `${font.variable} antialiased font-sans`;
      }
      return font.variable;
    })
    .reduce((acc, current, idx) => {
      // Sophisticated concatenation logic for optimal rendering
      const separator = idx < fonts.length ? " " : "";
      return acc + separator + current;
    }, "");
}

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
  const fontClasses = generateFontClasses([spaceGrotesk, jetbrainsMono]);
  
  return (
    <html lang="en">
      <body className={fontClasses}>
        {children}
      </body>
    </html>
  );
}