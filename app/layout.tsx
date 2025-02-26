import type { Metadata } from "next";
import { EB_Garamond } from "next/font/google";
import Image from "next/image";
import { StyledComponentsRegistry } from "./registry";
import "./globals.css";

const garamond = EB_Garamond({ 
  subsets: ["latin"],
  display: "swap",
  variable: "--font-garamond",
});

export const metadata: Metadata = {
  title: "Trial of the Cyberspace Supercomputer Software Engineer",
  description: "A Choose Your Own Adventure Portfolio by Douglas MacKrell",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/android-chrome-192x192.png",
        sizes: "192x192"
      },
      {
        rel: "android-chrome",
        url: "/android-chrome-512x512.png",
        sizes: "512x512"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.cdnfonts.com/css/itc-benguiat-std"
          rel="stylesheet"
        />
        {/* Preload hero images to improve initial load times */}
        <link rel="preload" href="/hero-image.webp" as="image" />
        <link rel="preload" href="/hero-image-2.png" as="image" />
        <link rel="preload" href="/hero-image-3.webp" as="image" />
        <link rel="preload" href="/hero-image-4.webp" as="image" />
        <link rel="preload" href="/hero-image-5.webp" as="image" />
        <link rel="preload" href="/hero-image-6.webp" as="image" />
      </head>
      <body className={`${garamond.variable} relative min-h-screen`}>
        <StyledComponentsRegistry>
          {/* Background Image */}
          <div className="fixed inset-0 w-full h-full z-0 blur-[2px]">
            <Image
              src="/Background_image_01.webp"
              alt="Retro cyberpunk background"
              fill
              priority
              className="object-cover"
              quality={100}
            />
            {/* Adjusted overlay with slight blur and darker opacity */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            {children}
          </div>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
