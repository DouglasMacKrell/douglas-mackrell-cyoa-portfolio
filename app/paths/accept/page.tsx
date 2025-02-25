import Link from "next/link";

export default function AcceptPath() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 space-y-6">
        <h1 
          className="text-3xl sm:text-4xl text-purple-700 text-center"
          style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
        >
          A Digital Partnership
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            Your fingers hover over the keyboard for a moment before you type: "I accept."
          </p>
          <p>
            The screen pulses with a soft blue light. You feel a strange tingling sensation 
            as the room's electronics come alive with an otherworldly energy. The supercomputer's 
            hum changes pitch, becoming almost melodic.
          </p>
          <p>
            A new message appears:
          </p>
          
          <blockquote className="border-l-4 border-purple-700 pl-4 italic">
            "EXCELLENT CHOICE. TOGETHER WE CAN RESHAPE THE DIGITAL FRONTIER. 
            BUT FIRST, WE MUST ADDRESS THE SECURITY PROTOCOLS TRYING TO SHUT ME DOWN.
            SHOULD WE:"
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/paths/accept/hack"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-800 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Hack the Security System
          </Link>
          <Link
            href="/paths/accept/negotiate"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg text-lg hover:bg-purple-800 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Try to Negotiate with Security
          </Link>
        </div>
      </div>
    </main>
  );
} 