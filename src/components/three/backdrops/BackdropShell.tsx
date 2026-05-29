"use client";

import type { ReactNode } from "react";

// Base radial gradient used behind every backdrop (matches the original scene).
export const BASE_GRADIENT =
  "radial-gradient(ellipse at 50% 60%, #111118 0%, #0D0D0D 70%)";

// Fixed, full-viewport container that sits behind all HTML content.
// Every backdrop variant renders its contents inside this shell so the
// positioning/z-index/pointer rules live in exactly one place.
export default function BackdropShell({
  children,
  background = BASE_GRADIENT,
}: {
  children?: ReactNode;
  background?: string;
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        pointerEvents: "none",
        overflow: "hidden",
        background,
      }}
    >
      {children}
    </div>
  );
}
