import Image from "next/image";
import Link from "next/link";
import { 
  BookCover, 
  BrandBadge, 
  IllustrationFrame, 
  BookTitle, 
  Subtitle, 
  AuthorByline,
  CreditLine 
} from "@/components/ui/book-cover";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="w-full h-[95vh] flex flex-col items-center justify-center gap-6">
        <div className="w-full h-full max-h-[95vh] flex items-center justify-center">
          <BookCover className="h-full w-auto">
            <div className="relative flex flex-col h-full">
              {/* Floating Brand Badge */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-full flex justify-center">
                <BrandBadge />
              </div>

              {/* Content Layout */}
              <div className="flex flex-col h-full pt-20">
                {/* Text Section */}
                <div className="text-center px-6 sm:px-8 pb-6">
                  <Subtitle>
                    YOU'RE THE STAR OF THE STORY!<br />
                    CHOOSE FROM 42 POSSIBLE ENDINGS.
                  </Subtitle>
                  
                  <BookTitle>
                    YOU ARE A<br />
                    SOFTWARE ENGINEER
                  </BookTitle>

                  <AuthorByline>by Douglas MacKrell</AuthorByline>
                </div>

                {/* Illustration Section */}
                <div className="flex-grow px-6 sm:px-12 pb-1">
                  <div className="h-[95%]">
                    <IllustrationFrame className="h-full">
                      <Image
                        src="/hero-image.webp"
                        alt="Retro cyberpunk scene with programmer"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                        className="z-0"
                      />
                      {/* Classic CYOA illustration overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10" />
                    </IllustrationFrame>
                  </div>
                  <CreditLine>Copyright © 2024 by Douglas MacKrell • All rights reserved</CreditLine>
                </div>
              </div>
            </div>
          </BookCover>
        </div>

        {/* CTA Button */}
        <Link 
          href="/start" 
          className="bg-red-600 text-white text-xl sm:text-2xl px-8 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-lg"
          style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
        >
          BEGIN YOUR ADVENTURE
        </Link>
      </div>
    </main>
  );
}
