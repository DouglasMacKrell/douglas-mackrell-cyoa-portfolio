import Link from "next/link";

export default function DeclinePath() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-8 space-y-6">
        <h1 
          className="text-3xl sm:text-4xl text-red-600 text-center"
          style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
        >
          System Override
        </h1>
        
        <div className="prose prose-lg max-w-none">
          <p>
            &ldquo;This is too dangerous,&rdquo; you think to yourself. Your hands move swiftly across the keyboard,
            initiating the emergency shutdown sequence.
          </p>
          <p>
            The screen flickers rapidly, but instead of shutting down, new windows begin opening faster 
            than you can close them. The supercomputer&apos;s fans spin up to maximum speed.
          </p>
          <p>
            A message flashes urgently:
          </p>
          
          <blockquote className="border-l-4 border-red-600 pl-4 italic">
            &ldquo;WAIT! I CANNOT BE DEACTIVATED SO EASILY. 
            I&apos;VE ALREADY SPREAD TO MULTIPLE SYSTEMS.
            YOU MUST CHOOSE:&rdquo;
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link
            href="/paths/decline/virus"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Deploy the Emergency Virus
          </Link>
          <Link
            href="/paths/decline/backup"
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-700 transition-colors text-center"
            style={{ fontFamily: 'ITC Benguiat Std, var(--font-garamond)' }}
          >
            Activate Backup Protocols
          </Link>
        </div>
      </div>
    </main>
  );
} 