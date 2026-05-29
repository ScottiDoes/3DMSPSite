"use client";

import { useEffect, useState } from "react";

const links = [
  { label: "Services",    href: "#services" },
  { label: "Our Edge",    href: "#why-us"   },
  { label: "Engagements", href: "#work"     },
  { label: "Contact",     href: "#contact"  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(13,13,13,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <nav
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 2rem",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "var(--pink)",
            textDecoration: "none",
            letterSpacing: "-0.02em",
          }}
        >
          NJ<span style={{ color: "var(--white)" }}> ENDPOINT PARTNERS</span>
        </a>

        {/* Links */}
        <ul
          style={{
            display: "flex",
            gap: "2.5rem",
            listStyle: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                style={{
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--pink)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--text-muted)")
                }
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            padding: "0.5rem 1.25rem",
            border: "1px solid var(--pink)",
            borderRadius: 4,
            color: "var(--pink)",
            textDecoration: "none",
            fontSize: "0.875rem",
            fontWeight: 600,
            letterSpacing: "0.04em",
            transition: "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget;
            el.style.background = "var(--pink)";
            el.style.color = "var(--bg)";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget;
            el.style.background = "transparent";
            el.style.color = "var(--pink)";
          }}
        >
          Book a Call
        </a>
      </nav>
    </header>
  );
}
