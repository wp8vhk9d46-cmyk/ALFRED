import React from "react";

export function LampContainer({ children, className }) {
  return (
    <div
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black w-full z-0 ${className || ""}`}
    >
      {/* All light layers — absolute, full coverage */}
      <div className="absolute inset-0 flex items-start justify-center z-0">
        {/* Left conic gradient */}
        <div
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, #2a5a8c, transparent 40%, transparent)`,
          }}
          className="absolute top-[10%] right-1/2 h-[28rem] w-[44rem] blur-sm"
        />

        {/* Right conic gradient */}
        <div
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent 60%, #2a5a8c, transparent)`,
          }}
          className="absolute top-[10%] left-1/2 h-[28rem] w-[44rem] blur-sm"
        />

        {/* Primary glow — large, smooth */}
        <div className="absolute top-[10%] left-1/2 -translate-x-1/2 z-20 h-80 w-[54rem] rounded-full bg-[#0e2240] opacity-95 blur-[80px]" />

        {/* Massive downward flood */}
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 z-10 h-[54rem] w-[74rem] rounded-full bg-[#0A1628] opacity-60 blur-[140px]" />

        {/* Mid ambient glow */}
        <div className="absolute top-[18%] left-1/2 -translate-x-1/2 z-10 h-[28rem] w-[64rem] rounded-full bg-[#0e2240] opacity-40 blur-[100px]" />

        {/* Upper oval glow */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-30 h-64 w-[30rem] rounded-full bg-[#1a3a5c] opacity-90 blur-[60px]" />

        {/* Light bar */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-50 h-1.5 w-[44rem] bg-[#3a7abf] blur-[1px]" />

        {/* Core line */}
        <div className="absolute top-[8%] left-1/2 -translate-x-1/2 z-50 h-px w-[38rem] bg-[#6aacdf]" />

        {/* Ceiling cutoff */}
        <div className="absolute top-0 left-0 right-0 h-[8%] z-40 bg-black" />
      </div>

      {/* Content */}
      <div className="relative z-50 flex flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}
