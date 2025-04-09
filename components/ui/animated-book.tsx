'use client';

/**
 * Animated Book Component using react-pageflip
 * 
 * Clean implementation following the library's documented patterns
 */

import React, { useRef, useState, useEffect, forwardRef, ReactNode } from "react";
import HTMLFlipBook from "react-pageflip";
import styled from 'styled-components';
import { cn } from "@/lib/utils";

// Simple container for the book
const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 90vh;
  padding: 2rem 0;
`;

// Basic styles for all pages
const pageStyle = `
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #fefefe;
  background-image: url('/images/paper-texture.png');
  background-size: cover;
  background-position: center;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }
  
  .page-content {
    position: relative;
    z-index: 2;
    padding: 2.5rem;
    height: 100%;
  }
`;

// Basic Page component
const PageWrapper = styled.div`
  ${pageStyle}
`;

// Cover Page component
const CoverWrapper = styled.div`
  ${pageStyle}
  background-color: #f8f1e4;
`;

// Page number styling
const PageNumberEl = styled.div<{ $position: 'left' | 'right' }>`
  position: absolute;
  top: 1.25rem;
  ${({ $position }) => $position === 'left' ? 'left: 2.5rem;' : 'right: 2.5rem;'};
  font-size: 1.25rem;
  font-weight: bold;
  font-family: Georgia, 'Times New Roman', Times, serif;
`;

// Interface for standard page props
interface PageProps {
  children: ReactNode;
  pageNumber?: number; 
  className?: string;
}

// Interface for cover page props
interface CoverProps {
  children: ReactNode;
  className?: string;
}

// Standard Page component using forwardRef as required by the library
const Page = forwardRef<HTMLDivElement, PageProps>(({ children, pageNumber, className }, ref) => {
  // Determine if page is left (even) or right (odd)
  const isLeft = pageNumber !== undefined && pageNumber % 2 === 0;
  
  return (
    <PageWrapper className={cn("page", className)} ref={ref}>
      <div className="page-content">
        {pageNumber !== undefined && (
          <PageNumberEl $position={isLeft ? 'left' : 'right'}>
            {pageNumber >= 9 ? pageNumber : ''}
          </PageNumberEl>
        )}
        {children}
      </div>
    </PageWrapper>
  );
});

Page.displayName = "Page";

// Cover Page component using forwardRef
const PageCover = forwardRef<HTMLDivElement, CoverProps>(({ children, className }, ref) => {
  return (
    <CoverWrapper 
      className={cn("page-cover", className)} 
      ref={ref} 
      data-density="hard"
    >
      <div className="page-content">
        {children}
      </div>
    </CoverWrapper>
  );
});

PageCover.displayName = "PageCover";

// Interface for AnimatedBook component props
interface AnimatedBookProps {
  pages: ReactNode[];
  width?: number;
  height?: number;
  className?: string;
}

// Main AnimatedBook component
export function AnimatedBook({ 
  pages, 
  width = 550, 
  height = 733, 
  className 
}: AnimatedBookProps) {
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<any>(null);
  
  useEffect(() => {
    // Set total pages when the component mounts
    if (pages) {
      setTotalPages(pages.length);
    }
  }, [pages]);
  
  const handlePageFlip = (e: any) => {
    setCurrentPage(e.data);
  };

  // Entry animation from bottom
  const EntryAnimation = styled.div`
    @keyframes slideUp {
      from { transform: translateY(100vh); }
      to { transform: translateY(0); }
    }
    animation: slideUp 1.5s ease-out;
    display: flex;
    justify-content: center;
    width: 100%;
  `;
  
  return (
    <EntryAnimation>
      <BookContainer className={cn("book-container", className)}>
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
          startPage={0}
          flippingTime={1000}
          className="flip-book"
          drawShadow={true}
          usePortrait={false}
          onFlip={handlePageFlip}
          ref={bookRef}
        >
          {/* Wrap page content in appropriate components */}
          <PageCover>
            {pages[0]}
          </PageCover>
          
          {pages.slice(1).map((pageContent, index) => (
            <Page 
              key={index + 1} 
              pageNumber={index + 1}
            >
              {pageContent}
            </Page>
          ))}
        </HTMLFlipBook>
      </BookContainer>
    </EntryAnimation>
  );
} 