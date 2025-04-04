'use client';

/**
 * Book Page Component
 * 
 * This file implements components for creating consistent page layouts within the
 * Choose Your Own Adventure (CYOA) book. It maintains the same dimensions and styling
 * as the BookCover component to ensure visual consistency.
 */

import { cn } from "@/lib/utils"
import { ReactNode } from "react"
import styled from 'styled-components'

interface BookPageProps {
  children: ReactNode
  className?: string
  side?: 'left' | 'right'
}

// Standard page styling to match book cover proportions
const PageContainer = styled.div<{ $side?: 'left' | 'right' }>`
  height: 100%;
  position: relative;
  background-color: #f8f5e8; /* Slightly off-white for authentic book page look */
  box-shadow: ${props => 
    props.$side === 'left' 
      ? '2px 0 8px rgba(0, 0, 0, 0.1)' 
      : '-2px 0 8px rgba(0, 0, 0, 0.1)'
  };
  border-radius: 4px;
  padding: clamp(1rem, 3vh, 2rem);
  overflow-y: auto;
  
  /* Creates the appearance of a page edge */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    ${props => props.$side === 'left' ? 'right: 0;' : 'left: 0;'}
    width: 6px;
    height: 100%;
    background: linear-gradient(
      to ${props => props.$side === 'left' ? 'left' : 'right'}, 
      rgba(0, 0, 0, 0.05), 
      transparent 70%
    );
    pointer-events: none;
  }
`;

// Content area for the page with proper margins
const PageContent = styled.div`
  height: 100%;
  overflow-y: auto;
  padding-bottom: 1rem;
`;

/**
 * A standard book page component that matches the dimensions of the book cover.
 * Can be configured as either a left or right page in the spread.
 * 
 * @param children - Content to display on the page
 * @param className - Optional additional CSS classes
 * @param side - Which side of the book spread ('left' or 'right', defaults to 'right')
 */
export function BookPage({ children, className, side = 'right' }: BookPageProps) {
  return (
    <PageContainer 
      $side={side} 
      className={cn(
        "h-full aspect-[3/4.25]", // Same aspect ratio as BookCover
        className
      )}
    >
      <PageContent>
        {children}
      </PageContent>
    </PageContainer>
  )
}

/**
 * Heading component styled specifically for book pages
 */
export function PageHeading({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <h1 className={cn(
      "text-[clamp(1.5rem,3vh,2.5rem)] text-purple-700 mb-4",
      "font-bold leading-tight",
      className
    )}
    style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}>
      {children}
    </h1>
  )
}

/**
 * Standard paragraph text for book pages
 */
export function PageText({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <p className={cn(
      "text-[clamp(1rem,2vh,1.25rem)] text-gray-800 mb-4 leading-relaxed",
      className
    )}>
      {children}
    </p>
  )
}

/**
 * A component for page numbers that displays at the bottom of the page
 */
export function PageNumber({ number, className }: { number: number, className?: string }) {
  return (
    <div className={cn(
      "absolute bottom-4 text-center w-full left-0 text-gray-600",
      "text-[clamp(0.875rem,1.5vh,1.125rem)]",
      className
    )}>
      {number}
    </div>
  )
}

/**
 * A styled blockquote component for book pages
 */
export function PageQuote({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <blockquote className={cn(
      "border-l-4 border-purple-700 pl-4 py-2 my-4",
      "text-[clamp(0.875rem,1.8vh,1.125rem)] italic text-gray-700",
      className
    )}>
      {children}
    </blockquote>
  )
}

/**
 * A component for choice options at the bottom of pages
 */
export function PageChoices({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <div className={cn(
      "mt-8 space-y-4",
      className
    )}>
      {children}
    </div>
  )
} 