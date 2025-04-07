'use client';

/**
 * Page Choice Component
 * 
 * This component creates styled navigation links for CYOA page choices.
 * It includes optional page number references in the classic CYOA style.
 */

import { ReactNode } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";

// Choice Container - Styled like authentic CYOA book choices
const ChoiceContainer = styled.div`
  margin: 0.25rem 0 0.5rem;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Choice Text - Matching the italic style from CYOA books
const ChoiceText = styled.div`
  font-style: italic;
  text-align: justify;
  line-height: 1.5;
  margin: 0;
  width: 100%;
`;

// Page Number Info - Right aligned like in CYOA books
const PageInfo = styled.div`
  display: block;
  text-align: right;
  margin-top: 0.1rem;
  font-style: italic;
  font-size: 0.9rem;
`;

interface PageChoiceProps {
  children: ReactNode;
  pageNumber: number;
  className?: string;
  onClick?: () => void;
}

/**
 * A styled choice link for navigation between pages.
 * Includes optional page number reference in the classic CYOA style.
 * 
 * @param children - The choice text to display
 * @param pageNumber - Optional page number reference to display
 * @param className - Optional additional CSS classes
 * @param onClick - Optional click handler
 */
export function PageChoice({ 
  children, 
  pageNumber, 
  className,
  onClick 
}: PageChoiceProps) {
  return (
    <ChoiceContainer className={cn("page-choice", className)} onClick={onClick} role="button">
      <ChoiceText>
        {children}
      </ChoiceText>
      <PageInfo>Turn to page {pageNumber}</PageInfo>
    </ChoiceContainer>
  );
} 