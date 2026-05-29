"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 20,  suffix: "+",   label: "Years Enterprise Endpoint Experience", color: "var(--pink)"  },
  { value: 1,   suffix: "st",  label: "NinjaOne Marquee Implementation Partner", color: "var(--green)" },
  { value: 500, suffix: "+",   label: "Enterprise Endpoints Deployed",        color: "var(--blue)"  },
  { value: 90,  suffix: "day", label: "First Reference Implementation Target", color: "var(--pink)"  },
];

const pillars = [
  { title: "Enterprise Practitioner, Not an MSP", body: "Nevada James Endpoint Partners was built by people who have delivered complex endpoint management at scale — not generalists learning NinjaOne alongside your deployment." },
  { title: "Methodology Before Technology",       body: "A successful deployment starts with discovery, not configuration. We define success, scope your environment, and build the delivery plan before a single setting is touched." },
  { title: "Sustainable Outcomes",               body: "Implementations succeed when your team can own the platform. We build the internal processes, runbooks, and training that make that real — not just a working deployment at go-live." },
];

function AnimatedNumber({ target, suffix, color }: { target: number; suffix: string; color: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 80%",
      onEnter: () => {
        if (triggered.current) return;
        triggered.current = true;
        const obj = { val: 0 };
        gsap.to(obj, { val: target, duration: 1.8, ease: "power2.out", onUpdate: () => setDisplay(Math.round(obj.val * 10) / 10) });
      },
    });
    return () => st.kill();
  }, [target]);

  return <span ref={ref} style={{ color }}>{display}{suffix}</span>;
}

export default function WhyUs() {
  const pillarsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    pillarsRef.current.forEach((el, i) => {
      if (!el) return;
      gsap.from(el, {
        x: -30, opacity: 0, duration: 0.6, delay: i * 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 85%" },
      });
    });
  }, []);

  return (
    <section id="why-us" style={{ padding: "120px 1.5rem", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "0.75rem" }}>
          Why Nevada James Endpoint Partners
        </p>
        <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "4rem", maxWidth: 560 }}>
          The background that makes the{" "}<span className="text-stroke">difference.</span>
        </h2>

        {/* Stat cards — glass only on the cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "4.5rem" }}>
          {stats.map(s => (
            <div key={s.label} className="glass-card" style={{ padding: "2rem 1.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 700, lineHeight: 1, marginBottom: "0.5rem" }}>
                <AnimatedNumber target={s.value} suffix={s.suffix} color={s.color} />
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Pillars — no card, just left border */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {pillars.map((p, i) => (
            <div
              key={p.title}
              ref={el => { pillarsRef.current[i] = el; }}
              style={{ paddingLeft: "1.5rem", borderLeft: "2px solid var(--pink)" }}
            >
              <h3 style={{ fontFamily: "var(--font-space-grotesk)", fontWeight: 600, fontSize: "1rem", color: "var(--white)", marginBottom: "0.65rem" }}>
                {p.title}
              </h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7, fontSize: "0.875rem" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
