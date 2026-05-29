"use client";

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

// ── Backdrop registry ─────────────────────────────────────────────────────────
// Maps a backdrop key → the component that renders it. Each is lazily imported
// with ssr:false, so only the selected variant's chunk is ever loaded.
//
// To swap the site's backdrop, set NEXT_PUBLIC_BACKDROP to one of these keys
// (in .env.local / your host's env) and redeploy. Unknown/unset → "network".
//
// Add a new backdrop = create the component, then add one line here.
const BACKDROPS: Record<string, ComponentType> = {
  network:   dynamic(() => import("./FixedCanvas"),                 { ssr: false }),
  starfield: dynamic(() => import("./backdrops/StarfieldBackdrop"), { ssr: false }),
  grid:      dynamic(() => import("./backdrops/GridBackdrop"),      { ssr: false }),
  flat:      dynamic(() => import("./backdrops/FlatBackdrop"),      { ssr: false }),
  image:     dynamic(() => import("./backdrops/ImageBackdrop"),     { ssr: false }),
};

export default function FixedCanvasLoader() {
  const key = (process.env.NEXT_PUBLIC_BACKDROP || "network").toLowerCase();
  const Backdrop = BACKDROPS[key] ?? BACKDROPS.network;
  return <Backdrop />;
}
