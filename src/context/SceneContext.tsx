"use client";

import { createContext, useContext, useState, useCallback } from "react";

export type SectionId = "hero" | "services" | "why-us" | "work" | "contact";

export interface Waypoint {
  position: [number, number, number];
  lookAt: [number, number, number];
  fov: number;
  rotateMode: "none" | "rotTheta" | "rotZ";
}

// Adapted from the reference site's extracted waypoints, tuned for our IT scene
export const WAYPOINTS: Record<SectionId, Waypoint> = {
  hero: {
    position: [0, 4, 9],
    lookAt: [-1.6, 7, -15],
    fov: 50,
    rotateMode: "none",
  },
  services: {
    position: [0, 6.5, 0],
    lookAt: [0, 9.5, 18],
    fov: 26,
    rotateMode: "rotTheta",
  },
  "why-us": {
    position: [0, 2.5, 0],
    lookAt: [15, 3, 0],
    fov: 55,
    rotateMode: "rotZ",
  },
  work: {
    position: [10, 6.5, 0],
    lookAt: [14, 7.5, -11],
    fov: 30,
    rotateMode: "none",
  },
  contact: {
    position: [0, 4, 12],
    lookAt: [-1, 8, -9],
    fov: 50,
    rotateMode: "none",
  },
};

interface SceneContextValue {
  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;
  mouse: { x: number; y: number };
  setMouse: (x: number, y: number) => void;
}

const SceneContext = createContext<SceneContextValue>({
  activeSection: "hero",
  setActiveSection: () => {},
  mouse: { x: 0, y: 0 },
  setMouse: () => {},
});

export function SceneProvider({ children }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [mouse, setMouseState] = useState({ x: 0, y: 0 });

  const setMouse = useCallback((x: number, y: number) => {
    setMouseState({ x, y });
  }, []);

  return (
    <SceneContext.Provider
      value={{ activeSection, setActiveSection, mouse, setMouse }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export const useScene = () => useContext(SceneContext);
