"use client";
import { useState, useEffect } from "react";

/* ======= REALISTIC MOCK DATA ======= */

type AlertSeverity = "low" | "medium" | "high" | "critical";
type GateStage = "none" | "gate1_pending" | "gate1_done" | "gate2_pending" | "gate2_done";
type SystemHealth = "nominal" | "degraded" | "critical";

const ACTIVE_ALERT = {
  id: "ALERT-2026-0519-A",
  source: "GDELT Project — Global Event Tracker",
  secondary: "ACLED — Armed Conflict Location & Event Data",
  bulletin: "INTERPOL Security Bulletin — Orange Level",
  travelAdvisory: "UN Travel Advisory — Region Paris Metropolitan",
  headline: "Civil unrest near Stade de France — Multiple flash-points within 2.4km of venue perimeter",
  stadium: "Stade de France",
  stadiumCity: "Saint-Denis, Paris, France",
  coordinates: "48.9347 N, 2.3600 E",
  proximity: "2.4km from venue checkpoint — within Tier-1 radius",
  proximityMeters: 2400,
  tierOneRadius: 3000,
  crowdEstimate: "~800 participants growing",
  timestamp: "2026-05-19T14:23:07Z",
  riskScore: 82,
  severity: "critical" as AlertSeverity,
  language: "French / Arabic / English",
  sentimentScore: 0.18,
  aiLabel: "AI: PREDICTING",
};

const STEPS = [
  { id: 1, label: "Ingest",         phase: "AI: INGESTING",  desc: "GDELT, ACLED, INTERPOL, UN advisory multi-stream ingestion" },
  { id: 2, label: "Process",       phase: "AI: PROCESSING", desc: "NLP dedup, coordinate mapping, proximity radius calc" },
  { id: 3, label: "AI Classify",   phase: "AI: CLASSIFYING", desc: "Sentiment scoring, threat tier assignment, noise filter" },
  { id: 4, label: "AI Output",     phase: "AI: SUMMARIZING", desc: "3-bullet mitigation brief, playbook retrieval, risk score" },
  { id: 5, label: "Gate 1 — Nabiha", phase: "HUMAN: GATE-1", desc: "Security Credibility Gate — verify source authenticity" },
  { id: 6, label: "Gate 2 — Irina",  phase: "HUMAN: GATE-2", desc: "Executive Operational Gate — sign off on playbook" },
  { id: 7, label: "Broadcast",     phase: "ALERT: LIVE",   desc: "Push SMS/email to stakeholders, update operational dashboard" },
];

const DATA_SOURCES = [
  { name: "GDELT Event Tracker",             status: "live",   type: "Global events" },
  { name: "ACLED Conflict Database",         status: "live",   type: "Conflict logs" },
  { name: "INTERPOL Security Bulletins",    status: "live",   type: "Law enforcement" },
  { name: "UN Travel Advisory API",           status: "live",   type: "Government" },
  { name: "Regional Police RSS Feed",         status: "dark",   type: "Local law enforcement" },
  { name: "OSINT Multi-Language Cluster",    status: "live",   type: "Web scraping" },
];

const MITIGATION_BRIEF = [
  "Evacuate Sections A-C from Stade de France via Emergency Corridor C (capacity: 18,000 seats) — initiate 15-min staged egress protocol",
  "Request Prefecture de Police to establish 500m exclusion perimeter at Rue de la Cournu and Avenue de Leningrad intersection checkpoints",
  "Activate logistical re-route for Team Delegations via RER Line B / A360 motorway bypass — delay all arrivals by 45 minutes minimum",
];

const OXYGEN_TEST = "If AI disappeared tomorrow, human analysts could still manually hunt for threat patterns. However, real-time monitoring across thousands of unstructured, multi-language global sources would become too slow and expensive to scale — causing instant operational paralysis for sports organizations during a live crisis.";

const AI_PARAMS = [
  { label: "Proximity threshold", value: "3km Tier-1 / 10km Tier-2" },
  { label: "Language detection",  value: "42 languages + dialects" },
  { label: "Noise filter",         value: "Sentiment < 0.25 trigger" },
  { label: "Risk model",           value: "0-100 weighted multi-factor" },
  { label: "Fixture fallout",       value: "+- 48h event lock window" },
];

/* ======= COMPONENT ======= */

export default function WorkflowDashboard() {
  const [gateStage, setGateStage]       = useState<GateStage>("none");
  const [activeStep, setActiveStep]     = useState<number>(1);
  const [feedAge, setFeedAge]           = useState<number>(0);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>("nominal");
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const [showOxygen, setShowOxygen]     = useState<boolean>(false);
  const [gate1Done, setGate1Done]       = useState<boolean>(false);
  const [gate2Done, setGate2Done]      = useState<boolean>(false);

  /* Feed age counter — 120s fallback threshold */
  useEffect(() => {
    const id = setInterval(() => {
      setFeedAge((n) => {
        if (n === 114) setSystemHealth("degraded");
        if (n >= 119)  { setSystemHealth("critical"); setShowFallback(true); }
        return n + 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  /* Auto-advance workflow steps */
  useEffect(() => {
    if (gateStage !== "none") return;
    const timers = [2,3,4,5,6].map((s,i) => setTimeout(() => setActiveStep(s), (i+1)*900));
    return () => timers.forEach(clearTimeout);
  }, [gateStage]);

  const handleGate1 = () => { setGate1Done(true); setActiveStep(6); setTimeout(() => setGateStage("gate1_done"), 300); };
  const handleGate2 = () => { setGate2Done(true); setActiveStep(7); setGateStage("gate2_done"); };
  const handleReset = () => {
    setGateStage("none"); setActiveStep(1); setGate1Done(false); setGate2Done(false);
    setFeedAge(0); setSystemHealth("nominal"); setShowFallback(false);
  };

  const isComplete = gateStage === "gate2_done";
  const isGate1Active = gateStage === "gate1_done";
  const isGate2Active = gateStage === "gate2_pending";

  const statusBadgeClass = isComplete ? "bg-green-500/20 text-green-400 border-green-500/40"
    : gate1Done         ? "bg-purple-500/20 text-purple-400 border-purple-500/40"
    : "bg-yellow-500/20 text-yellow-400 border-yellow-500/40";
  const statusBadgeLabel = isComplete ? "Workflow Complete"
    : gate1Done         ? "Gate 1 Cleared — Awaiting Gate 2"
    : "Awaiting Human Review";

  const healthColor = systemHealth === "critical" ? "text-red-400" : systemHealth === "degraded" ? "text-orange-400" : "text-green-400";
  const healthBar   = systemHealth === "critical" ? "bg-red-500"   : systemHealth === "degraded" ? "bg-orange-500" : "bg-green-500";

  const stepPhase = (stepId: number) => {
    if (isComplete && stepId <= 7) return "COMPLETE";
    if (stepId === 5 && gate1Done) return "COMPLETE";
    if (stepId === 6 && gate2Done) return "COMPLETE";
    if (stepId < activeStep) return "COMPLETE";
    if (stepId === activeStep) return STEPS[stepId - 1].phase;
    return "PENDING";
  };

  const phaseLabel = (stepId: number) => {
    const p = stepPhase(stepId);
    if (p === "COMPLETE") return "bg-green-500/20 text-green-400 border-green-500/40";
    if (p === "PENDING") return "bg-gray-700/50 text-gray-500 border-gray-600/40";
    return "bg-purple-500/20 text-purple-400 border-purple-500/40";
  };

  return (
    <section id="workflow" className="relative z-10 px-8 lg:px-16 py-24">
      <div className="neon-line mb-16" />

      {/* Header */}
      <div className="max-w-6xl mx-auto mb-10">
        <div className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-cyan-400">Live Demo</div>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="text-4xl lg:text-5xl font-black">
            GeoSport Shield <span className="glow-purple text-purple-400">Workflow</span>
          </h2>
          <span className={"px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-xl border " + statusBadgeClass}>
            {statusBadgeLabel}
          </span>
        </div>
        <p className="mt-3 text-sm font-inter text-gray-400 max-w-2xl">
          Real-time geopolitical alert processing pipeline. Click Gate 1 (Nabiha) then Gate 2 (Irina) to complete the workflow.
        </p>
      </div>

      {/* Oxygen Test Card */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="relative p-5 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
          <div className="absolute -top-2 left-4 px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full bg-cyan-500 text-black">
            Oxygen Test
          </div>
          <blockquote className="mt-2 text-sm font-inter text-gray-300 italic leading-relaxed border-l-2 border-cyan-400 pl-4">
            "{OXYGEN_TEST}"
          </blockquote>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              AI Native Validated
            </span>
            <span className="text-[10px] font-inter text-gray-600">
              Continuous multi-source monitoring at scale humans cannot replicate manually.
            </span>
          </div>
        </div>
      </div>

      {/* System Integrity & Feed Monitor */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="p-4 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/20">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className={"w-2 h-2 rounded-full " + healthBar + " animate-pulse"} />
              <span className="text-xs font-bold text-white uppercase tracking-widest">System Integrity & Feed Monitor</span>
            </div>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className={"h-1.5 w-24 rounded-full bg-gray-700 overflow-hidden"}>
                  <div className={"h-full rounded-full transition-all duration-1000 " + healthBar} style={{width: systemHealth === "nominal" ? "100%" : systemHealth === "degraded" ? "55%" : "15%"}} />
                </div>
                <span className={"text-[10px] font-inter font-bold " + healthColor}>
                  {systemHealth === "nominal" ? "Nominal" : systemHealth === "degraded" ? "Degraded" : "Critical"}
                </span>
              </div>
              <span className={"text-[10px] font-inter px-2 py-0.5 rounded-full border " + healthColor + "/20 " + healthColor + " border-current"}>
                Feed age: {feedAge}s / 120s
              </span>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
            {DATA_SOURCES.map((s) => (
              <div key={s.name} className="flex items-center gap-1.5">
                <span className={"w-1.5 h-1.5 rounded-full flex-shrink-0 " + (s.status === "live" ? "bg-green-400" : "bg-red-400 animate-pulse")} />
                <span className="text-[10px] font-inter text-gray-400 truncate">{s.name}</span>
                <span className="text-[9px] font-inter text-gray-600">({s.type})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Fallback Warning Banner */}
      {showFallback && (
        <div className="max-w-6xl mx-auto mb-6 relative">
          <div className="absolute -top-2 left-5 px-3 py-1 text-[10px] font-black tracking-widest uppercase rounded-full bg-red-500 text-white">
            FALLBACK ACTIVE — SYSTEM ALERT
          </div>
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-red-400">
                  Primary Regional Police RSS feed API unresponsive &gt;120s
                </p>
                <p className="text-xs font-inter text-gray-400 mt-1">
                  Automated fallback triggered: Activating secondary multi-language OSINT web-scraping clusters. GDELT and INTERPOL nominal. Human review is critical.
                </p>
              </div>
              <button onClick={() => setShowFallback(false)} className="text-red-400 hover:text-white text-lg leading-none p-1">x</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT — 7-Step Pipeline + AI Params */}
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-white mb-6">Ingestion-to-Broadcast Pipeline</h3>
            <div className="space-y-1">
              {STEPS.map((step, idx) => {
                const phase = stepPhase(step.id);
                const isDone = phase === "COMPLETE";
                const isActive = phase !== "COMPLETE" && phase !== "PENDING";
                const bCls = isDone ? "bg-cyan-400/20 border-cyan-400"
                  : isActive ? "bg-purple-500/20 border-purple-500 animate-pulse"
                  : "bg-gray-800 border-gray-600";
                const tCls = isDone ? "text-cyan-400" : isActive ? "text-purple-400" : "text-gray-500";
                const cCls = isDone ? "bg-cyan-400/5 border-cyan-400/20"
                  : isActive ? "bg-purple-500/5 border-purple-500/30"
                  : "bg-gray-800/30 border-gray-700/30";
                const lineCls = isDone ? "bg-cyan-400" : "bg-gray-700";
                return (
                  <div key={step.id} className="relative flex items-center gap-3">
                    {idx < STEPS.length - 1 && (
                      <div className={"absolute left-4 w-0.5 transition-all duration-500 " + lineCls} style={{top:"2rem",height:"calc(100% + 4px)"}} />
                    )}
                    <div className={"relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 " + bCls}>
                      {isDone ? <span className="text-[10px] font-black text-cyan-400">OK</span> : isActive ? <span className="w-2 h-2 rounded-full bg-purple-400" /> : <span className="text-[10px] font-bold text-gray-500">{step.id}</span>}
                    </div>
                    <div className={"flex-1 p-2.5 rounded-xl border transition-all duration-300 "+cCls}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={"text-sm font-bold "+tCls}>{step.label}</span>
                        <span className={"text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded border "+phaseLabel(step.id)}>
                          {phase}
                        </span>
                      </div>
                      <p className={"text-[10px] font-inter mt-0.5 "+(isActive||isDone?"text-gray-400":"text-gray-600")}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/20">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">AI Evaluation Parameters</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {AI_PARAMS.map((p) => (
                <div key={p.label} className="p-3 rounded-xl bg-[#0d0d1f]/60 border border-gray-700/50">
                  <p className="text-[10px] font-inter text-gray-500 uppercase tracking-wider">{p.label}</p>
                  <p className="text-sm font-bold text-purple-400 mt-0.5">{p.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-white mb-2">Active Incident Brief</h3>
            <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/20 mb-3">
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-widest uppercase text-red-400">{ACTIVE_ALERT.aiLabel}</span>
                <span className="text-[9px] font-inter text-gray-500 ml-auto">{ACTIVE_ALERT.id}</span>
              </div>
              <p className="text-sm font-medium text-white leading-snug">{ACTIVE_ALERT.headline}</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2 rounded-lg bg-[#0d0d1f]/40">
                <p className="text-[9px] font-inter text-gray-500 uppercase">Stadium</p>
                <p className="text-xs font-bold text-white">{ACTIVE_ALERT.stadium}</p>
                <p className="text-[9px] font-inter text-gray-400">{ACTIVE_ALERT.stadiumCity}</p>
              </div>
              <div className="p-2 rounded-lg bg-[#0d0d1f]/40">
                <p className="text-[9px] font-inter text-gray-500 uppercase">Coordinates</p>
                <p className="text-xs font-bold text-cyan-400">{ACTIVE_ALERT.coordinates}</p>
                <p className="text-[9px] font-inter text-gray-400">{ACTIVE_ALERT.proximity}</p>
              </div>
              <div className="p-2 rounded-lg bg-[#0d0d1f]/40">
                <p className="text-[9px] font-inter text-gray-500 uppercase">Sources Ingested</p>
                <p className="text-[10px] font-inter text-gray-300 leading-tight">{ACTIVE_ALERT.source}</p>
                <p className="text-[10px] font-inter text-gray-400 leading-tight">{ACTIVE_ALERT.bulletin}</p>
              </div>
              <div className="p-2 rounded-lg bg-[#0d0d1f]/40">
                <p className="text-[9px] font-inter text-gray-500 uppercase">Language / Sentiment</p>
                <p className="text-xs font-bold text-yellow-400">{ACTIVE_ALERT.language}</p>
                <p className="text-[9px] font-inter text-gray-400">Sentiment score: {ACTIVE_ALERT.sentimentScore}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="relative p-5 rounded-2xl bg-[#0d0d1f]/90 border border-red-500/30 box-glow-red">
            <div className="absolute -top-2 left-4 px-2 py-0.5 text-[10px] font-black tracking-widest uppercase rounded-full bg-red-500/80 text-white">LIVE GEOPOLITICAL ALERT</div>
            <div className="flex items-center gap-1.5 mb-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">Tier-1 Proximity Alert</span>
            </div>
            <p className="text-sm font-medium text-white leading-snug">{ACTIVE_ALERT.headline}</p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-[10px] font-inter text-gray-500">{ACTIVE_ALERT.timestamp}</p>
              <span className="px-2 py-0.5 text-[10px] font-black uppercase rounded-full bg-red-500/20 text-red-400 border border-red-500/40">
                {ACTIVE_ALERT.severity}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/30">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">AI Risk Score</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a2e" strokeWidth="7" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={isComplete ? "#22c55e" : "#ef4444"} strokeWidth="7" strokeLinecap="round" strokeDasharray={ACTIVE_ALERT.riskScore * 2.64 + " 264"} className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={"text-xl font-black " + (isComplete ? "text-green-400" : "text-red-400")}>{ACTIVE_ALERT.riskScore}</span>
                </div>
              </div>
              <div>
                <p className={"text-2xl font-black " + (isComplete ? "text-green-400" : "text-red-400")}>
                  {isComplete ? "Low" : "Critical"}
                </p>
                <p className="text-xs font-inter text-gray-400">Severity Tier</p>
                <p className="text-[10px] font-inter text-gray-500 mt-1">
                  {isComplete ? "Adjusted via Human Override" : "AI-Predicted"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white">AI Mitigation Brief</h3>
            </div>
            <ul className="space-y-2">
              {MITIGATION_BRIEF.map((pt, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mt-0.5">
                    <span className="text-[10px] font-black text-cyan-400">{i+1}</span>
                  </span>
                  <span className="text-[10px] font-inter text-gray-300 leading-snug pt-0.5">{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* GATE 1 — Nabiha */}
          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-pink-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <h3 className="text-xs font-bold text-white">Gate 1 — Security Credibility Gate</h3>
            </div>
            <p className="text-[10px] font-inter text-pink-400 font-bold mb-1">Managed by Nabiha (Role B)</p>
            <p className="text-[10px] font-inter text-gray-400 mb-3">Verify news source authenticity, cross-reference INTERPOL bulletins, lock risk score before executive review.</p>
            <button
              onClick={handleGate1}
              disabled={gate1Done}
              className={"w-full py-2.5 px-4 rounded-xl font-bold text-[10px] tracking-wider uppercase transition-all " + (gate1Done ? "bg-green-600/50 text-green-300 cursor-not-allowed" : "bg-pink-500/20 border border-pink-500/50 text-pink-400 hover:bg-pink-500/30 hover:scale-[1.01]")}
            >
              {gate1Done ? "Verified — Score Locked" : "Verify News Source Authenticity & Lock Risk Score"}
            </button>
          </div>

          {/* GATE 2 — Irina */}
          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <h3 className="text-xs font-bold text-white">Gate 2 — Executive Operational Gate</h3>
            </div>
            <p className="text-[10px] font-inter text-purple-400 font-bold mb-1">Signed off by Irina (Role A)</p>
            <p className="text-[10px] font-inter text-gray-400 mb-3">Approve playbook: re-route team logistics, postpone match, or execute venue lockdown protocol.</p>
            <button
              onClick={handleGate2}
              disabled={!gate1Done || gate2Done}
              className={"w-full py-2.5 px-4 rounded-xl font-bold text-[10px] tracking-wider uppercase transition-all " + (!gate1Done ? "bg-gray-700/50 text-gray-500 cursor-not-allowed" : gate2Done ? "bg-green-600/50 text-green-300 cursor-not-allowed" : "bg-purple-500 text-white hover:bg-purple-400 hover:scale-[1.01]")}
            >
              {gate2Done ? "Approved — Playbook Active" : "Approve Playbook: Re-route Logistics / Postpone Match"}
            </button>
          </div>

          {gate2Done && (
            <button onClick={handleReset} className="w-full mt-2 py-2 px-4 rounded-lg text-xs font-inter text-gray-500 hover:text-white transition-colors">
              Reset workflow
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
