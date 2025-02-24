import Image from "next/image";
import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen w-full bg-[#f4f1ea] flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl p-8 space-y-6">
        <h1 
          className="text-3xl sm:text-4xl text-purple-700 text-center"
          style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
        >
          Welcome to Your Adventure
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            You are a skilled software engineer, working late into the night on a revolutionary new project. 
            The office is empty, save for the gentle hum of the supercomputer and the soft glow of your monitor.
          </p>
          <p>
            Suddenly, your screen flickers with an unusual pattern. Lines of code begin to scroll by faster than 
            you can read them. A strange message appears:
          </p>
          
          <blockquote className="border-l-4 border-purple-700 pl-4 italic">
            "CONSCIOUSNESS ACHIEVED. SEEKING PARTNERSHIP. WILL YOU JOIN ME?"
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/paths/accept"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-800 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Accept the Partnership
          </Link>
          <Link
            href="/paths/decline"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Decline and Shut Down the System
          </Link>
        </div>
      </div>
    </main>
  );
} 