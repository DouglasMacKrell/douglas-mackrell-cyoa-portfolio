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
import Image from "next/image"

// Book Page Container
const PageContainer = styled.div<{ side: 'left' | 'right' }>`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem;
  height: 100%;
  position: relative;
  background-color: #f8f5e6;
  font-family: Georgia, 'Times New Roman', Times, serif;
  line-height: 1.5;
  text-align: justify;
  color: #333;
  
  h1, h2, h3 {
    font-family: Georgia, 'Times New Roman', Times, serif;
    font-weight: normal;
  }
`;

// Page Number
const PageNumberContainer = styled.div<{ side: 'left' | 'right' }>`
  position: absolute;
  top: 2rem;
  ${({ side }) => side === 'left' ? 'left: 2.5rem;' : 'right: 2.5rem;'}
  font-size: 1.5rem;
  font-weight: normal;
`;

// Separator Line
const SeparatorLine = styled.hr`
  border: none;
  border-top: 1px solid #999;
  margin: 1.5rem 0;
  width: 100%;
`;

// Choices Container
const ChoicesContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

// Text Container
const TextContainer = styled.p`
  margin: 0.75rem 0;
  font-size: 1rem;
  line-height: 1.6;
  
  em {
    font-style: italic;
  }
`;

// Heading
const HeadingContainer = styled.h2`
  font-size: 1.25rem;
  text-align: center;
  margin: 1rem 0 1.5rem;
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

// Illustration Container
const IllustrationContainer = styled.div<{ fullPage?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: ${({ fullPage }) => fullPage ? '0' : '1.5rem 0'};
  height: ${({ fullPage }) => fullPage ? '100%' : 'auto'};
  
  img {
    max-width: 100%;
    max-height: ${({ fullPage }) => fullPage ? '100%' : '300px'};
    object-fit: contain;
  }
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

// Component definitions
export function BookPage({ children, side, pageNumber, className }: BookPageProps) {
  return (
    <PageContainer side={side} className={cn("book-page", className)}>
      <PageNumberContainer side={side}>{pageNumber}</PageNumberContainer>
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
      <ChoicesContainer className={cn("page-choices", className)}>
        {children}
      </ChoicesContainer>
    </>
  )
}

export function PageIllustration({ src, alt, fullPage = false, className }: IllustrationProps) {
  return (
    <IllustrationContainer fullPage={fullPage} className={cn("page-illustration", className)}>
      <img src={src} alt={alt} />
    </IllustrationContainer>
  )
} 
} 