'use client';

import { useState } from 'react';
import { BookLayout } from "@/components/ui/book-layout";
import { 
  BookPage, 
  PageHeading, 
  PageText, 
  PageQuote,
  PageIllustration,
  SeparatorLine,
  TurnPage
} from "@/components/ui/book-page";
import { PageChoice } from "@/components/ui/page-choice";
import styled from 'styled-components';

// Page container with no title
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

// Title of the CYOA book
const BookTitle = styled.h1`
  font-family: 'Georgia', serif;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  max-width: 800px;
  text-transform: uppercase;
  letter-spacing: 2px;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  
  span {
    display: block;
    font-size: 1.5rem;
    font-style: italic;
    text-transform: none;
    letter-spacing: 1px;
    margin-top: 0.5rem;
    
    @media (min-width: 768px) {
      font-size: 1.75rem;
    }
  }
`;

export default function HomePage() {
  // State to track which page we're viewing
  const [currentPages, setCurrentPages] = useState<{ left: number; right: number }>({ left: 2, right: 3 });

  // Handler for navigation choices
  const handlePageTurn = (pageNumber: number) => {
    // Determine left and right pages based on even/odd
    const isEven = pageNumber % 2 === 0;
    if (isEven) {
      setCurrentPages({ left: pageNumber, right: pageNumber + 1 });
    } else {
      setCurrentPages({ left: pageNumber - 1, right: pageNumber });
    }
  };

  // Render different content based on current page numbers
  const renderPages = () => {
    const pages = {
      // Page spread 2-3: Initial scenario (Journey Under the Sea)
      2: (
        <BookPage side="left" pageNumber={2}>
          <PageText>
            The cable attaching you to the <em>Maray</em> is extended to its limit. You have come to rest on a ledge near the canyon in the ocean floor that ancient myth says leads to the lost city of Atlantis.
          </PageText>
          
          <PageText>
            You have an experimental diving suit designed to protect you from the intense pressure of the deep. You should be able to leave the <em>Seeker</em> and explore the sea bottom. The new suit contains a number of the latest microprocessors enabling a variety of useful functions. It even has a built-in PDA with laser communicator. You can cut loose from the cable; the <em>Seeker</em> is self-propelled. You are now in another world. Remember, this is a dangerous world, an unknown world.
          </PageText>
          
          <PageText>
            As agreed, you signal the <em>Maray</em>, "All systems GO. It's awesome down here."
          </PageText>
          
          <SeparatorLine />
          
          <PageChoice onClick={() => handlePageTurn(6)} pageNumber={6}>
            If you decide to explore the ledge where the Seeker has come to rest
          </PageChoice>
          
          <PageChoice onClick={() => handlePageTurn(4)} pageNumber={4}>
            If you decide to cut loose from the Maray and dive with the Seeker into the canyon
          </PageChoice>
        </BookPage>
      ),
      3: (
        <BookPage side="right" pageNumber={3}>
          <PageText>
            Carefully maneuvering the <em>Seeker</em> between the walls of the canyon, you discover a large round hole. A stream of large bubbles flows steadily out of the hole. The <em>Seeker</em> is equipped with scientific equipment to analyze the bubbles. It also has sonar equipment that can measure depth. The ocean covers close to 90% of the earth and is mostly unknown. Who knows where this hole might lead?
          </PageText>
          
          <PageIllustration 
            src="https://chooseadventureshop.com/cdn/shop/files/07-1_journey-under-sea-inside_1024x1024@2x.jpg?v=1647901035"
            alt="A deep sea submersible exploring an underwater cavern"
          />
          
          <SeparatorLine />
          
          <PageChoice onClick={() => handlePageTurn(9)} pageNumber={9}>
            If you decide to analyze the bubbles
          </PageChoice>
          
          <PageChoice onClick={() => handlePageTurn(14)} pageNumber={14}>
            If you decide to take depth readings
          </PageChoice>
        </BookPage>
      ),

      // Page spread 4-5: Computer example based on CYOA scans 
      4: (
        <BookPage side="left" pageNumber={4}>
          <PageText>
            "I'd like to make a million dollars," you say.
          </PageText>
          
          <PageText>
            "Well," says Conrad, "I'm still absorbing data via my Library of Congress hookup, but I can already tell it's no big problem. But here's something to think about; I have learned by scanning thousands of books that many rich people are unhappy and many poor people are happy, so I must ask you what you <em>really</em> want most—to be rich, or to be happy."
          </PageText>
          
          <SeparatorLine />
          
          <PageChoice onClick={() => handlePageTurn(33)} pageNumber={33}>
            If you say, "Just make me rich,"
          </PageChoice>
          
          <PageChoice onClick={() => handlePageTurn(38)} pageNumber={38}>
            If you say, "I just want to be happy,"
          </PageChoice>
        </BookPage>
      ),
      5: (
        <BookPage side="right" pageNumber={5}>
          <PageHeading>The AI-32</PageHeading>
          
          <PageText>
            The AI-32 is an intelligent computer unlike any other machine before it. For that reason there is no need to learn "how to work it." The computer will teach you how to use it itself. Just flick on the power switch. When the amber light comes on, press the button marked INSTRUCTION MODE. Then introduce yourself in an ordinary conversational voice. Your computer will answer back.
          </PageText>
          
          <PageText>
            Since your AI-32 (Conrad) has not been preprogrammed with information about you, start off by telling it about yourself. Your name, school, and age, who's in your family, and what your hobbies and sports are. Once your computer has gotten to know you, it will be much more useful to you. You'll find your AI-32 will be a really good friend!
          </PageText>
          
          <PageIllustration 
            src="https://preview.redd.it/cyoa-you-are-a-computer-page-7-v0-qyb0odrj9kq71.jpg?width=640&crop=smart&auto=webp&s=b96e456ca4fe3d3e44204e0f3dab0f7a13aac6c3"
            alt="A person talking to a computer"
          />
          
          <TurnPage pageNumber={7} />
        </BookPage>
      ),

      // Page spread 6-7: Explore the ledge
      6: (
        <BookPage side="left" pageNumber={6}>
          <PageText>
            You decide to explore the ledge where the <em>Seeker</em> has come to rest. You carefully climb out of the small submarine and stand on the ocean floor. Your special diving suit is working perfectly, protecting you from the crushing pressure of the deep. The powerful lamp on your helmet illuminates the area around you.
          </PageText>
          
          <PageText>
            The ledge extends about 100 feet to your right and then drops off into the deeper canyon. The rock is covered with colorful sea anemones and strange deep-sea creatures you've never seen before. As you move forward, you notice what appears to be a carved stone archway half-buried in the sediment. This is no natural formation!
          </PageText>
          
          <SeparatorLine />
          
          <PageChoice onClick={() => handlePageTurn(22)} pageNumber={22}>
            If you decide to examine the stone archway
          </PageChoice>
          
          <PageChoice onClick={() => handlePageTurn(9)} pageNumber={9}>
            If you decide to return to the Seeker and analyze the bubbles
          </PageChoice>
        </BookPage>
      ),
      7: (
        <BookPage side="right" pageNumber={7}>
          <PageHeading>The Stone Archway</PageHeading>
          
          <PageText>
            You approach the stone archway with caution. As you clear away some of the sediment, you reveal intricate carvings unlike any known civilization. The symbols don't match any ancient writing system you've studied - not Egyptian, not Sumerian, not even the mysterious Rongorongo script of Easter Island.
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="Ancient underwater stone archway with strange carvings"
          />
          
          <PageText>
            As your gloved hand traced one of the symbols, it began to glow with a faint blue light. Suddenly, all the symbols illuminated in sequence, and the ground beneath you trembled.
          </PageText>
        </BookPage>
      ),

      // Additional pages would be defined here
    };

    return {
      leftPage: pages[currentPages.left],
      rightPage: pages[currentPages.right]
    };
  };

  const { leftPage, rightPage } = renderPages();

  return (
    <PageContainer>
      <BookLayout
        leftPage={leftPage}
        rightPage={rightPage}
      />
    </PageContainer>
  );
}
