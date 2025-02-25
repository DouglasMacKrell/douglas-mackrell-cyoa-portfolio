'use client';

/**
 * Book Cover Component System
 * 
 * This file implements components for creating authentic Choose Your Own Adventure (CYOA)
 * book covers. The styling intentionally matches the classic CYOA series from the 1980s-90s,
 * with precise attention to typography, proportions, and the distinctive illustration frame.
 */

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import styled from 'styled-components'

interface BookCoverProps {
  children: ReactNode
  className?: string
}

/**
 * Creates the outer red border of the illustration frame.
 * The clip-path creates the distinctive mushroom shape with:
 * - Smooth rounded top corners
 * - Vertical sides
 * - 90-degree steps near the bottom
 */
const OuterFrame = styled.div`
  position: absolute;
  inset: 0;
  background: #CC3B2F; /* Classic CYOA red border color */
  /* Clip path creates the mushroom shape with improved rounded corners */
  clip-path: polygon(
    /* Left side curve - smoother transition with more points */
    0% 15%,
    0% 12%, 1% 8%, 2% 6%, 3% 5%, 5% 3%, 8% 1.5%, 12% 0.5%, 15% 0%,
    
    /* Top edge */
    85% 0%,
    
    /* Right side curve - smoother transition with more points */
    88% 0.5%, 92% 1.5%, 95% 3%, 97% 5%, 98% 6%, 99% 8%, 100% 12%,
    100% 15%,
    
    /* Right vertical side */
    100% 93%,
    
    /* Right step */
    97% 93%,
    97% 100%,
    
    /* Bottom edge */
    3% 100%,
    
    /* Left step */
    3% 93%,
    0% 93%
  );
`

/**
 * Creates the inner gold border of the illustration frame.
 * Uses the same clip-path shape as the outer frame, but positioned
 * inside it to create the border effect.
 */
const InnerFrame = styled.div`
  position: absolute;
  inset: clamp(4px, 1.5%, 8px); /* Responsive red border thickness */
  background: #E0B970; /* Lightened gold border color for better visual separation */
  /* Same clip path as OuterFrame for consistent shape */
  clip-path: polygon(
    /* Left side curve - smoother transition with more points */
    0% 15%,
    0% 12%, 1% 8%, 2% 6%, 3% 5%, 5% 3%, 8% 1.5%, 12% 0.5%, 15% 0%,
    
    /* Top edge */
    85% 0%,
    
    /* Right side curve - smoother transition with more points */
    88% 0.5%, 92% 1.5%, 95% 3%, 97% 5%, 98% 6%, 99% 8%, 100% 12%,
    100% 15%,
    
    /* Right vertical side */
    100% 93%,
    
    /* Right step */
    97% 93%,
    97% 100%,
    
    /* Bottom edge */
    3% 100%,
    
    /* Left step */
    3% 93%,
    0% 93%
  );
`

/**
 * Creates the white content area inside the gold border.
 * This is where the illustration itself is displayed.
 */
const Content = styled.div`
  position: absolute;
  inset: clamp(14px, 5.5%, 28px); /* Responsive total border thickness */
  background: white;
  /* Same clip path as frames for consistent shape */
  clip-path: polygon(
    /* Left side curve - smoother transition with more points */
    0% 15%,
    0% 12%, 1% 8%, 2% 6%, 3% 5%, 5% 3%, 8% 1.5%, 12% 0.5%, 15% 0%,
    
    /* Top edge */
    85% 0%,
    
    /* Right side curve - smoother transition with more points */
    88% 0.5%, 92% 1.5%, 95% 3%, 97% 5%, 98% 6%, 99% 8%, 100% 12%,
    100% 15%,
    
    /* Right vertical side */
    100% 93%,
    
    /* Right step */
    97% 93%,
    97% 100%,
    
    /* Bottom edge */
    3% 100%,
    
    /* Left step */
    3% 93%,
    0% 93%
  );
`

/**
 * Main book cover container.
 * Creates a white background with classic book proportions and border.
 * 
 * @param children Content to display inside the book cover
 * @param className Optional additional CSS classes
 */
export function BookCover({ children, className }: BookCoverProps) {
  return (
    <div className={cn(
      "h-full aspect-[3/4.25] bg-white rounded-lg shadow-xl overflow-hidden",
      "border-[clamp(8px,2vh,16px)] border-white",
      className
    )}>
      {children}
    </div>
  )
}

/**
 * The distinctive red oval badge at the top of CYOA books.
 * Contains the brand name and book number.
 * 
 * @param className Optional additional CSS classes
 */
export function BrandBadge({ className }: { className?: string }) {
  return (
    <div className={cn(
      "w-[90%] bg-red-600 text-white h-[clamp(2rem,6vh,3.5rem)] px-[clamp(1rem,2vw,2rem)] rounded-full",
      "flex items-center justify-between",
      "border-[1px] border-white",
      className
    )}>
      <span 
        className="text-[clamp(1rem,2.5vh,2.25rem)] font-black tracking-tight leading-none mt-[0.4em]" 
        style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
      >
        CHOOSE YOUR OWN ADVENTURE
      </span>
      <span 
        className="text-white font-bold text-[clamp(0.875rem,2vh,1.75rem)] ml-4 mt-[0.4em]"
        style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
      >
        404
      </span>
    </div>
  )
}

/**
 * The distinctive mushroom-shaped illustration frame.
 * Features a thin red outer border and thick gold inner border,
 * both following the same characteristic shape with rounded top corners
 * and stepped bottom edges.
 * 
 * @param children The illustration content
 * @param className Optional additional CSS classes
 */
export function IllustrationFrame({ children, className }: BookCoverProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <OuterFrame>
        <InnerFrame>
          <Content>
            {children}
          </Content>
        </InnerFrame>
      </OuterFrame>
    </div>
  );
}

/**
 * Book title component with the characteristic purple color and styling.
 * Includes decorative separator line below the text.
 * 
 * @param children The title text content
 * @param className Optional additional CSS classes
 */
export function BookTitle({ children, className }: BookCoverProps) {
  return (
    <div className="space-y-[0.5em]">
      <h1 className={cn(
        "text-[clamp(2rem,4.5vh,4.5rem)]",
        "leading-[0.85] text-purple-700 -tracking-wide",
        className
      )}
      style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
        {children}
      </h1>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </div>
  )
}

/**
 * Subtitle component for the classic "YOU'RE THE STAR..." text.
 * Includes decorative separator line below the text.
 * 
 * @param children The subtitle text content
 * @param className Optional additional CSS classes
 */
export function Subtitle({ children, className }: BookCoverProps) {
  return (
    <div className="space-y-[0.5em] mb-[clamp(0.5rem,2vh,1.5rem)]">
      <div className={cn(
        "text-[clamp(1rem,2vh,1.75rem)] tracking-tight text-gray-800 leading-[0.85]",
        className
      )}
      style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
        {children}
      </div>
      <div className="h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent" />
    </div>
  )
}

/**
 * Author byline component typically showing "by [Author Name]".
 * 
 * @param children The byline text content
 * @param className Optional additional CSS classes
 */
export function AuthorByline({ children, className }: BookCoverProps) {
  return (
    <p className={cn(
      "text-[clamp(1rem,2vh,1.75rem)] text-gray-700 mt-[0.5em] leading-[0.85] tracking-tight",
      className
    )}
    style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
      {children}
    </p>
  )
}

/**
 * Credit line at the bottom of the book, typically for copyright.
 * 
 * @param children The credit text content
 * @param className Optional additional CSS classes
 */
export function CreditLine({ children, className }: BookCoverProps) {
  return (
    <p className={cn(
      "text-[clamp(0.75rem,1.25vh,1rem)] text-gray-600 text-center mt-2 leading-[0.95] tracking-tight",
      className
    )}
    style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
      {children}
    </p>
  )
} 