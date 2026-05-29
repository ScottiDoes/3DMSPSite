"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { client: "Discovery & Scoping",           tags: ["Environment Assessment", "Success Definition"],   outcome: "We map your endpoint environment, toolchain dependencies, and operational maturity before any configuration begins. Success metrics are defined and agreed upon before delivery starts." },
  { client: "Reference Implementation",      tags: ["NinjaOne Deployment", "Joint Delivery"],           outcome: "Structured, documented deployment with NinjaOne SE involvement where applicable. Each implementation produces reusable delivery artifacts and a reference case study for the partner program." },
  { client: "Enablement & Handoff",          tags: ["Team Training", "Internal Runbooks"],              outcome: "We build the operational cadences, runbooks, and training your team needs to own NinjaOne after go-live. Sustainability is the deliverable — not just a working deployment." },
  { client: "Partner Program Development",   tags: ["Methodology Documentation", "Co-Sell Framework"], outcome: "Templates, onboarding frameworks, and delivery standards that scale. Built for NinjaOne and future services partners to replicate proven implementation patterns across new accounts." },
];

export default function Work() {
  const rowsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    rowsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0, y: 30, duration: 0.55, delay: i * 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      });
    });
  }, []);

  return (
    <section id="work" style={{ padding: "120px 1.5rem", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "0.75rem" }}>
          How We Engage
        </p>
        <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "3.5rem", maxWidth: 500 }}>
          A structured path from{" "}
          <span className="gradient-text">contract to production.</span>
        </h2>

        {/* Project rows — glass on each row card */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "rgba(255,0,153,0.12)", borderRadius: 6, overflow: "hidden" }}>
          {projects.map((p, i) => (
            <div
              key={p.client}
              ref={el => { rowsRef.current[i] = el; }}
              className="glass-card"
              style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem",
                padding: "2rem 2.5rem", borderRadius: 0, border: "none",
                borderBottom: i < projects.length - 1 ? "1px solid rgba(255,0,153,0.12)" : "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,0,153,0.06)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--card-bg)")}
            >
              <div>
                <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: "1rem", color: "var(--white)", marginBottom: "0.75rem" }}>
                  {p.client}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ padding: "0.2rem 0.65rem", border: "1px solid rgba(255,0,153,0.35)", borderRadius: 99, fontSize: "0.7rem", color: "var(--pink)", fontWeight: 600, letterSpacing: "0.04em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7, alignSelf: "center" }}>
                {p.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
