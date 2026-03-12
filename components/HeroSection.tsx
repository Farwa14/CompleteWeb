import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const chatMessages = [
  { from: "user", text: "I've been having chest pain for 2 days..." },
  { from: "ai", text: "I recommend seeing a Cardiologist. Online or in-person?" },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [typedChars, setTypedChars] = useState(0);
  const placeholderText = "Describe your symptoms...";

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 30, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".hero-line-1", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".hero-line-2", { y: 40, opacity: 0, duration: 0.9 }, "-=0.6")
        .from(".hero-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".hero-buttons", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".hero-trust", { y: 20, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".hero-card", { x: 60, opacity: 0, duration: 1 }, "-=1.2");
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTypedChars((prev) => (prev >= placeholderText.length ? 0 : prev + 1));
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const hexPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex items-center"
      style={{ backgroundColor: "#F2F0E9" }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: hexPattern, backgroundSize: "56px 100px", opacity: 0.08 }} />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-32 md:py-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-[55%]">
            <p className="hero-label font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-5 text-accent">
              AI-Powered Healthcare · Pakistan
            </p>
            <h1 className="hero-line-1 font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight leading-[1.1]" style={{ color: "#1A1A1A" }}>
              The right doctor.
            </h1>
            <p className="hero-line-2 font-drama italic text-4xl md:text-5xl lg:text-6xl xl:text-7xl leading-[1] mt-1 text-accent">
              Right now.
            </p>
            <p className="hero-sub font-body text-base md:text-lg mt-6 max-w-lg" style={{ color: "#6B7280" }}>
              Describe your symptoms. Our AI finds the right specialist — online or in-person, anywhere in Pakistan.
            </p>
            <div className="hero-buttons flex flex-wrap gap-4 mt-8">
              <Link to="/register/patient" className="btn-magnetic inline-flex items-center px-8 py-4 rounded-full text-white font-heading font-semibold text-base bg-accent">
                Find Your Doctor
              </Link>
              <Link to="/register/doctor" className="btn-magnetic inline-flex items-center px-8 py-4 rounded-full border-2 border-accent text-accent font-heading font-semibold text-base hover:bg-accent/10 transition-colors">
                I'm a Doctor →
              </Link>
            </div>
            <div className="hero-trust flex flex-wrap gap-x-6 gap-y-2 mt-6 text-sm font-body text-muted-foreground">
              <span><span className="text-accent">✓</span> <span className="font-semibold">500+</span> Verified Doctors</span>
              <span><span className="text-accent">✓</span> PMC Licensed</span>
              <span><span className="text-accent">✓</span> Free AI Matching</span>
            </div>
          </div>
          <div className="hero-card w-full lg:w-[45%] flex justify-center lg:justify-end">
            <div className="w-full max-w-sm rounded-2xl p-5 shadow-xl border border-white/60" style={{ backgroundColor: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}>
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full pulse-dot" style={{ backgroundColor: "#1A6B5A" }} />
                  <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "#1A6B5A" }}>Online</span>
                </div>
                <span className="font-heading font-semibold text-sm" style={{ color: "#1A1A1A" }}>AI Health Assistant</span>
              </div>
              <div className="flex flex-col gap-3 mb-5">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`max-w-[85%] px-4 py-3 text-sm font-body rounded-2xl ${msg.from === "user" ? "self-end rounded-br-md" : "self-start rounded-bl-md"}`}
                    style={msg.from === "user" ? { backgroundColor: "#F3F4F6", color: "#374151" } : { backgroundColor: "#1A6B5A", color: "#FFFFFF" }}>
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 rounded-full px-4 py-3 border border-gray-200" style={{ backgroundColor: "#F9FAFB" }}>
                <span className="flex-1 text-sm font-body" style={{ color: "#9CA3AF" }}>
                  {placeholderText.slice(0, typedChars)}<span className="blink">|</span>
                </span>
                <button className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "#1A6B5A" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
