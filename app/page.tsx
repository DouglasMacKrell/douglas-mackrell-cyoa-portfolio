'use client';

import { useState } from 'react';
import { BookLayout } from "@/components/ui/book-layout";
import { 
  BookPage, 
  PageHeading, 
  PageText, 
  PageQuote, 
  PageChoices,
  PageIllustration
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
      // Page spread 2-3: Initial scenario
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
          
          <PageChoices>
            <PageChoice href="#" onClick={() => handlePageTurn(6)} pageNumber={6}>
              If you decide to explore the ledge where the Seeker has come to rest
            </PageChoice>
            
            <PageChoice href="#" onClick={() => handlePageTurn(4)} pageNumber={4}>
              If you decide to cut loose from the Maray and dive with the Seeker into the canyon
            </PageChoice>
          </PageChoices>
        </BookPage>
      ),
      3: (
        <BookPage side="right" pageNumber={3}>
          <PageText>
            Carefully maneuvering the <em>Seeker</em> between the walls of the canyon, you discover a large round hole. A stream of large bubbles flows steadily out of the hole. The <em>Seeker</em> is equipped with scientific equipment to analyze the bubbles. It also has sonar equipment that can measure depth. The ocean covers close to 90% of the earth and is mostly unknown. Who knows where this hole might lead?
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="A deep sea submersible exploring an underwater cavern"
          />
          
          <PageChoices>
            <PageChoice href="#" onClick={() => handlePageTurn(9)} pageNumber={9}>
              If you decide to analyze the bubbles
            </PageChoice>
            
            <PageChoice href="#" onClick={() => handlePageTurn(14)} pageNumber={14}>
              If you decide to take depth readings
            </PageChoice>
          </PageChoices>
        </BookPage>
      ),

      // Page spread 4-5: Dive into canyon
      4: (
        <BookPage side="left" pageNumber={4}>
          <PageText>
            You decide to cut loose from the <em>Maray</em> and dive with the <em>Seeker</em> into the canyon. As you slowly descend, the water around you gets darker. The powerful searchlight of the <em>Seeker</em> illuminates the canyon walls. They are encrusted with barnacles and sponges.
          </PageText>
          
          <PageText>
            A school of small, silvery fish swims by, their scales reflecting the beam of light. You continue descending. At 1,000 feet, the bottom is still not in sight. At 1,500 feet, you begin to worry that perhaps you should go back up.
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="A deep sea diving suit descending into darkness"
          />
          
          <PageChoices>
            <PageChoice href="#" onClick={() => handlePageTurn(12)} pageNumber={12}>
              If you decide to continue descending
            </PageChoice>
          </PageChoices>
        </BookPage>
      ),
      5: (
        <BookPage side="right" pageNumber={5}>
          <PageText>
            At 2,000 feet, the powerful searchlight of the <em>Seeker</em> begins to dim. You switch to the auxiliary power unit and continue the dive. Just as you are about to give up, you spot the bottom at 2,450 feet. You hover over it, observing the strange terrain. The canyon floor appears to be covered with a thick layer of silt that billows up in clouds as the <em>Seeker</em>'s thrusters disturb it.
          </PageText>
          
          <PageText>
            Through the murk, you notice a faint, pulsing light off to the right. It's unlike anything you've seen before - not quite bioluminescence, but something else entirely.
          </PageText>
          
          <PageChoices>
            <PageChoice href="#" onClick={() => handlePageTurn(26)} pageNumber={26}>
              If you decide to investigate the mysterious light
            </PageChoice>
            
            <PageChoice href="#" onClick={() => handlePageTurn(8)} pageNumber={8}>
              If you decide to return to the surface
            </PageChoice>
          </PageChoices>
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
          
          <PageChoices>
            <PageChoice href="#" onClick={() => handlePageTurn(22)} pageNumber={22}>
              If you decide to examine the stone archway
            </PageChoice>
            
            <PageChoice href="#" onClick={() => handlePageTurn(9)} pageNumber={9}>
              If you decide to return to the Seeker and analyze the bubbles
            </PageChoice>
          </PageChoices>
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
