"use client";

export default function Hero() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100vh",
        minHeight: 600,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "transparent",
      }}
    >
      {/* Vignette so text stays readable over the 3D scene */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(13,13,13,0.65) 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: 900,
        }}
      >
        <p
          className="hero-line-1"
          style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--pink)",
            marginBottom: "1.5rem",
          }}
        >
          Managed IT Services
        </p>

        <h1
          style={{
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "clamp(3rem, 8vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
            marginBottom: "1.5rem",
          }}
        >
          <span className="hero-line-1" style={{ display: "block", color: "var(--white)" }}>
            Infrastructure
          </span>
          <span className="hero-line-2 text-stroke" style={{ display: "block" }}>
            That Never
          </span>
          <span className="hero-line-3" style={{ display: "block", color: "var(--white)" }}>
            Sleeps.
          </span>
        </h1>

        <p
          className="hero-line-2"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-muted)",
            maxWidth: 520,
            margin: "0 auto 2.5rem",
            lineHeight: 1.7,
          }}
        >
          Proactive monitoring, enterprise security, and cloud infrastructure
          built for businesses that can&apos;t afford downtime.
        </p>

        <div
          className="hero-cta"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#contact"
            style={{
              padding: "0.875rem 2rem",
              background: "var(--pink)",
              color: "var(--bg)",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              borderRadius: 4,
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Book a Free Assessment
          </a>
          <a
            href="#services"
            style={{
              padding: "0.875rem 2rem",
              border: "1px solid rgba(255,0,153,0.3)",
              background: "rgba(13,13,13,0.4)",
              backdropFilter: "blur(8px)",
              color: "var(--white)",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              borderRadius: 4,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--pink)";
              e.currentTarget.style.color = "var(--pink)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,0,153,0.3)";
              e.currentTarget.style.color = "var(--white)";
            }}
          >
            View Services →
          </a>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: 0.4,
        }}
      >
        <span style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, var(--pink), transparent)",
          }}
        />
      </div>
    </section>
  );
}
