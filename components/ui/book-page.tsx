'use client';

/**
 * Book Page Component
 * 
 * This file implements components for creating consistent page layouts within the
 * Choose Your Own Adventure (CYOA) book. It maintains the same dimensions and styling
 * as the BookCover component to ensure visual consistency.
 */

import { ReactNode } from "react"
import styled from 'styled-components'
import { cn } from "@/lib/utils"

// Book Page Container - Main container that places footer at bottom
const PageContainer = styled.div<{ $side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2.5rem 1.5rem;
  height: 100%;
  position: relative;
  font-family: Georgia, 'Times New Roman', Times, serif;
  line-height: 1.5;
  text-align: justify;
  color: #333;
  background: transparent; /* Let parent texture show through */
  overflow: hidden; /* Prevent scrolling */
  
  /* Main content area */
  .page-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-top: 1.5rem; /* Space for page number */
    overflow: hidden; /* Prevent scrolling */
  }
  
  /* Footer area - absolute bottom positioning */
  .page-footer {
    position: absolute;
    bottom: 1.5rem;
    left: 2.5rem;
    right: 2.5rem;
  }
  
  h1, h2, h3 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: normal;
  }
`;

// Page Number - Make sure it's identical on both sides
const PageNumberContainer = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 1.25rem;
  ${({ $side }) => $side === 'left' ? 'left: 2.5rem;' : 'right: 2.5rem;'};
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  font-family: Georgia, 'Times New Roman', Times, serif;
`;

// Export the SeparatorLine so it can be used directly
export const SeparatorLine = styled.hr`
  border: none;
  border-top: 1px solid #777;
  margin: 0 0 0.75rem 0;
  width: 100%;
`;

// Text Container - Matching the CYOA book text style
const TextContainer = styled.p`
  margin: 0.5rem 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  
  em {
    font-style: italic;
  }
  
  &.text-center {
    text-align: center;
  }
`;

// Heading - Centered headers as seen in CYOA books
const HeadingContainer = styled.h2`
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0 1.25rem;
  font-weight: bold;
`;

// Quote Container
const QuoteContainer = styled.blockquote`
  font-style: italic;
  margin: 1.5rem 2rem;
  line-height: 1.6;
  position: relative;
  
  &:before, &:after {
    font-size: 1.5rem;
    position: absolute;
  }
  
  &:before {
    content: """;
    left: -1rem;
    top: -0.5rem;
  }
  
  &:after {
    content: """;
    right: -1rem;
    bottom: -1rem;
  }
`;

// Illustration Container - Matching the CYOA book illustration style
const IllustrationContainer = styled.div<{ $fullPage?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  
  img {
    max-width: 100%;
    max-height: ${({ $fullPage }) => $fullPage ? '70vh' : '200px'};
    object-fit: contain;
  }
`;

// Turn Page Container - Positioned at the bottom
const TurnPageContainer = styled.div`
  font-style: italic;
  text-align: right;
  margin: 0;
  font-size: 0.9rem;
`;

// Interface definitions
interface BookPageProps {
  children: ReactNode
  side: 'left' | 'right'
  pageNumber: number
  className?: string
}

interface TextProps {
  children: ReactNode
  className?: string
}

interface HeadingProps {
  children: ReactNode
  className?: string
}

interface QuoteProps {
  children: ReactNode
  className?: string
  author?: string
}

interface ChoicesProps {
  children: ReactNode
  className?: string
}

interface IllustrationProps {
  src: string
  alt: string
  fullPage?: boolean
  className?: string
}

interface TurnPageProps {
  pageNumber: number
  className?: string
}

// Component definitions
export function BookPage({ children, side, pageNumber, className }: BookPageProps) {
  return (
    <PageContainer $side={side} className={cn("book-page", className)}>
      <PageNumberContainer $side={side}>{pageNumber}</PageNumberContainer>
      <div className="page-content">
        {children}
      </div>
    </PageContainer>
  )
}

export function PageText({ children, className }: TextProps) {
  return (
    <TextContainer className={cn("page-text", className)}>
      {children}
    </TextContainer>
  )
}

export function PageHeading({ children, className }: HeadingProps) {
  return (
    <HeadingContainer className={cn("page-heading", className)}>
      {children}
    </HeadingContainer>
  )
}

export function PageQuote({ children, author, className }: QuoteProps) {
  return (
    <QuoteContainer className={cn("page-quote", className)}>
      {children}
      {author && <footer>— {author}</footer>}
    </QuoteContainer>
  )
}

export function PageChoices({ children, className }: ChoicesProps) {
  return (
    <div className="page-footer">
      <SeparatorLine />
      <div className={cn("page-choices", className)}>
        {children}
      </div>
    </div>
  );
}

export function TurnPage({ pageNumber, className }: TurnPageProps) {
  return (
    <div className="page-footer">
      <SeparatorLine />
      <TurnPageContainer className={cn("turn-page", className)}>
        Turn to page {pageNumber}.
      </TurnPageContainer>
    </div>
  );
}

export function PageIllustration({ src, alt, fullPage = false, className }: IllustrationProps) {
  return (
    <IllustrationContainer $fullPage={fullPage} className={cn("page-illustration", className)}>
      <img src={src} alt={alt} />
    </IllustrationContainer>
  )
} 