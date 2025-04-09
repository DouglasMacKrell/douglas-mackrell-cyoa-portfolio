'use client';

import { AnimatedBook } from "@/components/ui/animated-book";
import { BookCover } from "@/components/ui/book-cover";
import styled from 'styled-components';
import Image from 'next/image';

// Page container
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0;
  background-image: url('/Background_image_01.jpg');
  background-size: cover;
  background-position: center;
`;

// Warning page styling
const WarningTitle = styled.h1`
  font-size: 1.5rem;
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid black;
  font-weight: bold;
`;

const WarningText = styled.p`
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
  text-align: justify;
`;

// Story page components
const StoryHeading = styled.h2`
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0 1.25rem;
  font-weight: bold;
`;

const StoryText = styled.p`
  margin: 0.5rem 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
`;

const ChoiceList = styled.div`
  margin-top: 1.5rem;
  border-top: 1px solid #777;
  padding-top: 0.75rem;
`;

const Choice = styled.p`
  font-style: italic;
  margin: 0.5rem 0;
  cursor: pointer;
  
  &:hover {
    text-decoration: underline;
  }
`;

const IllustrationContainer = styled.div`
  width: 100%;
  height: 200px;
  position: relative;
  margin: 1rem 0;
  border: 4px solid #e3c395;
`;

export default function AnimatedJourneyPage() {
  // Create all the pages for our book
  const pages = [
    // Cover page - leaving empty as we'll use the BookCover component directly
    <BookCover key="cover" />,
    
    // Warning page (traditional in CYOA books)
    <div key="warning">
      <WarningTitle>WARNING!!!</WarningTitle>
      <WarningText>
        Do not read this book straight through from beginning to end! These pages contain many different adventures you may have as a software engineer.
      </WarningText>
      <WarningText>
        From time to time as you read along, you will be asked to make a choice. Your choice may lead to success or disaster!
      </WarningText>
      <WarningText>
        The adventures you take are a result of your choice. You are responsible because you choose! After you make a choice, follow the instructions to see what happens to you next.
      </WarningText>
      <WarningText>
        Think carefully before you make a move. Any choice might be your last. What will happen once you're a software engineer? It all depends on you.
      </WarningText>
      <WarningText>
        Good luck!
      </WarningText>
    </div>,
    
    // First story page
    <div key="page1">
      <StoryHeading>THE BEGINNING OF YOUR ADVENTURE</StoryHeading>
      <StoryText>
        You open your eyes to find yourself standing at a crossroads. The path ahead splits into three directions: a dark forest to the left, a mountain trail straight ahead, and a coastal road to the right.
      </StoryText>
      <StoryText>
        As a software engineer, you recognize this as a classic decision tree. Each path represents a different technology stack you might pursue in your career.
      </StoryText>
      <IllustrationContainer>
        <Image 
          src="/images/JOURNEY_UNDER_THE_SEA.webp" 
          alt="A software engineer at a crossroads" 
          fill
          style={{ objectFit: "contain" }}
        />
      </IllustrationContainer>
      <StoryText>
        The time has come to make your first decision. Which path will you choose?
      </StoryText>
    </div>,
    
    // First choice page
    <div key="page2">
      <StoryText>
        The sun hangs low in the sky, casting long shadows across the landscape. You have only a few hours of daylight left, and you need to make a decision quickly.
      </StoryText>
      <StoryText>
        You check your backpack: a laptop, some documentation printouts, a water bottle, and a half-eaten energy bar. Not much, but it will have to do.
      </StoryText>
      <ChoiceList>
        <Choice>
          If you choose the forest path (Backend Development), turn to page 10
        </Choice>
        <Choice>
          If you choose the mountain trail (Frontend Development), turn to page 14
        </Choice>
        <Choice>
          If you choose the coastal road (Full Stack Development), turn to page 18
        </Choice>
      </ChoiceList>
    </div>,
    
    // Backend path intro
    <div key="page3">
      <StoryHeading>THE BACKEND FOREST</StoryHeading>
      <StoryText>
        As you step onto the forest path, the temperature drops noticeably. Tall servers tower around you, humming with the sound of databases processing queries in the distance.
      </StoryText>
      <StoryText>
        The path winds deeper into the woods, with branches of code extending in all directions. After walking for about twenty minutes, you come to a fork in the trail. One path leads toward a structure built with Node.js, the other toward a massive Java ecosystem.
      </StoryText>
      <ChoiceList>
        <Choice>
          If you take the Node.js path, turn to page 22
        </Choice>
        <Choice>
          If you explore the Java ecosystem, turn to page 26
        </Choice>
      </ChoiceList>
    </div>,
    
    // Frontend path intro
    <div key="page4">
      <StoryHeading>THE FRONTEND MOUNTAINS</StoryHeading>
      <StoryText>
        The mountain trail is steep but well-marked with React signposts. As you begin your ascent, the air becomes filled with colorful UI components swirling around you.
      </StoryText>
      <StoryText>
        After an hour of climbing, you reach a plateau. Here, the trail divides. One path continues upward toward a Vue.js summit, while another leads toward an Angular fortress in the distance.
      </StoryText>
      <IllustrationContainer>
        <Image 
          src="/images/JOURNEY_UNDER_THE_SEA.webp" 
          alt="Frontend mountains with UI components" 
          fill
          style={{ objectFit: "contain" }}
        />
      </IllustrationContainer>
      <ChoiceList>
        <Choice>
          If you climb toward the Vue.js summit, turn to page 30
        </Choice>
        <Choice>
          If you approach the Angular fortress, turn to page 34
        </Choice>
      </ChoiceList>
    </div>,
    
    // More pages would follow the same pattern...
    <div key="page5">
      <StoryHeading>THE END</StoryHeading>
      <StoryText>
        This is just a demonstration of the page-turning functionality. In a complete implementation, there would be many more pages forming a complete adventure.
      </StoryText>
      <StoryText>
        The proper CYOA structure is now in place with:
      </StoryText>
      <StoryText>
        • Cover page<br />
        • Warning page<br />
        • Content pages starting from page 9<br />
        • Choice pages with branching options
      </StoryText>
    </div>
  ];

  return (
    <PageContainer>
      <AnimatedBook 
        pages={pages}
        width={550}
        height={733}
      />
    </PageContainer>
  );
} 