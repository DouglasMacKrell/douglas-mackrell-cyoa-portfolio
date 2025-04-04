'use client';

/**
 * Page Choice Component
 * 
 * This component creates styled navigation links for CYOA page choices.
 * It includes optional page number references in the classic CYOA style.
 */

import { cn } from "@/lib/utils"
import Link from "next/link"
import { ReactNode } from "react"
import styled from 'styled-components'

interface PageChoiceProps {
  children: ReactNode
  href: string
  className?: string
  pageNumber?: number
  onClick?: () => void
}

const ChoiceContainer = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const ChoiceLink = styled(Link)`
  display: block;
  padding: 0.75rem 1rem;
  background-color: #f1ede1;
  border: 1px solid #d8d0b8;
  border-radius: 4px;
  color: #6b419f;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e9e4d5;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  /* Classic CYOA arrow indicator */
  &::before {
    content: '▶';
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 0.8em;
  }
`;

const PageNumberIndicator = styled.div`
  font-size: 0.85em;
  color: #777;
  margin-top: 0.25rem;
  text-align: right;
  font-style: italic;
`;

/**
 * A styled choice link for navigation between pages.
 * Includes optional page number reference in the classic CYOA style.
 * 
 * @param children - The choice text to display
 * @param href - The path to navigate to when clicked
 * @param className - Optional additional CSS classes
 * @param pageNumber - Optional page number reference to display
 * @param onClick - Optional click handler
 */
export function PageChoice({ 
  children, 
  href = '#', 
  className, 
  pageNumber,
  onClick 
}: PageChoiceProps) {
  return (
    <ChoiceContainer>
      <ChoiceLink 
        href={href} 
        className={cn(className)}
        onClick={onClick}
        style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
      >
        {children}
      </ChoiceLink>
      
      {pageNumber && (
        <PageNumberIndicator>
          Turn to page {pageNumber}
        </PageNumberIndicator>
      )}
    </ChoiceContainer>
  )
} 