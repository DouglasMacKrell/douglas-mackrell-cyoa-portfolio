'use client';

/**
 * Book Layout Component
 * 
 * This component creates a two-page spread layout for the book interface,
 * simulating an open book with left and right pages. It handles the overall
 * dimensions and positioning of the book within the viewport.
 */

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import styled from 'styled-components'

interface BookLayoutProps {
  leftPage?: ReactNode
  rightPage: ReactNode
  className?: string
}

// Main book container with proper dimensions
const BookContainer = styled.div`
  position: relative;
  max-height: 95vh;
  height: 95vh;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1500px; /* For 3D page turn effect */
`;

// Book spread container with shadow effects
const BookSpread = styled.div`
  display: flex;
  height: 95vh;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  background-color: #d0c8b0; /* Book binding color */
  position: relative;
  transform-style: preserve-3d;
  
  /* Book binding effect in the middle */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.2) 50%,
      rgba(0, 0, 0, 0.1)
    );
    z-index: 2;
  }
`;

// Grunge overlay for worn book effect
const GrungeOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-image: url('/cover-grunge-texture.jpg');
  background-size: cover;
  background-position: center;
  mix-blend-mode: multiply;
  opacity: 0.25;
  pointer-events: none;
  z-index: 10;
`;

// Content container
const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/**
 * Main book layout component that creates a two-page spread.
 * Both left and right pages maintain the same aspect ratio as the book cover.
 * 
 * @param leftPage - Content for the left page (optional)
 * @param rightPage - Content for the right page (required)
 * @param className - Optional additional CSS classes
 */
export function BookLayout({ leftPage, rightPage, className }: BookLayoutProps) {
  return (
    <main className={cn(
      "min-h-screen w-full flex flex-col items-center justify-center p-4",
      className
    )}>
      <ContentContainer>
        <BookContainer>
          <GrungeOverlay />
          <BookSpread>
            {/* Left Page (Optional) */}
            {leftPage && (
              <div className="h-full">
                {leftPage}
              </div>
            )}
            
            {/* Right Page (Required) */}
            <div className="h-full">
              {rightPage}
            </div>
          </BookSpread>
        </BookContainer>
      </ContentContainer>
    </main>
  )
} 