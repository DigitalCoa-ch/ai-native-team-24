export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
      <div className="max-w-3xl space-y-6">
        <div className="text-sm font-semibold tracking-widest text-blue-600 uppercase">
          AI Native Enterprise Lab
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
          Team 24
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed">
          Building AI-native solutions with Next.js, TypeScript, and Tailwind CSS.
          Welcome to our project workspace.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <a
            href="https://github.com/DigitalCoa-ch/ai-native-team-24"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            View on GitHub
          </a>
          <a
            href="https://team-24.apps.digitalcoa.ch"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
          >
            Live App
          </a>
        </div>
      </div>
    </section>
  );
}