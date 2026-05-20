"use client";

import { useState } from "react";

type Status = "pending" | "escalated" | "overridden";

interface TeamMember {
  name: string;
  role: string;
  focus: string;
  color: "cyan" | "purple" | "pink";
}

const teamMembers: TeamMember[] = [
  { name: "Irina", role: "Business Logic", focus: "User, Problem, AI-native logic, Value", color: "purple" },
  { name: "Nabiha", role: "Workflow and Risk", focus: "Steps, HITL, Dependency, Governance", color: "pink" },
  { name: "Cloudine", role: "Prototype and Tools", focus: "Mockup, OpenClaw, GitHub, Vercel, Supabase, Screenshots", color: "cyan" },
];

const colorMap = {
  cyan: { text: "text-[#00f0ff]", border: "border-[#00f0ff]/30", bg: "bg-[#00f0ff]/10", glow: "box-glow-blue" },
  purple: { text: "text-[#b400ff]", border: "border-[#b400ff]/30", bg: "bg-[#b400ff]/10", glow: "box-glow-purple" },
  pink: { text: "text-[#ff00aa]", border: "border-[#ff00aa]/30", bg: "bg-[#ff00aa]/10", glow: "box-glow-pink" },
};

const RISK_SCORE = 82;
const ALERT_MESSAGE = "Protest breaking out 2km away from Stadium Olympic Zone";
const MITIGATION_POINTS = [
  "Evacuate all spectators from Sections A through D via emergency exits",
  "Coordinate with local law enforcement to establish perimeter at 500m radius",
  "Activate venue lockdown protocol and halt all event operations for 30 minutes",
];

export default function ShieldDashboard() {
  const [status, setStatus] = useState<Status>("pending");
  const [isAlertVisible, setIsAlertVisible] = useState(true);

  const getStatusBadge = () => {
    switch (status) {
      case "pending":
        return { label: "Pending Review", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40" };
      case "escalated":
        return { label: "Escalated", className: "bg-red-500/20 text-red-400 border-red-500/40" };
      case "overridden":
        return { label: "Overridden", className: "bg-green-500/20 text-green-400 border-green-500/40" };
    }
  };

  const getRiskLevel = () => {
    if (status === "overridden") return { label: "Low", className: "text-green-400" };
    if (status === "escalated") return { label: "Critical", className: "text-red-400" };
    return { label: "Critical", className: "text-red-400" };
  };

  const handleApprove = () => {
    setStatus("escalated");
  };

  const handleOverride = () => {
    setStatus("overridden");
  };

  const handleReset = () => {
    setStatus("pending");
    setIsAlertVisible(true);
  };

  const statusBadge = getStatusBadge();
  const riskLevel = getRiskLevel();

  return (
    <div className="min-h-screen bg-[#050510] text-white">
      {/* Header */}
      <header className="border-b border-[#00f0ff]/20 bg-[#0d0d1f]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#00f0ff] box-glow-blue animate-pulse" />
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-[#00f0ff] to-[#b400ff] bg-clip-text text-transparent">
                  Geosport Shield
                </span>
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <span className={`px-3 py-1 text-xs font-bold tracking-wider uppercase rounded-full border ${statusBadge.className}`}>
                {statusBadge.label}
              </span>
              <a href="/" className="text-sm text-gray-400 hover:text-[#00f0ff] transition-colors">
                ← Home
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Alert Banner */}
        {isAlertVisible && (
          <div className="mb-8 relative">
            <div className="absolute -top-2 left-6 px-3 py-1 text-xs font-bold tracking-widest uppercase rounded-full bg-red-500/80 text-white">
              ⚠ Live Alert
            </div>
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/90 border border-red-500/40 box-glow-red">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-bold tracking-widest uppercase text-red-400">Geopolitical Feed</span>
                  </div>
                  <p className="text-lg font-medium text-white">{ALERT_MESSAGE}</p>
                  <p className="text-sm text-gray-400 mt-2 font-inter">Timestamp: {new Date().toLocaleString()} UTC</p>
                </div>
                <button
                  onClick={() => setIsAlertVisible(false)}
                  className="text-gray-500 hover:text-white transition-colors p-1"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: AI Analysis */}
          <div className="lg:col-span-2 space-y-6">
            {/* Risk Score Card */}
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-[#b400ff]/30 box-glow-purple">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">AI Geopolitical Risk Assessment</h2>
                <span className={`text-sm font-bold ${riskLevel.className}`}>
                  {status === "overridden" ? "Adjusted by Human" : "AI-Generated"}
                </span>
              </div>
              
              <div className="flex items-center gap-6">
                {/* Score Circle */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a2e" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="45" fill="none"
                      stroke={status === "overridden" ? "#22c55e" : "#ef4444"}
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${(RISK_SCORE * 2.83)} 283`}
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-3xl font-black ${riskLevel.className}`}>{RISK_SCORE}</span>
                    <span className="text-xs text-gray-400">/100</span>
                  </div>
                </div>

                {/* Risk Details */}
                <div className="flex-1">
                  <div className="mb-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Threat Level</span>
                    <p className={`text-2xl font-bold ${riskLevel.className}`}>{riskLevel.label}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      <span className="text-sm text-gray-300 font-inter">Proximity: 2km from venue</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-500" />
                      <span className="text-sm text-gray-300 font-inter">Crowd size: ~500 and growing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-300 font-inter">Historical precedent: High</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mitigation Summary */}
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-[#00f0ff]/30 box-glow-blue">
              <h2 className="text-lg font-bold text-white mb-4">AI Incident Mitigation Summary</h2>
              <ul className="space-y-3">
                {MITIGATION_POINTS.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#00f0ff]">{i + 1}</span>
                    </span>
                    <span className="text-sm font-inter text-gray-300 pt-1">{point}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-[#00f0ff]/20">
                <p className="text-xs font-inter text-gray-500">
                  Generated by Geosport Shield AI · Scenario-based simulation · Not real-time data
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: HITL Panel */}
          <div className="space-y-6">
            {/* Human-in-the-Loop Panel */}
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-[#b400ff]/30 box-glow-purple">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#b400ff] animate-pulse" />
                <h2 className="text-lg font-bold text-white">Human-in-the-Loop Review</h2>
              </div>
              
              <p className="text-sm font-inter text-gray-400 mb-6">
                Review the AI-generated risk assessment and take action. Your decision will be logged and broadcast to security personnel.
              </p>

              <div className="space-y-3">
                <button
                  onClick={handleApprove}
                  disabled={status === "escalated"}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all ${
                    status === "escalated"
                      ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                      : "bg-[#00f0ff] text-[#050510] hover:bg-[#00d4dd] hover:scale-[1.02] active:scale-[0.98] box-glow-blue"
                  }`}
                >
                  {status === "escalated" ? "✓ Broadcast Sent" : "Approve & Broadcast Security Alert"}
                </button>
                
                <button
                  onClick={handleOverride}
                  disabled={status === "overridden"}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wider uppercase transition-all ${
                    status === "overridden"
                      ? "bg-green-600/50 text-green-300 cursor-not-allowed"
                      : "bg-transparent border-2 border-[#b400ff]/50 text-[#b400ff] hover:bg-[#b400ff]/10 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {status === "overridden" ? "✓ Override Applied" : "Override / Lower Threat Level"}
                </button>
              </div>

              {status !== "pending" && (
                <button
                  onClick={handleReset}
                  className="w-full mt-4 py-2 px-4 rounded-lg text-xs font-inter text-gray-500 hover:text-white transition-colors"
                >
                  ↺ Reset to pending review
                </button>
              )}
            </div>

            {/* Status Timeline */}
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-gray-700/50">
              <h3 className="text-sm font-bold text-white mb-4">Decision Log</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-gray-500 mt-1.5" />
                  <div>
                    <p className="text-xs font-inter text-gray-400">12:26:00 UTC</p>
                    <p className="text-sm text-gray-300">AI assessment generated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className={`w-2 h-2 rounded-full mt-1.5 ${status !== "pending" ? "bg-[#00f0ff] animate-pulse" : "bg-gray-500"}`} />
                  <div>
                    <p className="text-xs font-inter text-gray-400">{new Date().toLocaleTimeString()} UTC</p>
                    <p className={`text-sm ${status !== "pending" ? "text-white" : "text-gray-500"}`}>
                      {status === "pending" ? "Awaiting human review..." : status === "escalated" ? "Alert escalated and broadcast" : "Threat level overridden"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Roles */}
            <div className="p-6 rounded-2xl bg-[#0d0d1f]/80 border border-gray-700/50">
              <h3 className="text-sm font-bold text-white mb-4">Team Roles</h3>
              <div className="space-y-4">
                {teamMembers.map((member) => {
                  const c = colorMap[member.color];
                  return (
                    <div key={member.name} className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full ${c.bg} border ${c.border} flex items-center justify-center flex-shrink-0`}>
                        <span className={`text-sm font-bold ${c.text}`}>{member.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className={`text-sm font-bold ${c.text}`}>{member.name}</p>
                        <p className="text-xs font-inter text-gray-400">{member.role}</p>
                        <p className="text-xs font-inter text-gray-500 mt-0.5">{member.focus}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-xs font-inter text-gray-600">
            Geosport Shield · Level 2 Prototype · Structured mock scenarios only · No live data or API keys used
          </p>
        </div>
      </main>
    </div>
  );
}
