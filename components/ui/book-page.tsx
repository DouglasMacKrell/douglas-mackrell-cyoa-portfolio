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

// Book Page Container
const PageContainer = styled.div<{ $side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem 1.5rem;
  height: 100%;
  position: relative;
  font-family: Georgia, 'Times New Roman', Times, serif;
  line-height: 1.5;
  text-align: justify;
  color: #333;
  
  h1, h2, h3 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: normal;
  }
`;

// Page Number - Simple upper corner number based on CYOA scans
const PageNumberContainer = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 1.25rem;
  ${({ $side }) => $side === 'left' ? 'left: 2.5rem;' : 'right: 2.5rem;'}
  font-size: 1rem;
  font-weight: normal;
`;

// Export the SeparatorLine so it can be used directly
export const SeparatorLine = styled.hr`
  border: none;
  border-top: 1px solid #999;
  margin: auto 0 0.5rem 0;
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

// Turn Page Instruction - Matches the italic instruction at bottom of CYOA pages
const TurnPageContainer = styled.div`
  font-style: italic;
  text-align: right;
  margin: 0.5rem 0 0 0;
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
      {children}
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
    <>
      <SeparatorLine />
      {children}
    </>
  );
}

export function TurnPage({ pageNumber, className }: TurnPageProps) {
  return (
    <>
      <SeparatorLine />
      <TurnPageContainer className={cn("turn-page", className)}>
        Turn to page {pageNumber}.
      </TurnPageContainer>
    </>
  );
}

export function PageIllustration({ src, alt, fullPage = false, className }: IllustrationProps) {
  return (
    <IllustrationContainer $fullPage={fullPage} className={cn("page-illustration", className)}>
      <img src={src} alt={alt} />
    </IllustrationContainer>
  )
} 