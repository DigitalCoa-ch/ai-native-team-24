"use client";
import { useState, useEffect } from "react";
type Status = "pending" | "escalated" | "overridden";
const WORKFLOW_STEPS = [
  { id: 1, label: "Ingest",        desc: "Multi-language feeds and RSS" },
  { id: 2, label: "Process",      desc: "Parse, filter, map coordinates" },
  { id: 3, label: "AI Classify",  desc: "Risk scoring and severity tier" },
  { id: 4, label: "AI Output",    desc: "3-bullet mitigation brief" },
  { id: 5, label: "Human Review", desc: "HITL gate -- approve or override" },
  { id: 6, label: "Broadcast",   desc: "Push alerts to stakeholders" },
];
const DATA_SOURCES = [
  { name: "GDELT Event Tracker",           status: "live" as const },
  { name: "Government Travel Advisories", status: "live" as const },
  { name: "Sports Calendar API",           status: "live" as const },
  { name: "Local RSS Feed (Region)",       status: "dark"  as const },
];
const AI_PARAMS = [
  { label: "Proximity threshold", value: "<= 5km radius" },
  { label: "Language detection",  value: "42 languages" },
  { label: "Noise filter",        value: "NLP sentiment < 0.3" },
  { label: "Risk model",          value: "0-100 weighted score" },
  { label: "Fallout window",      value: "+- 48h fixture lock" },
];
const MITIGATION = [
  "Evacuate spectators from Sections A-D via emergency exits",
  "Establish 500m perimeter with local law enforcement",
  "Halt event operations for 30 minutes -- venue lockdown",
];
export default function WorkflowDashboard() {
  const [status, setStatus] = useState<Status>("pending");
  const [workflowStep, setWorkflowStep] = useState<number>(1);
  const [feedAge, setFeedAge] = useState<number>(0);
  const [fallbackActive, setFallbackActive] = useState<boolean>(false);
  const [showFallback, setShowFallback] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setFeedAge((n) => { if (n >= 119) { setFallbackActive(true); setShowFallback(true); } return n + 1; });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (status !== "pending") return;
    const timers = [2,3,4,5].map((s,i) => setTimeout(() => setWorkflowStep(s), (i+1)*800));
    return () => timers.forEach(clearTimeout);
  }, [status]);

  const handleApprove  = () => { setStatus("escalated");  setWorkflowStep(6); };
  const handleOverride = () => { setStatus("overridden"); setWorkflowStep(5); };
  const handleReset = () => { setStatus("pending"); setWorkflowStep(1); setFeedAge(0); setFallbackActive(false); setShowFallback(false); };

  const badgeClass = { pending:"bg-yellow-500/20 text-yellow-400 border-yellow-500/40", escalated:"bg-red-500/20 text-red-400 border-red-500/40", overridden:"bg-green-500/20 text-green-400 border-green-500/40" }[status];
  const badgeLabel = { pending:"Human Review Required", escalated:"Escalated -- Alert Sent", overridden:"Overridden -- Safe" }[status];
  const riskColor = status === "overridden" ? "text-green-400" : "text-red-400";
  const riskLabel = status === "overridden" ? "Low" : "Critical";
  const barColor = feedAge >= 120 ? "bg-red-500" : feedAge >= 115 ? "bg-orange-500" : "bg-cyan-400";
  const txtColor = feedAge >= 120 ? "text-red-400" : feedAge >= 115 ? "text-orange-400" : "text-gray-500";

  return (
    <section id="workflow" className="relative z-10 px-8 lg:px-16 py-24">
      <div className="neon-line mb-16" />
      <div className="max-w-6xl mx-auto mb-10">
        <div className="inline-block mb-3 text-xs font-bold tracking-widest uppercase text-cyan-400">Live Demo</div>
        <div className="flex items-end justify-between flex-wrap gap-3">
          <h2 className="text-4xl lg:text-5xl font-black">GeoSport Shield <span className="glow-purple text-purple-500">Workflow</span></h2>
          <span className={"px-4 py-2 text-sm font-bold tracking-wider uppercase rounded-xl border "+badgeClass}>{badgeLabel}</span>
        </div>
        <p className="mt-3 text-sm font-inter text-gray-400 max-w-2xl">Raw alert to AI processing to human gatekeeper decision to broadcast outcome. Click a button to interact.</p>
      </div>

      {showFallback && (
        <div className="max-w-6xl mx-auto mb-6 relative">
          <div className="absolute -top-2 left-5 px-3 py-1 text-xs font-black tracking-widest uppercase rounded-full bg-orange-500 text-white">Warning -- Fallback Activated</div>
          <div className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-orange-400">Regional feed offline &gt;120s -- data pipeline fragility detected</p>
                <p className="text-xs font-inter text-gray-400 mt-1">GDELT and Government Advisory feeds nominal. Local RSS feed has gone dark. AI operating on cached data -- human review is critical.</p>
              </div>
              <button onClick={() => setShowFallback(false)} className="text-orange-400 hover:text-white transition-colors text-lg leading-none p-1">x</button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
            <h3 className="text-sm font-bold text-white mb-6">6-Step Ingestion-to-Alert Pipeline</h3>
            <div className="space-y-2">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isDone = workflowStep > step.id || (step.id === 6 && status === "escalated");
                const isActive = workflowStep === step.id && status === "pending";
                const bCls = isDone ? "bg-cyan-400/20 border-cyan-400" : isActive ? "bg-purple-500/20 border-purple-500 animate-pulse" : "bg-gray-800 border-gray-600";
                const tCls = isDone ? "text-cyan-400" : isActive ? "text-purple-400" : "text-gray-500";
                const cCls = isDone ? "bg-cyan-400/5 border-cyan-400/20" : isActive ? "bg-purple-500/5 border-purple-500/30" : "bg-gray-800/30 border-gray-700/30";
                const lineColor = workflowStep > step.id ? "bg-cyan-400" : "bg-gray-700";
                return (
                  <div key={step.id} className="relative flex items-center gap-4">
                    {idx < WORKFLOW_STEPS.length - 1 && (
                      <div className={"absolute left-4 w-0.5 transition-all duration-500 "+lineColor} style={{top:"2rem",height:"calc(100% + 8px)"}} />
                    )}
                    <div className={"relative z-10 w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-500 "+bCls}>
                      {isDone ? <span className="text-xs font-black text-cyan-400">OK</span> : isActive ? <span className="w-2 h-2 rounded-full bg-purple-400" /> : <span className="text-xs font-bold text-gray-500">{step.id}</span>}
                    </div>
                    <div className={"flex-1 p-3 rounded-xl border transition-all duration-300 "+cCls}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={"text-sm font-bold "+tCls}>{step.label}</span>
                        {isActive && <span className="px-1.5 py-0.5 text-[10px] font-black tracking-wider uppercase rounded bg-purple-500/20 text-purple-400">Active</span>}
                        {isDone && step.id === 6 && status === "escalated" && <span className="px-1.5 py-0.5 text-[10px] font-black tracking-wider uppercase rounded bg-red-500/20 text-red-400">Alert Sent</span>}
                        {isDone && step.id === 5 && status === "overridden" && <span className="px-1.5 py-0.5 text-[10px] font-black tracking-wider uppercase rounded bg-green-500/20 text-green-400">Overridden</span>}
                      </div>
                      <p className={"text-xs font-inter mt-0.5 "+(isActive||isDone?"text-gray-400":"text-gray-600")}>{step.desc}</p>
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
            <h3 className="text-sm font-bold text-white mb-4">Data Inputs</h3>
            <div className="space-y-2">
              {DATA_SOURCES.map((src) => (
                <div key={src.name} className="flex items-center justify-between p-2 rounded-lg bg-[#0d0d1f]/40">
                  <span className="text-xs font-inter text-gray-300">{src.name}</span>
                  <span className={"text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full "+(src.status==="live"?"bg-green-500/20 text-green-400":"bg-red-500/20 text-red-400")}>
                    {src.status === "live" ? "LIVE" : "OFFLINE"}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex items-center gap-2">
              <div className="h-1.5 flex-1 rounded-full bg-gray-700 overflow-hidden">
                <div className={"h-full rounded-full transition-all duration-1000 "+barColor} style={{width:Math.min((feedAge/120)*100,100)+"%"}} />
              </div>
              <span className={"text-[10px] font-inter font-bold "+txtColor}>{feedAge}s / 120s</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="relative p-5 rounded-2xl bg-[#0d0d1f]/90 border border-red-500/30 box-glow-red">
            <div className="absolute -top-2 left-4 px-2 py-0.5 text-[10px] font-black tracking-widest uppercase rounded-full bg-red-500/80 text-white">Incoming Alert</div>
            <div className="flex items-center gap-1.5 mb-2 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">Geopolitical Feed</span>
            </div>
            <p className="text-sm font-medium text-white leading-snug">Protest breaking out 2km away from Stadium Olympic Zone</p>
            <p className="text-[10px] font-inter text-gray-500 mt-2">{new Date().toLocaleTimeString()} UTC -- 82/100 Critical</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/30">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">AI Risk Score</h3>
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1a1a2e" strokeWidth="7" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={status==="overridden"?"#22c55e":"#ef4444"} strokeWidth="7" strokeLinecap="round" strokeDasharray={82*2.64+" 264"} className="transition-all duration-700" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={"text-xl font-black "+riskColor}>82</span>
                </div>
              </div>
              <div>
                <p className={"text-2xl font-black "+riskColor}>{riskLabel}</p>
                <p className="text-xs font-inter text-gray-400">Severity Tier</p>
                {status !== "pending" && <p className="text-[10px] font-inter text-gray-500 mt-1">{status==="escalated"?"Adjusted: Escalated":"Adjusted: Overridden"}</p>}
              </div>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-cyan-500/20">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white">AI Mitigation Brief</h3>
            </div>
            <ul className="space-y-2">
              {MITIGATION.map((point,i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-400/15 border border-cyan-400/30 flex items-center justify-center mt-0.5">
                    <span className="text-[10px] font-black text-cyan-400">{i+1}</span>
                  </span>
                  <span className="text-xs font-inter text-gray-300 leading-snug pt-0.5">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-[#0d0d1f]/80 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
              <h3 className="text-sm font-bold text-white">Human-in-the-Loop Review</h3>
            </div>
            <p className="text-xs font-inter text-gray-400 mb-4">Review the AI assessment and take action. AI cannot autonomously broadcast -- you must click to confirm.</p>
            <div className="space-y-3">
              <button onClick={handleApprove} disabled={status === "escalated"} className={"w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all "+(status==="escalated"?"bg-gray-600/50 text-gray-400 cursor-not-allowed":"bg-cyan-400 text-[#050510] hover:bg-cyan-300 box-glow-blue")}>
                {status === "escalated" ? "OK Broadcast Sent" : "Approve & Broadcast Security Alert"}
              </button>
              <button onClick={handleOverride} disabled={status === "overridden"} className={"w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all "+(status==="overridden"?"bg-green-600/50 text-green-300 cursor-not-allowed":"bg-transparent border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500/10")}>
                {status === "overridden" ? "OK Override Applied" : "Override / Lower Threat Level"}
              </button>
            </div>
            {status !== "pending" && (
              <button onClick={handleReset} className="w-full mt-3 py-2 px-4 rounded-lg text-xs font-inter text-gray-500 hover:text-white transition-colors">
                Reset to pending review
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
