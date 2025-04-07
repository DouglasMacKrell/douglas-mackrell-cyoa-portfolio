'use client';

import { useState } from 'react';
import { AnimatedBook } from "@/components/ui/animated-book";
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

// Text Container - Matching the CYOA book text style
const TextBlock = styled.p`
  margin: 0.5rem 0 0.75rem;
  font-size: 0.95rem;
  line-height: 1.6;
  text-align: justify;
  color: #333;
  
  em {
    font-style: italic;
  }
`;

// Heading - Centered headers as seen in CYOA books
const Heading = styled.h2`
  font-size: 1.1rem;
  text-align: center;
  margin: 1rem 0 1.25rem;
  font-weight: bold;
  color: #333;
`;

// Separator line
const SeparatorLine = styled.hr`
  border: none;
  border-top: 1px solid #777;
  margin: 1.5rem 0 0.75rem 0;
  width: 100%;
`;

// Choice Text
const ChoiceText = styled.p`
  font-style: italic;
  margin: 0.25rem 0 0.5rem;
  
  span {
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Turn Page Text
const TurnPageText = styled.p`
  font-style: italic;
  text-align: right;
  margin-top: 0.5rem;
`;

// Illustration container
const IllustrationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem auto;
  position: relative;
  height: 200px;
  width: 100%;
`;

export default function AnimatedJourneyPage() {
  // Generate an array of page content
  const pages = [
    // Page 1 - Cover or title page
    <div key="page1">
      <Heading>THE BEGINNING OF YOUR ADVENTURE</Heading>
      <TextBlock>
        You open your eyes to find yourself standing at a crossroads. The path ahead splits into three directions: a dark forest to the left, a mountain trail straight ahead, and a coastal road to the right.
      </TextBlock>
      <SeparatorLine />
      <TurnPageText>Turn the page to begin your journey.</TurnPageText>
    </div>,
    
    // Page 2 - First choice page
    <div key="page2">
      <TextBlock>
        The sun hangs low in the sky, casting long shadows across the landscape. You have only a few hours of daylight left, and you need to make a decision quickly. Each path offers its own challenges and mysteries.
      </TextBlock>
      <TextBlock>
        You check your backpack: a map (though it doesn't show where these paths lead), a water bottle, some trail mix, and a small flashlight. Not much, but it will have to do.
      </TextBlock>
      <IllustrationContainer>
        <Image 
          src="/images/JOURNEY_UNDER_THE_SEA.webp" 
          alt="A crossroads with three paths" 
          fill
          style={{ objectFit: "contain" }}
        />
      </IllustrationContainer>
      <SeparatorLine />
      <ChoiceText>
        If you choose the forest path, <span>turn to page 4</span>
      </ChoiceText>
      <ChoiceText>
        If you choose the mountain trail, <span>turn to page 6</span>
      </ChoiceText>
      <ChoiceText>
        If you choose the coastal road, <span>turn to page 8</span>
      </ChoiceText>
    </div>,
    
    // Page 3 - Forest intro
    <div key="page3">
      <Heading>THE DARK FOREST</Heading>
      <TextBlock>
        As you step onto the forest path, the temperature drops noticeably. Tall trees create a dense canopy overhead, filtering the sunlight into eerie, dappled patterns on the ground. The forest is alive with sounds – birds calling, leaves rustling, and occasionally, something larger moving in the underbrush.
      </TextBlock>
      <TextBlock>
        The path winds deeper into the woods, becoming narrower and less defined with each step. After walking for about twenty minutes, you come to a fork in the trail. To the left, the path descends into a misty hollow. To the right, it climbs upward, becoming steeper but offering glimpses of light breaking through the trees.
      </TextBlock>
      <SeparatorLine />
      <ChoiceText>
        If you take the path through the misty hollow, <span>turn to page 10</span>
      </ChoiceText>
      <ChoiceText>
        If you take the uphill path toward the light, <span>turn to page 12</span>
      </ChoiceText>
    </div>,
    
    // Page 4 - Mountain intro
    <div key="page4">
      <Heading>THE MOUNTAIN TRAIL</Heading>
      <TextBlock>
        The mountain trail is rocky but well-marked. As you begin your ascent, the air becomes cooler and clearer. Below you, the landscape unfolds in a breathtaking panorama of forests and fields. The climb is challenging, but exhilarating.
      </TextBlock>
      <TextBlock>
        After an hour of steady hiking, you reach a plateau. Here, the trail divides. One path continues upward toward the summit, while another skirts around the side of the mountain, leading to what appears to be a cave entrance in the distance.
      </TextBlock>
      <SeparatorLine />
      <ChoiceText>
        If you continue toward the summit, <span>turn to page 14</span>
      </ChoiceText>
      <ChoiceText>
        If you investigate the cave, <span>turn to page 16</span>
      </ChoiceText>
    </div>,
    
    // Additional pages follow the same pattern...
    <div key="page5">
      <Heading>THE COASTAL ROAD</Heading>
      <TextBlock>
        The coastal road offers a stunning view of the ocean. Waves crash against the rocks below as seabirds wheel overhead. The salty breeze is refreshing, and you feel your spirits lift as you walk along the clifftop path.
      </TextBlock>
      <TextBlock>
        After following the road for about two miles, you come to a small fishing village nestled in a protected cove. The village appears quiet, almost deserted, but smoke rises from a few chimneys. At the harbor, a single boat is docked, gently rocking in the water.
      </TextBlock>
      <TextBlock>
        You can explore the village, or approach the boat and its weathered captain, who seems to be making repairs to the sail.
      </TextBlock>
      <SeparatorLine />
      <ChoiceText>
        If you explore the village, <span>turn to page 18</span>
      </ChoiceText>
      <ChoiceText>
        If you approach the boat captain, <span>turn to page 20</span>
      </ChoiceText>
    </div>,
    
    <div key="page6">
      <Heading>THE END</Heading>
      <TextBlock>
        This is just a demonstration of the page-turning animation functionality. In a complete implementation, we would have many more pages with a full branching narrative structure.
      </TextBlock>
      <TextBlock>
        The AnimatedBook component can handle as many pages as needed, with realistic 3D page turning effects and proper state management.
      </TextBlock>
      <SeparatorLine />
      <TurnPageText>The End.</TurnPageText>
    </div>
  ];

  return (
    <PageContainer>
      <AnimatedBook pages={pages} startPage={0} />
    </PageContainer>
  );
} 