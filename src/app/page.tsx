import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";
import FixedCanvasLoader from "@/components/three/FixedCanvasLoader";

export default function Home() {
  return (
    <>
      {/* Fixed Three.js world — sits behind everything */}
      <FixedCanvasLoader />

      <Navbar />

      {/* Scrollable HTML content layered over the canvas */}
      <main>
        <Hero />
        <Services />
        <WhyUs />
        <Work />
        <Contact />
      </main>

      <footer
        style={{
          padding: "2rem 1.5rem",
          borderTop: "1px solid var(--border)",
          // Semi-transparent so the 3D world peeks through slightly
          background: "rgba(6, 9, 15, 0.85)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-grotesk)",
              fontWeight: 700,
              color: "var(--accent)",
              letterSpacing: "-0.02em",
            }}
          >
            APEX IT
          </span>
          <span style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>
            © {new Date().getFullYear()} Apex IT Solutions. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
}
