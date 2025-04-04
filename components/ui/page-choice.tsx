'use client';

/**
 * Page Choice Component
 * 
 * This component creates styled navigation links for CYOA page choices.
 * It includes optional page number references in the classic CYOA style.
 */

import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Choice Container
const ChoiceContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0.75rem 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

// Choice Text - styled to match CYOA books
const ChoiceText = styled.p`
  font-style: italic;
  text-align: justify;
  line-height: 1.6;
  margin: 0;
`;

// Page Number Info
const PageInfo = styled.span`
  display: block;
  text-align: right;
  margin-top: 0.25rem;
  font-style: normal;
  color: #555;
`;

interface PageChoiceProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  pageNumber: number;
  href?: string;
  className?: string;
}

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
  pageNumber, 
  href,
  className,
  ...props
}: PageChoiceProps) {
  const content = (
    <ChoiceContainer className={cn("page-choice", className)}>
      <ChoiceText>
        {children}
        <PageInfo>Turn to page {pageNumber}</PageInfo>
      </ChoiceText>
    </ChoiceContainer>
  );

  if (href) {
    return (
      <Link href={href} passHref>
        <div {...props}>{content}</div>
      </Link>
    );
  }

  return (
    <div role="button" {...props}>
      {content}
    </div>
  );
} 