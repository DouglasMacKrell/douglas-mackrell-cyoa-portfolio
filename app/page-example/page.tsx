'use client';

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

export default function PageExamplePage() {
  return (
    <BookLayout
      leftPage={
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
            <PageChoice href="#ledge" pageNumber={6}>
              If you decide to explore the ledge where the Seeker has come to rest, turn to page 6.
            </PageChoice>
            
            <PageChoice href="#dive" pageNumber={4}>
              If you decide to cut loose from the Maray and dive with the Seeker into the canyon in the ocean floor, turn to page 4.
            </PageChoice>
          </PageChoices>
        </BookPage>
      }
      rightPage={
        <BookPage side="right" pageNumber={3}>
          <PageText>
            Carefully maneuvering the <em>Seeker</em> between the walls of the canyon, you discover a large round hole. A stream of large bubbles flows steadily out of the hole. The <em>Seeker</em> is equipped with scientific equipment to analyze the bubbles. It also has sonar equipment that can measure depth. The ocean covers close to 90% of the earth and is mostly unknown. Who knows where this hole might lead?
          </PageText>
          
          <PageIllustration 
            src="/underwater-explorer.jpg"
            alt="A deep sea submersible exploring an underwater cavern"
          />
          
          <PageChoices>
            <PageChoice href="#analyze" pageNumber={9}>
              If you decide to analyze the bubbles, turn to page 9.
            </PageChoice>
            
            <PageChoice href="#depth" pageNumber={14}>
              If you decide to take depth readings, turn to page 14.
            </PageChoice>
          </PageChoices>
        </BookPage>
      }
    />
  );
} 