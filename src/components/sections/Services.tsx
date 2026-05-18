"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: "⬡", title: "Managed IT Support",     desc: "24/7 helpdesk and on-site support. Your team stays productive while we handle every ticket, from password resets to hardware failures." },
  { icon: "🛡", title: "Cybersecurity",           desc: "Endpoint protection, threat monitoring, phishing defense, and compliance audits — layered security that keeps attackers out." },
  { icon: "☁", title: "Cloud Infrastructure",    desc: "Microsoft 365, Azure, and AWS migrations. We design, deploy, and manage cloud environments built for reliability and cost control." },
  { icon: "⚡", title: "Network & Connectivity",  desc: "Firewall management, SD-WAN, VPN, and Wi-Fi design. Fast, secure connectivity across all your sites and remote workers." },
  { icon: "⟳", title: "Backup & Disaster Recovery", desc: "Automated backups, tested recovery plans, and business continuity strategy so a ransomware hit or outage doesn't end your week." },
  { icon: "◎", title: "IT Strategy & vCIO",      desc: "Quarterly roadmaps, vendor management, and budget planning. A fractional CIO perspective without the full-time executive salary." },
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
            Every service your business needs,{" "}
            <span className="gradient-text">under one roof.</span>
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
