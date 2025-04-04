'use client';

import Image from "next/image";
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
import styled from "styled-components";
import Link from "next/link";

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

// Content container with fade-in animation
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Start button to enter the book
const StartButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #8d5fc9;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  font-weight: bold;
  z-index: 600;
  border: 2px solid #6b419f;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
  
  &:hover {
    background-color: #6b419f;
  }
`;

// Fixed cover image path
const HERO_IMAGE = "/hero-image.png";

export default function CoverPage() {
  // Single state for mounted to handle client-side only content
  const [mounted, setMounted] = useState(false);
  
  // Set mounted state to handle client-side only content
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <ContentContainer>
        <div className="w-full h-[95vh] flex flex-col items-center justify-center">
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
                        YOU&apos;RE THE STAR OF THE STORY!<br />
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
                          {mounted && (
                            <Image
                              src={HERO_IMAGE}
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
              <Link href="/" passHref>
                <StartButton>OPEN THE BOOK</StartButton>
              </Link>
            </BookWrapper>
          </div>
        </div>
      </ContentContainer>
    </main>
  );
} 