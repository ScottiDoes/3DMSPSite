"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const inputStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,0,153,0.2)",
  borderRadius: 4,
  padding: "0.65rem 0.875rem",
  color: "var(--white)",
  fontSize: "0.875rem",
  outline: "none",
  width: "100%",
  transition: "border-color 0.2s",
};

export default function Contact() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(leftRef.current,  { x: -40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: leftRef.current,  start: "top 80%" } });
    gsap.from(rightRef.current, { x:  40, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 80%" } });
  }, []);

  return (
    <section id="contact" style={{ padding: "120px 1.5rem", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>

        {/* Left — copy */}
        <div ref={leftRef}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "0.75rem" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            Let&apos;s build something{" "}
            <span className="text-stroke">reliable.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 400, fontSize: "0.925rem" }}>
            Start with a free 30-minute IT assessment. We&apos;ll review your current setup, identify gaps, and give you an honest picture — no sales pitch.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {[
              { icon: "✉", text: "hello@apexitsolutions.com" },
              { icon: "✆", text: "(555) 400-0000" },
            ].map(item => (
              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ color: "var(--pink)", fontSize: "1rem", width: 20 }}>{item.icon}</span>
                <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>{item.text}</span>
              </div>
            ))}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", flexShrink: 0 }} />
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Currently accepting new clients</span>
            </div>
          </div>
        </div>

        {/* Right — glass form card */}
        <div ref={rightRef} className="glass-card" style={{ padding: "2.5rem" }}>
          <form style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {["First Name", "Last Name"].map((label, i) => (
                <label key={label} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{label}</span>
                  <input type="text" placeholder={i === 0 ? "Jane" : "Smith"} style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
                </label>
              ))}
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Business Email</span>
              <input type="email" placeholder="jane@company.com" style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Company Size</span>
              <select style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")}>
                <option value="">Select range</option>
                <option>1–10 employees</option>
                <option>11–50 employees</option>
                <option>51–200 employees</option>
                <option>200+ employees</option>
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Biggest IT Challenge</span>
              <textarea rows={4} placeholder="Tell us what's keeping you up at night..." style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
            </label>

            <button type="submit" style={{ padding: "0.875rem", background: "var(--pink)", color: "#0D0D0D", border: "none", borderRadius: 4, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", cursor: "pointer", transition: "opacity 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,0,153,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = "1";    e.currentTarget.style.boxShadow = "none"; }}>
              Request Free Assessment →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
