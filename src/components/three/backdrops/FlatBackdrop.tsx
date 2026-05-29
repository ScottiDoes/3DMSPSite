"use client";

import BackdropShell from "./BackdropShell";

// Pure CSS, no Three.js. A clean corporate dark gradient — the most
// "traditional" option, with zero WebGL/runtime cost.
export default function FlatBackdrop() {
  return (
    <BackdropShell background="linear-gradient(160deg, #14141c 0%, #0D0D0D 55%, #08080b 100%)" />
  );
}
