'use client';

import Image from "next/image";
import Link from "next/link";
import { 
  BookCover, 
  BrandBadge, 
  IllustrationFrame, 
  BookTitle, 
  Subtitle, 
  AuthorByline,
  CreditLine 
} from "@/components/ui/book-cover";
import { useState, useEffect } from "react";
import VortexSpinnerComponent from "@/components/ui/vortex-spinner";
import styled from "styled-components";

// Create a grunge overlay component for wear & tear effect
const GrungeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/cover-grunge-texture.jpg');
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply; /* Only shows dark areas for wear & tear effect */
  opacity: 0.45; /* Reduced from 0.75 to be more subtle */
  pointer-events: none;
  z-index: 500; /* Increased to ensure it's above all content elements */
`;

// Wrapper to constrain the grunge overlay to the book dimensions
const BookWrapper = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Full-page loading overlay
const LoadingOverlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  inset: 0;
  background-color: #000235;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  opacity: ${props => props.$isVisible ? 1 : 0};
  visibility: ${props => props.$isVisible ? 'visible' : 'hidden'};
  transition: opacity 0.5s ease-out, visibility 0.5s ease-out;
  overflow: hidden;
`;

// Content container with fade-in animation
const ContentContainer = styled.div<{ $isVisible: boolean }>`
  opacity: ${props => props.$isVisible ? 1 : 0};
  transition: opacity 0.5s ease-in;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Pre-select a random image on the server side
const heroImages = [
  "/hero-image.webp",
  "/hero-image-2.png",
  "/hero-image-3.webp",
  "/hero-image-4.webp",
  "/hero-image-5.webp",
  "/hero-image-6.webp"
];

// Characters for the Matrix effect (binary, tech symbols, etc.)
const MATRIX_CHARS = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモ♯$%&#!?><@⚡︎★";

// Use client-side only component to prevent hydration errors
// Note: useEffect and useState are already imported above

const MatrixColumn = ({ count = 15 }: { count?: number }) => {
  // Add state to store the generated characters
  const [chars, setChars] = useState<string[]>([]);
  
  // Generate characters only on the client side to avoid hydration mismatch
  useEffect(() => {
    // Randomly choose a character set focus for this column (more binary, more katakana, etc.)
    const columnType = Math.floor(Math.random() * 4);
    
    const generatedChars = Array.from({ length: count }, (_, i) => {
      // Create patterns where some columns favor certain character types
      if (columnType === 0 && Math.random() > 0.3) {
        // Binary-focused column (0s and 1s)
        return Math.random() > 0.5 ? "0" : "1";
      } else if (columnType === 1 && Math.random() > 0.4) {
        // Katakana-focused column
        const katakanaStart = MATRIX_CHARS.indexOf("ア");
        const katakanaEnd = MATRIX_CHARS.indexOf("モ");
        const randomIndex = katakanaStart + Math.floor(Math.random() * (katakanaEnd - katakanaStart));
        return MATRIX_CHARS.charAt(randomIndex);
      } else if (columnType === 2 && Math.random() > 0.5) {
        // Symbols-focused column
        const symbolStart = MATRIX_CHARS.indexOf("♯");
        return MATRIX_CHARS.charAt(symbolStart + Math.floor(Math.random() * (MATRIX_CHARS.length - symbolStart)));
      } else {
        // Mixed column (completely random)
        return MATRIX_CHARS.charAt(Math.floor(Math.random() * MATRIX_CHARS.length));
      }
    });
    
    setChars(generatedChars);
  }, [count]);
  
  // Return empty spans during server-side rendering to prevent hydration mismatches
  // Only show actual characters when they've been generated client-side
  return (
    <div className="matrix-column">
      {chars.length > 0 ? 
        chars.map((char, index) => (
          <span key={index} className="matrix-character">{char}</span>
        )) : 
        Array.from({ length: count }).map((_, index) => (
          <span key={index} className="matrix-character"></span>
        ))
      }
    </div>
  );
};

export default function Home() {
  // Define state for the hero image and loading state
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  // Track all required assets for complete loading
  useEffect(() => {
    // Handle font loading for better typography rendering
    const loadFonts = async () => {
      if (typeof document === 'undefined') return;
      
      try {
        // Create a link for the custom fonts
        const fontLink = document.createElement('link');
        fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&family=Silkscreen&display=swap';
        fontLink.rel = 'stylesheet';
        document.head.appendChild(fontLink);
        
        // Check if the browser supports the font loading API
        if ('fonts' in document) {
          await document.fonts.ready;
          setFontsLoaded(true);
        } else {
          // Fallback for browsers without font loading API
          setTimeout(() => setFontsLoaded(true), 1000);
        }
      } catch (error) {
        console.warn('Font loading issue:', error);
        setFontsLoaded(true); // Continue anyway
      }
    };
    
    loadFonts();
  }, []);

  // Choose a random hero image on component mount
  useEffect(() => {
    // Select a random image
    const randomIndex = Math.floor(Math.random() * heroImages.length);
    const selectedImage = heroImages[randomIndex];
    
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      // Preload the image
      const img = new window.Image();
      img.src = selectedImage;
      
      img.onload = () => {
        // Once the image is loaded, update state
        setHeroImage(selectedImage);
        setIsLoading(false);
      };
      
      img.onerror = () => {
        console.warn('Image loading error. Proceeding anyway.');
        setHeroImage(selectedImage);
        setIsLoading(false);
      };
    } else {
      // Server-side or during hydration, just set the image
      setHeroImage(selectedImage);
      setIsLoading(false);
    }
    
    // Fallback in case onload doesn't trigger
    const timer = setTimeout(() => {
      if (isLoading) {
        setHeroImage(selectedImage);
        setIsLoading(false);
      }
    }, 1500); // Increased from 500ms to give image more time to load
    
    return () => clearTimeout(timer);
  }, []); // Run once on mount

  // Check if all assets are loaded and show content
  useEffect(() => {
    if (!isLoading && fontsLoaded) {
      // Add a small delay to ensure smooth transitions
      const timer = setTimeout(() => {
        setContentVisible(true);
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, fontsLoaded]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      {/* Full-page loading overlay with spinner */}
      <LoadingOverlay $isVisible={!contentVisible}>
        <div className="w-full h-full">
          <VortexSpinnerComponent fullScreen={true} />
        </div>
      </LoadingOverlay>
      
      <ContentContainer $isVisible={contentVisible}>
        <div className="w-full h-[95vh] flex flex-col items-center justify-center gap-6">
          <div className="w-full h-full max-h-[95vh] flex items-center justify-center">
            {/* Use BookWrapper to constrain GrungeOverlay */}
            <BookWrapper>
              <GrungeOverlay />
              <BookCover className="h-full w-auto">
                <div className="relative flex flex-col h-full">
                  {/* Floating Brand Badge */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
                    <BrandBadge />
                  </div>

                  {/* Content Layout */}
                  <div className="flex flex-col h-full pt-20">
                    {/* Text Section */}
                    <div className="text-center px-6 sm:px-8 pb-6">
                      <Subtitle>
                        YOU'RE THE STAR OF THE STORY!<br />
                        CHOOSE FROM 42 POSSIBLE ENDINGS.
                      </Subtitle>
                      
                      <BookTitle>
                        YOU ARE A<br />
                        SOFTWARE ENGINEER
                      </BookTitle>

                      <AuthorByline>by Douglas MacKrell</AuthorByline>
                    </div>

                    {/* Illustration Section */}
                    <div className="flex-grow px-6 sm:px-12 pb-1">
                      <div className="h-[95%]">
                        <IllustrationFrame className="h-full">
                          {heroImage && (
                            <Image
                              src={heroImage}
                              alt="Retro cyberpunk scene with programmer"
                              fill
                              sizes="(max-width: 768px) 100vw, 50vw"
                              style={{ objectFit: 'cover' }}
                              priority
                              className="z-0"
                            />
                          )}
                          {/* Classic CYOA illustration overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                        </IllustrationFrame>
                      </div>
                      <CreditLine>Copyright © 2024 by Douglas MacKrell • All rights reserved</CreditLine>
                    </div>
                  </div>
                </div>
              </BookCover>
            </BookWrapper>
          </div>

          {/* CTA Button */}
          <Link 
            href="/start" 
            className="bg-red-600 text-white text-xl sm:text-2xl px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            BEGIN YOUR ADVENTURE
          </Link>
        </div>
      </ContentContainer>
    </main>
  );
}
