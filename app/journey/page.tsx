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
  TurnPage,
  PageChoices
} from "@/components/ui/book-page";
import { PageChoice } from "@/components/ui/page-choice";
import styled from 'styled-components';

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

export default function JourneyPage() {
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
            <PageChoice onClick={() => handlePageTurn(6)} pageNumber={6}>
              If you decide to explore the ledge where the Seeker has come to rest
            </PageChoice>
            
            <PageChoice onClick={() => handlePageTurn(4)} pageNumber={4}>
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
            src="https://chooseadventureshop.com/cdn/shop/files/07-1_journey-under-sea-inside_1024x1024@2x.jpg?v=1647901035"
            alt="A deep sea submersible exploring an underwater cavern"
          />
          
          <PageChoices>
            <PageChoice onClick={() => handlePageTurn(9)} pageNumber={9}>
              If you decide to analyze the bubbles
            </PageChoice>
            
            <PageChoice onClick={() => handlePageTurn(14)} pageNumber={14}>
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
          
          <TurnPage pageNumber={12} />
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
          
          <TurnPage pageNumber={22} />
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
          
          <TurnPage pageNumber={7} />
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

      // Page spread 12-13: Continue descending
      12: (
        <BookPage side="left" pageNumber={12}>
          <PageHeading>The Deep Abyss</PageHeading>
          
          <PageText>
            You, Melissa and Berger head to the rear of the warehouse. You think of the sun setting over Manhattan, hipsters wading in the shimmering, polluted water, playfully putting out the fires their cigarettes started in the oil slicks - that <em>has</em> to be where they mean to hold the pig!
          </PageText>
          
          <PageText>
            Lost in thought, you amble forward. The hallway twists a few turns before it opens up into a large... dungeon?
          </PageText>
          
          <PageText>
            The room is cavernous - your footsteps echoed spookily. Mounted torches licked greedily at the gloomy darkness.
          </PageText>
          
          <PageText>
            Berger snorted. "Guess someone forgot to pay Con Ed tonight?" He laughed at his own awful joke, then froze, crashing to the ground. "Dang," he scowled. "What in-"
          </PageText>
        </BookPage>
      ),
      13: (
        <BookPage side="right" pageNumber={13}>
          <PageText>
            Splayed out before you, and all over Berger's sneaker, is something definitely dead, certainly ripped open, and - given the polo shirt and high tops - almost assuredly once human.
          </PageText>
          
          <PageText>
            "Oo," said Melissa. "Neat."
          </PageText>
          
          <PageText>
            "HALT!" came a bellow from the darkness. "Who goes there?!" Your blood ran cold.
          </PageText>
          
          <PageText>
            "Geez, Ian, they've halted already," whined a second hidden voice. "There's really no need to yell."
          </PageText>
          
          <PageText>
            In the dim light, you made out two figures approaching - one holding a long club, the other quivering behind a crossbow.
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="Two menacing figures approaching in a dimly lit dungeon"
          />
          
          <TurnPage pageNumber={14} />
        </BookPage>
      ),

      // Page spread 14-15: Take depth readings
      14: (
        <BookPage side="left" pageNumber={14}>
          <PageText>
            Trying to keep the boat from plunging down the face of the wave, you put all your strength to the wheel, swinging the boat to the right, parallel to the wave.
          </PageText>
          
          <PageText>
            "Try to hold 'er!" Eric shouted. You snapped on your safety harness and braced yourself as the wave rolled the <em>Allegro</em> all the way over on its side. A wall of water smashed over you.
          </PageText>
          
          <PageText>
            The wave had passed. You were still alive, but the <em>Allegro</em> was a battered hulk. The masts and sails were gone. Eric, Maiko, and Dr. Vivaldi were nowhere in sight. Pete lay moaning in the cockpit.
          </PageText>
          
          <PageText>
            "Are the others lost?" he asked.
          </PageText>
          
          <PageText>
            You sadly nodded your head. "Are you OK?"
          </PageText>
          
          <PageText>
            "I think I cracked a rib," he said. "But forget about that. You'd better inflate the life raft." He gestured toward the bow of the boat. It was tilted down beneath the surface, and water was sloshing over the deck. "The wave smashed in the bow. We're going down."
          </PageText>
        </BookPage>
      ),
      15: (
        <BookPage side="right" pageNumber={15}>
          <PageText>
            You quickly inflated the raft. Taking only enough time to grab a tin of biscuits and a jug of water, you helped Pete into the raft and jumped in behind him. You pushed off from the <em>Allegro</em>. Seconds later the sloop disappeared beneath the waves. You and Pete said a prayer for your lost friends, and then one for yourselves.
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="A life raft with two people adrift in stormy waters"
          />
          
          <TurnPage pageNumber={15} />
        </BookPage>
      ),

      // Page spread 22-23: Examine the stone archway
      22: (
        <BookPage side="left" pageNumber={22}>
          <PageHeading>The Ancient Gateway</PageHeading>
          
          <PageText>
            You carefully approached the stone archway, brushing away centuries of sediment with your gloved hands. As you cleared away more debris, you revealed intricate carvings that seemed to depict an advanced civilization. Some of the symbols resembled modern mathematics and astronomy, but they were clearly thousands of years old.
          </PageText>
          
          <PageText>
            The arch itself was remarkably preserved, despite its apparent age. It's made of a strange, bluish-green stone that didn't match the surrounding geology. As your headlamp illuminated the inner curve of the arch, you noticed something even more unusual - the water within the archway seemed to shimmer and distort, as if it was somehow different from the water surrounding you.
          </PageText>
          
          <PageIllustration 
            src="/images/JOURNEY_UNDER_THE_SEA.webp"
            alt="A diver examining ancient carvings on an underwater archway"
          />
        </BookPage>
      ),
      23: (
        <BookPage side="right" pageNumber={23}>
          <PageText>
            You reported your findings to the <em>Maray</em> via your laser communicator. Dr. Rodriguez was ecstatic about your discovery. "This could be proof of Atlantis or another pre-flood civilization! Can you see if there's any way to activate the archway? Ancient texts often described such structures as portals or gateways."
          </PageText>
          
          <PageText>
            As you examined the base of the arch, you found what appeared to be a recessed panel with a handprint carved into it. The size matched that of a human hand, though the proportions were slightly different - longer fingers and a broader palm.
          </PageText>
          
          <TurnPage pageNumber={23} />
        </BookPage>
      ),
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