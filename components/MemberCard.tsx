"use client";

interface MemberCardProps {
  name: string;
  color: "cyan" | "purple" | "pink";
  delay: number;
  role: string;
}

const colorMap = {
  cyan: {
    gradient: "from-[#00f0ff]/20 to-transparent",
    border: "border-[#00f0ff]/30",
    glow: "box-glow-blue",
    text: "text-[#00f0ff]",
    icon: "bg-[#00f0ff]",
  },
  purple: {
    gradient: "from-[#b400ff]/20 to-transparent",
    border: "border-[#b400ff]/30",
    glow: "box-glow-purple",
    text: "text-[#b400ff]",
    icon: "bg-[#b400ff]",
  },
  pink: {
    gradient: "from-[#ff00aa]/20 to-transparent",
    border: "border-[#ff00aa]/30",
    glow: "box-glow-pink",
    text: "text-[#ff00aa]",
    icon: "bg-[#ff00aa]",
  },
};

export default function MemberCard({ name, color, delay }: MemberCardProps) {
  const c = colorMap[color];

  return (
    <div
      className={`group relative p-8 rounded-3xl bg-gradient-to-b ${c.gradient} border ${c.border} card-hover animate-float ${c.glow}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Avatar circle */}
      <div className="flex items-center justify-center mb-6">
        <div className={`w-20 h-20 rounded-full border-2 ${c.border} ${c.glow} flex items-center justify-center`}>
          <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center`}>
            <span className={`text-2xl font-bold ${c.text}`}>
              {name.charAt(0)}
            </span>
          </div>
        </div>
      </div>

      {/* Name */}
      <h3 className={`text-2xl font-bold mb-2 ${c.text}`}>
        {name}
      </h3>

      {/* Role */}
      <p className="text-sm font-inter text-gray-400 mb-6">
        {role}
      </p>

      {/* Decorative line */}
      <div className={`h-1 w-0 group-hover:w-full rounded-full bg-gradient-to-r from-transparent via-${color} to-transparent transition-all duration-500`}
           style={{ background: `linear-gradient(90deg, transparent, var(--neon-${color}), transparent)` }} />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
           style={{ boxShadow: `inset 0 0 30px rgba(${color === 'cyan' ? '0,240,255' : color === 'purple' ? '180,0,255' : '255,0,170'}, 0.1)` }} />
    </div>
  );
}