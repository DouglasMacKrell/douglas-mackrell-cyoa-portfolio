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
  max-width: 1200px;
  height: 90vh; /* Match cover height exactly */
  margin: 2rem auto;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: #fffcf5;
  position: relative;
  overflow: hidden; /* Prevent scrolling */
  
  /* Book spine shadow */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 2px;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.05),
      rgba(0, 0, 0, 0.1),
      rgba(0, 0, 0, 0.05)
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
  background-color: #fffcf5;
  overflow: hidden; /* Prevent scrolling */
`;

// Single page column (left or right)
const PageColumn = styled.div`
  flex: 1;
  height: 100%;
  position: relative;
  background-image: url('/images/paper-texture.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Left page has right border */
  &:first-child {
    border-right: 1px solid #d3d3d3;
  }
  
  /* Right page has left border */
  &:last-child {
    border-left: 1px solid #d3d3d3;
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