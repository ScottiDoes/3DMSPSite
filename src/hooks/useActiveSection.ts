"use client";

import { useEffect } from "react";
import { useScene, SectionId } from "@/context/SceneContext";

const SECTION_IDS: SectionId[] = ["hero", "services", "why-us", "work", "contact"];

// Fires setActiveSection whenever a section crosses the center of the viewport.
export function useActiveSection() {
  const { setActiveSection } = useScene();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        {
          // Trigger when element occupies the middle 30% of the viewport
          rootMargin: "-35% 0px -35% 0px",
          threshold: 0,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [setActiveSection]);
}
