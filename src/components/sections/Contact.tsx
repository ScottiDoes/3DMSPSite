"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SubmitState = "idle" | "submitting" | "success" | "error";

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

  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    gsap.from(leftRef.current,  { x: -40, opacity: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: leftRef.current,  start: "top 80%" } });
    gsap.from(rightRef.current, { x:  40, opacity: 0, duration: 0.8, delay: 0.15, ease: "power3.out", scrollTrigger: { trigger: rightRef.current, start: "top 80%" } });
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "submitting") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName:  String(data.get("lastName") ?? ""),
      email:     String(data.get("email") ?? ""),
      status:    String(data.get("status") ?? ""),
      message:   String(data.get("message") ?? ""),
      company:   String(data.get("company") ?? ""), // honeypot
    };

    setState("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setState("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  return (
    <section id="contact" style={{ padding: "120px 1.5rem", background: "transparent" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>

        {/* Left — copy */}
        <div ref={leftRef}>
          <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--pink)", marginBottom: "0.75rem" }}>
            Get in Touch
          </p>
          <h2 style={{ fontFamily: "var(--font-space-grotesk)", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "1.5rem" }}>
            Let&apos;s talk{" "}
            <span className="text-stroke">migration.</span>
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: "2.5rem", maxWidth: 400, fontSize: "0.925rem" }}>
            Schedule a 45-minute working session to discuss your current EMM platform, migration goals, and how Nevada James Endpoint Partners can help. No pitch — just a direct conversation.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: 20, display: "flex", justifyContent: "center", flexShrink: 0, color: "var(--pink)", fontSize: "1rem" }}>✉</span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>info@nevadajames.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ width: 20, display: "flex", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
              </span>
              <span style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>Currently taking SLED migration engagements</span>
            </div>
          </div>
        </div>

        {/* Right — glass form card */}
        <div ref={rightRef} className="glass-card" style={{ padding: "2.5rem" }}>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "First Name", name: "firstName", placeholder: "Jane", required: true },
                { label: "Last Name",  name: "lastName",  placeholder: "Smith", required: false },
              ].map(f => (
                <label key={f.name} style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                  <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{f.label}</span>
                  <input type="text" name={f.name} placeholder={f.placeholder} required={f.required} style={inputStyle}
                    onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                    onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
                </label>
              ))}
            </div>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Business Email</span>
              <input type="email" name="email" placeholder="jane@company.com" required style={inputStyle}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>NinjaOne Status</span>
              <select name="status" defaultValue="" style={{ ...inputStyle, cursor: "pointer" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")}>
                <option value="">Select one</option>
                <option>Evaluating a migration to NinjaOne</option>
                <option>Recently purchased, migration not started</option>
                <option>Migration in progress</option>
                <option>Migrated but underutilized</option>
              </select>
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", letterSpacing: "0.06em", textTransform: "uppercase" }}>Your Environment</span>
              <textarea name="message" rows={4} placeholder="Tell us about your current environment and what you're trying to accomplish..." style={{ ...inputStyle, resize: "vertical" }}
                onFocus={e => (e.currentTarget.style.borderColor = "var(--pink)")}
                onBlur={e  => (e.currentTarget.style.borderColor = "rgba(255,0,153,0.2)")} />
            </label>

            {/* Honeypot — hidden from humans, catches bots */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            />

            <button type="submit" disabled={state === "submitting"} style={{ padding: "0.875rem", background: "var(--pink)", color: "#0D0D0D", border: "none", borderRadius: 4, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.04em", cursor: state === "submitting" ? "not-allowed" : "pointer", opacity: state === "submitting" ? 0.7 : 1, transition: "opacity 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { if (state !== "submitting") { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.boxShadow = "0 0 24px rgba(255,0,153,0.5)"; } }}
              onMouseLeave={e => { e.currentTarget.style.opacity = state === "submitting" ? "0.7" : "1"; e.currentTarget.style.boxShadow = "none"; }}>
              {state === "submitting" ? "Sending…" : "Request a Discovery Call →"}
            </button>

            <div aria-live="polite" style={{ minHeight: "1.2rem" }}>
              {state === "success" && (
                <p style={{ color: "var(--green)", fontSize: "0.85rem" }}>
                  Thanks — your request is in. We&apos;ll be in touch shortly.
                </p>
              )}
              {state === "error" && (
                <p style={{ color: "var(--pink)", fontSize: "0.85rem" }}>
                  {errorMsg} You can also reach us at info@nevadajames.com.
                </p>
              )}
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
