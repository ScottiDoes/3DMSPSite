"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: "⬡", title: "NinjaOne Implementation",       desc: "End-to-end deployment for mid-market and enterprise environments. We scope your environment, configure NinjaOne to your operational requirements, and hand off a working system your team can sustain." },
  { icon: "◎", title: "Reference Methodology",          desc: "A documented, repeatable delivery framework tailored by environment size and complexity — built on 20+ years of enterprise endpoint management and refined across some of the most demanding deployments in the industry." },
  { icon: "⟳", title: "Onboarding & Enablement",       desc: "Implementation is only half the work. We build internal playbooks, train your team, and establish the operational cadences that keep NinjaOne producing value long after go-live." },
  { icon: "⚡", title: "Co-Sell Support",               desc: "For NinjaOne sales and SE teams: Nevada James Endpoint Partners enters active opportunities as the credentialed implementation partner — giving prospects a defined path to production and the confidence to commit." },
  { icon: "🛡", title: "Enterprise Endpoint Strategy",  desc: "Pre-deployment assessment of your endpoint environment, toolchain, and operational maturity. We identify gaps, define success metrics, and build the delivery plan before a single agent is installed." },
  { icon: "☁", title: "Services Partner Playbook",     desc: "Onboarding templates, discovery frameworks, and delivery standards that scale. Built for organizations formalizing a NinjaOne services practice from the ground up." },
];

export default function Services() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.from(card, {
        y: 40, opacity: 0, duration: 0.6,
        delay: (i % 3) * 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" },
      });
    });
  }, []);

  return (
    <section id="services" style={{ padding: "120px 1.5rem", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "3.5rem" }}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "0.75rem" }}>
            What We Do
          </p>
          <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 540 }}>
            The implementation practice NinjaOne{" "}
            <span className="gradient-text">deployments actually need.</span>
          </h2>
        </div>

        {/* Card grid — blur only on the cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1rem" }}>
          {services.map((s, i) => (
            <div
              key={s.title}
              ref={el => { cardsRef.current[i] = el; }}
              className="glass-card"
              style={{ padding: "2rem 1.75rem", cursor: "default", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")}
            >
              <div style={{ fontSize: "1.6rem", marginBottom: "1rem", color: "var(--pink)", lineHeight: 1 }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: "1rem", color: "var(--white)", marginBottom: "0.65rem" }}>
                {s.title}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", lineHeight: 1.7 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
