import MemberCard from "@/components/MemberCard";
import WorkflowDashboard from "@/components/WorkflowDashboard";

const members = [
  { name: "Cloudine", color: "cyan" as const, delay: 0, role: "Prototype and Tools" },
  { name: "Irina", color: "purple" as const, delay: 150, role: "Business Logic" },
  { name: "Nabiha", color: "pink" as const, delay: 300, role: "Workflow and Risk" },
];

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#050510] text-white overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid" />

      {/* Glowing orbs */}
      <div className="orb w-[600px] h-[600px] bg-[#00f0ff] top-[-200px] left-[-200px] animate-pulse-glow" />
      <div className="orb w-[500px] h-[500px] bg-[#b400ff] top-[20%] right-[-150px] animate-pulse-glow" style={{ animationDelay: '1s' }} />
      <div className="orb w-[400px] h-[400px] bg-[#ff00aa] bottom-[-100px] left-[30%] animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 lg:px-16">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#00f0ff] box-glow-blue animate-pulse-glow" />
          <span className="text-xl font-bold tracking-widest text-white">ICN</span>
        </div>
        <div className="flex gap-6 text-sm font-inter tracking-wide text-gray-400">
          <a href="#" className="hover:text-[#00f0ff] transition-colors">Home</a>
          <a href="#mission" className="hover:text-[#00f0ff] transition-colors">Mission</a>
          <a href="#team" className="hover:text-[#00f0ff] transition-colors">Team</a>
        </div>
      </nav>

      {/* Neon divider */}
      <div className="relative z-10 neon-line mx-8 lg:mx-16" />

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[75vh] px-6 text-center">
        {/* Decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-[#00f0ff]/10 rounded-full animate-spin-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-[#b400ff]/10 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />

        {/* Team badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-inter font-medium tracking-widest uppercase border rounded-full bg-[#0d0d1f]/80 border-[#00f0ff]/30 box-glow-blue animate-float">
          <span className="w-2 h-2 rounded-full bg-[#00f0ff] animate-pulse" />
          <span className="text-[#00f0ff]">AI Native Team</span>
        </div>

        {/* Main title */}
        <h1 className="text-7xl lg:text-9xl font-black tracking-tighter mb-6">
          <span className="gradient-text">Geosport Shield</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl lg:text-2xl font-inter font-light text-gray-300 mb-12 max-w-xl leading-relaxed">
          Pioneering the future with{" "}
          <span className="text-[#00f0ff] font-medium">Artificial Intelligence</span>
        </p>

        {/* Custom message */}
        <div className="relative px-8 py-5 rounded-2xl bg-[#0d0d1f]/60 border border-[#b400ff]/30 box-glow-purple backdrop-blur-sm max-w-2xl">
          <p className="text-lg lg:text-xl font-inter text-gray-200 cursor-blink">
            &ldquo;Hello, we&apos;re doing our very best to do this project&rdquo;
          </p>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-5 mt-14">
          <a
            href="#mission"
            className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-xl bg-[#00f0ff] text-[#050510] hover:bg-[#00d4dd] transition-all hover:scale-105 box-glow-blue"
          >
            Our Mission
          </a>
          <a
            href="#team"
            className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-xl border border-[#b400ff]/50 text-[#b400ff] hover:bg-[#b400ff]/10 transition-all hover:scale-105"
          >
            Meet the Team
          </a>
          <a
            href="#workflow"
            className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-xl border border-[#ff00aa]/50 text-[#ff00aa] hover:bg-[#ff00aa]/10 transition-all hover:scale-105"
          >
            Live Demo
          </a>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="relative z-10 px-8 lg:px-16 py-24">
        <div className="neon-line mb-20" />
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-4 text-xs font-bold tracking-[0.3em] uppercase text-[#ff00aa]">
            Why We Exist
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-8 leading-tight">
            Our <span className="glow-blue text-[#00f0ff]">Mission</span>
          </h2>
          <div className="relative p-8 lg:p-12 rounded-3xl bg-[#0d0d1f]/70 border border-[#00f0ff]/20 box-glow-blue backdrop-blur-sm">
            <div className="absolute -top-4 left-8 px-4 py-1.5 text-xs font-bold tracking-widest uppercase rounded-full bg-[#050510] border border-[#00f0ff]/40 text-[#00f0ff]">
              Purpose
            </div>
            <p className="text-2xl lg:text-3xl font-light font-inter leading-relaxed text-gray-200">
              To contribute to a{" "}
              <span className="text-[#00f0ff] font-semibold">better world</span>{" "}
              using{" "}
              <span className="text-[#b400ff] font-semibold">AI</span>
            </p>
            <div className="mt-8 flex gap-4">
              <div className="w-2 h-2 rounded-full bg-[#00f0ff] mt-3 flex-shrink-0" />
              <p className="text-sm font-inter text-gray-400 leading-relaxed">
                We believe AI should amplify human potential, solve real-world problems,
                and create positive impact for communities across the globe.
              </p>
            </div>
          </div>
        </div>
      </section>

      <WorkflowDashboard />

      {/* Team Section */}
      <section id="team" className="relative z-10 px-8 lg:px-16 py-24">
        <div className="neon-line mb-20" />
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block mb-4 text-xs font-bold tracking-[0.3em] uppercase text-[#b400ff]">
              The People
            </div>
            <h2 className="text-4xl lg:text-5xl font-black">
              Our <span className="glow-purple text-[#b400ff]">Team</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {members.map((member) => (
              <MemberCard key={member.name} {...member} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 lg:px-16 py-12">
        <div className="neon-line mb-10" />
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#00f0ff] box-glow-blue" />
            <span className="text-sm font-bold tracking-widest">ICN</span>
          </div>
          <p className="text-xs font-inter text-gray-500">
            Building the future with AI &middot; {new Date().getFullYear()}
          </p>
          <div className="flex gap-6 mt-2">
            <a href="https://github.com/DigitalCoa-ch/ai-native-team-24" target="_blank" rel="noopener noreferrer" className="text-xs font-inter text-gray-500 hover:text-[#00f0ff] transition-colors">
              GitHub
            </a>
            <span className="text-gray-700">|</span>
            <a href="https://team-24.apps.digitalcoa.ch" target="_blank" rel="noopener noreferrer" className="text-xs font-inter text-gray-500 hover:text-[#00f0ff] transition-colors">
              Vercel App
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}