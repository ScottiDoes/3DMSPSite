"use client";

import BackdropShell from "./BackdropShell";

// Single static background image, served from /public. Override the path with
// NEXT_PUBLIC_BACKDROP_IMAGE. A dark overlay keeps foreground text legible.
const IMAGE = process.env.NEXT_PUBLIC_BACKDROP_IMAGE || "/backdrop.jpg";

export default function ImageBackdrop() {
  return (
    <BackdropShell
      background={`linear-gradient(rgba(13,13,13,0.55), rgba(13,13,13,0.78)), url("${IMAGE}") center / cover no-repeat`}
    />
  );
}
