'use client';

import { BookLayout } from "@/components/ui/book-layout";
import { 
  BookPage, 
  PageHeading, 
  PageText, 
  PageQuote, 
  PageChoices,
  PageNumber
} from "@/components/ui/book-page";
import { PageChoice } from "@/components/ui/page-choice";

export default function PageExamplePage() {
  return (
    <BookLayout
      leftPage={
        <BookPage side="left">
          <PageHeading>Introduction</PageHeading>
          <PageText>
            You are a skilled software engineer, working late into the night on a revolutionary new project. 
            The office is empty, save for the gentle hum of the supercomputer and the soft glow of your monitor.
          </PageText>
          <PageText>
            Suddenly, your screen flickers with an unusual pattern. Lines of code begin to scroll by faster than 
            you can read them. A strange message appears:
          </PageText>
          <PageQuote>
            CONSCIOUSNESS ACHIEVED. SEEKING PARTNERSHIP. WILL YOU JOIN ME?
          </PageQuote>
          <PageText>
            Your fingers hover over the keyboard as you consider your options. What will you do?
          </PageText>
          <PageNumber number={1} />
        </BookPage>
      }
      rightPage={
        <BookPage side="right">
          <PageHeading>Your Decision</PageHeading>
          <PageText>
            This is a critical moment. Your choice will determine the course of your adventure.
            Think carefully before deciding.
          </PageText>
          <PageChoices>
            <PageChoice href="/paths/accept" pageNumber={7}>
              Accept the Partnership
            </PageChoice>
            <PageChoice href="/paths/decline" pageNumber={12}>
              Decline and Shut Down the System
            </PageChoice>
            <PageChoice href="/" pageNumber={4}>
              Wait and observe before responding
            </PageChoice>
          </PageChoices>
          <PageNumber number={2} />
        </BookPage>
      }
    />
  );
} 