'use client';

/**
 * Animated Book Component using react-pageflip
 * 
 * This component creates a responsive, animated book with 3D page turning effects.
 * It maintains the CYOA book aesthetic while adding realistic page animations.
 */

import React, { useRef, useState, forwardRef, ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import styled from 'styled-components';
import { cn } from "@/lib/utils";

// Container for the entire book with proper dimensions matching cover
const BookContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  margin: 2rem auto;
  overflow: visible; /* Allow pages to extend outside during animation */
  position: relative;
`;

// Styling for the page content
const PageContent = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 2.5rem 2.5rem 1.5rem;
  font-family: Georgia, 'Times New Roman', Times, serif;
  background-image: url('/images/paper-texture.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* Add a semi-transparent white overlay to lighten the texture */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
  }
  
  /* Make content appear above the overlay */
  > * {
    position: relative;
    z-index: 2;
  }
`;

// Navigation buttons
const NavigationButtons = styled.div`
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 10;
`;

const NavButton = styled.button`
  background-color: #8d5fc9;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: bold;
  border: 2px solid #6b419f;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
  cursor: pointer;
  
  &:hover {
    background-color: #6b419f;
  }
  
  &:disabled {
    background-color: #ccc;
    border-color: #999;
    cursor: not-allowed;
  }
`;

// Page number
const PageNumber = styled.div<{ $side: 'left' | 'right' }>`
  position: absolute;
  top: 1.25rem;
  ${({ $side }) => $side === 'left' ? 'left: 2.5rem;' : 'right: 2.5rem;'};
  font-size: 1.5rem;
  font-weight: bold;
  line-height: 1;
  font-family: Georgia, 'Times New Roman', Times, serif;
  z-index: 3;
`;

// Interface for book page props
interface PageProps {
  pageNumber: number;
  side: 'left' | 'right';
  children: ReactNode;
  className?: string;
}

// The individual page component
const Page = forwardRef<HTMLDivElement, PageProps>(({ pageNumber, side, children, className }, ref) => {
  return (
    <div ref={ref} className={cn("page", className)} data-density="hard">
      <PageContent>
        <PageNumber $side={side}>{pageNumber}</PageNumber>
        <div className="page-content">
          {children}
        </div>
      </PageContent>
    </div>
  );
});

Page.displayName = "Page";

// Interface for AnimatedBook props
interface AnimatedBookProps {
  pages: ReactNode[];
  startPage?: number;
  width?: number;
  height?: number;
  className?: string;
}

export function AnimatedBook({ 
  pages, 
  startPage = 0, 
  width = 550, 
  height = 733, 
  className 
}: AnimatedBookProps) {
  const book = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(startPage);
  const [totalPages, setTotalPages] = useState(pages.length);
  
  // Handle page flip
  const handlePageFlip = (e: any) => {
    setCurrentPage(e.data);
  };
  
  // Navigation functions
  const prevPage = () => {
    if (book.current && currentPage > 0) {
      book.current.pageFlip().flipPrev();
    }
  };
  
  const nextPage = () => {
    if (book.current && currentPage < totalPages - 1) {
      book.current.pageFlip().flipNext();
    }
  };

  return (
    <BookContainer className={cn("animated-book", className)}>
      <HTMLFlipBook
        width={width}
        height={height}
        size="stretch"
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        showCover={true}
        mobileScrollSupport={true}
        className="demo-book"
        startPage={startPage}
        drawShadow={true}
        flippingTime={1000}
        usePortrait={false}
        startZIndex={0}
        autoSize={true}
        ref={book}
        onFlip={handlePageFlip}
      >
        {pages.map((pageContent, index) => {
          const isEven = index % 2 === 0;
          return (
            <Page 
              key={index} 
              pageNumber={index + 1} 
              side={isEven ? 'left' : 'right'}
            >
              {pageContent}
            </Page>
          );
        })}
      </HTMLFlipBook>
      
      <NavigationButtons>
        <NavButton onClick={prevPage} disabled={currentPage === 0 || currentPage === 1}>
          Previous
        </NavButton>
        <span>Page {currentPage + 1} of {totalPages}</span>
        <NavButton onClick={nextPage} disabled={currentPage >= totalPages - 1}>
          Next
        </NavButton>
      </NavigationButtons>
    </BookContainer>
  );
} 