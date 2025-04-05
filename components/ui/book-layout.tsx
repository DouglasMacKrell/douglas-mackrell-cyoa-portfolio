'use client';

/**
 * Book Layout Component
 * 
 * This component creates a two-page spread layout for the book interface,
 * simulating an open book with left and right pages. It handles the overall
 * dimensions and positioning of the book within the viewport.
 */

import { ReactNode } from "react"
import styled from 'styled-components'
import { cn } from "@/lib/utils"

// Book container - simulates an open book
const BookContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  min-height: 70vh;
  max-width: 1000px;
  margin: 2rem auto;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
  background-color: #ece8dd;
  position: relative;
  border-radius: 2px;
  
  /* Book spine shadow */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 6px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.15),
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.15)
    );
    transform: translateX(-50%);
    z-index: 10;
  }
`;

// Book spread (pair of pages)
const BookSpread = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  background-image: url('/images/paper-texture.png');
  background-repeat: repeat;
  background-size: 500px;
`;

// Page column
const PageColumn = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  
  /* Left page has different shadow than right page */
  &:first-child {
    border-right: 1px solid #ddd;
    box-shadow: inset -5px 0 10px -6px rgba(0, 0, 0, 0.2);
  }
  
  &:last-child {
    border-left: 1px solid #ddd;
    box-shadow: inset 5px 0 10px -6px rgba(0, 0, 0, 0.2);
  }
`;

interface BookLayoutProps {
  leftPage: ReactNode;
  rightPage: ReactNode;
  className?: string;
}

/**
 * Main book layout component that creates a two-page spread.
 * Both left and right pages maintain the same aspect ratio as the book cover.
 * 
 * @param leftPage - Content for the left page (required)
 * @param rightPage - Content for the right page (required)
 * @param className - Optional additional CSS classes
 */
export function BookLayout({ leftPage, rightPage, className }: BookLayoutProps) {
  return (
    <BookContainer className={cn("book-container", className)}>
      <BookSpread>
        <PageColumn className="left-page">
          {leftPage}
        </PageColumn>
        <PageColumn className="right-page">
          {rightPage}
        </PageColumn>
      </BookSpread>
    </BookContainer>
  )
} 