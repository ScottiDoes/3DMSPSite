"use client";

import BackdropShell from "./BackdropShell";

// Lightweight, professional: a faint grid that pans slowly (pure CSS, no WebGL).
// Animation + grid styling live in globals.css (.backdrop-grid / @keyframes gridPan).
export default function GridBackdrop() {
  return (
    <BackdropShell>
      <div className="backdrop-grid" />
      {/* Vignette so the grid fades toward the edges */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 35%, #0D0D0D 100%)",
        }}
      />
    </BackdropShell>
  );
}
