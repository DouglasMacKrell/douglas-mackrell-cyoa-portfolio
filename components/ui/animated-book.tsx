'use client';

/**
 * Animated Book Component using react-pageflip
 * 
 * This component creates a responsive, animated book with 3D page turning effects.
 * It maintains the CYOA book aesthetic while adding realistic page animations.
 */

import React, { useRef, useState, forwardRef, ReactNode, useEffect } from "react";
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
  justify-content: center; /* Center the book initially */
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

// Updated interface for AnimatedBook props to include a showNavButtons option
interface AnimatedBookProps {
  pages: ReactNode[];
  startPage?: number;
  width?: number;
  height?: number;
  showNavButtons?: boolean;
  className?: string;
}

export function AnimatedBook({ 
  pages, 
  startPage = 0, 
  width = 550, 
  height = 733,
  showNavButtons = false,
  className 
}: AnimatedBookProps) {
  const book = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(startPage);
  const [totalPages, setTotalPages] = useState(pages.length);
  const [isOpen, setIsOpen] = useState(startPage > 0);
  const [showHelp, setShowHelp] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  
  // Show help buttons after some idle time
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHelp(true);
    }, 8000); // Show after 8 seconds of inactivity
    
    // Clear timer on user interaction or component unmount
    const clearHelpTimer = () => {
      clearTimeout(timer);
      setShowHelp(false);
    };
    
    window.addEventListener('click', clearHelpTimer);
    window.addEventListener('touchstart', clearHelpTimer);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', clearHelpTimer);
      window.removeEventListener('touchstart', clearHelpTimer);
    };
  }, [currentPage]); // Reset timer when page changes
  
  // Handle page flip
  const handlePageFlip = (e: any) => {
    setCurrentPage(e.data);
    // Set isOpen state based on whether we're past the cover
    if (e.data > 0 && !isOpen) {
      setIsOpen(true);
    } else if (e.data === 0 && isOpen) {
      setIsOpen(false);
    }
    
    // Hide help when pages are flipped
    setShowHelp(false);
    
    // Reset flipping state
    setIsFlipping(false);
  };
  
  // Navigation functions with debounce to prevent glitches
  const prevPage = () => {
    if (book.current && currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      book.current.pageFlip().flipPrev();
    }
  };
  
  const nextPage = () => {
    if (book.current && currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      book.current.pageFlip().flipNext();
    }
  };

  // Create click overlays for page turning by clicking left or right side
  const ClickOverlay = styled.div<{ $position: 'left' | 'right' }>`
    position: absolute;
    top: 0;
    ${({ $position }) => $position === 'left' ? 'left: 0;' : 'right: 0;'};
    width: 30%; /* Reduced from 50% to avoid center area conflicts */
    height: 100%;
    z-index: 5; /* Lower z-index to prioritize actual page clicks */
    cursor: pointer;
  `;

  // Dynamic container style for horizontal centering
  const CenteredContainer = styled.div<{ $isOpen: boolean }>`
    display: flex;
    justify-content: center;
    width: 100%;
    /* When open, center the two-page spread; when closed (cover only), center the single page */
    transform: ${({ $isOpen }) => $isOpen ? 'translateX(0)' : 'translateX(0)'};
    transition: transform 0.5s ease-out;
    position: relative; /* Needed for proper positioning */
    
    /* Adjust parent positions to ensure proper centering */
    .stf__parent {
      position: relative;
      margin: 0 auto;
    }
    
    /* For cover (single page) vs spread (two pages) */
    .--single {
      margin: 0 auto !important;
    }
  `;

  // Help overlay displaying click hints
  const HelpOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    pointer-events: none;
    z-index: 20;
    opacity: 0.7;
  `;
  
  const HelpText = styled.div`
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 4px;
    margin: 0 2rem;
    font-size: 0.9rem;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  `;

  return (
    <BookContainer className={cn("animated-book", className)}>
      <CenteredContainer $isOpen={isOpen}>
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
          swipeDistance={0} /* Disable swipe to prevent accidental flips */
          showPageCorners={false} /* Disable default corner hover effect */
          disableFlipByClick={false} /* Allow clicking on page to turn */
          singlePageMode={!isOpen} /* Use single page mode when showing cover */
          clickEventForward={true} /* Forward click events to page elements */
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
      </CenteredContainer>

      {/* Click overlays for page turning - only show when appropriate */}
      {currentPage > 0 && (
        <ClickOverlay 
          $position="left" 
          onClick={prevPage} 
          className="click-left"
        />
      )}
      
      {currentPage < totalPages - 1 && (
        <ClickOverlay 
          $position="right" 
          onClick={nextPage} 
          className="click-right"
        />
      )}
      
      {/* Help overlay that appears after idle time */}
      {showHelp && (
        <HelpOverlay>
          <HelpText>
            Click here to<br />go back
          </HelpText>
          <HelpText>
            Click here to<br />turn the page
          </HelpText>
        </HelpOverlay>
      )}
      
      {showNavButtons && (
        <NavigationButtons>
          <NavButton onClick={prevPage} disabled={currentPage === 0 || currentPage === 1 || isFlipping}>
            Previous
          </NavButton>
          <span>Page {currentPage + 1} of {totalPages}</span>
          <NavButton onClick={nextPage} disabled={currentPage >= totalPages - 1 || isFlipping}>
            Next
          </NavButton>
        </NavigationButtons>
      )}
    </BookContainer>
  );
} 