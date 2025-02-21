import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-gradient-to-b from-slate-900 to-black shadow-[0_0_15px_rgba(0,255,255,0.3)] rounded-lg overflow-hidden border border-cyan-500/30">
        {/* Header */}
        <div className="bg-red-600 text-white p-4 flex justify-between items-center shadow-[0_0_10px_rgba(255,0,0,0.3)]">
          <h1 className="text-xl font-black tracking-wider">CHOOSE YOUR OWN ADVENTURE</h1>
          <span className="text-lg font-mono bg-black/20 px-2 py-1 rounded">#404</span>
        </div>

        {/* Main Content */}
        <div className="p-8 text-center bg-gradient-to-b from-slate-900/50 to-black/50 text-white">
          <div className="mb-8">
            <h2 className="text-xl font-black tracking-wide mb-2 text-cyan-400">YOU'RE THE STAR OF THE STORY!</h2>
            <p className="text-cyan-300 font-bold">CHOOSE FROM 42 POSSIBLE ENDINGS.</p>
          </div>

          <h1 className="text-5xl font-black mb-6 leading-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            TRIAL OF THE<br />
            CYBERSPACE<br />
            SUPERCOMPUTER<br />
            SOFTWARE ENGINEER
          </h1>

          <p className="text-lg text-cyan-200 font-mono">by Douglas MacKrell</p>
        </div>

        {/* Hero Image */}
        <div className="relative w-full h-[600px]">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <Image
            src="/hero-image.webp"
            alt="Retro cyberpunk scene with programmer"
            fill
            style={{ objectFit: 'cover' }}
            priority
            className="z-0"
          />
        </div>
      </div>
    </div>
  );
}
