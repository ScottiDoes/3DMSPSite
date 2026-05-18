"use client";

import dynamic from "next/dynamic";

const FixedCanvas = dynamic(() => import("./FixedCanvas"), { ssr: false });

export default function FixedCanvasLoader() {
  return <FixedCanvas />;
}
