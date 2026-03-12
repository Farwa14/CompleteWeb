import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── SVG Animations ── */
const HelixAnimation = () => (
  <svg viewBox="0 0 200 200" className="w-32 h-32 animate-spin" style={{ animationDuration: "20s" }}>
    <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" opacity="0.4" />
    <circle cx="100" cy="100" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.6" />
    <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--accent))" strokeWidth="0.5" opacity="0.2" strokeDasharray="8 8" />
  </svg>
);

const ScannerAnimation = () => {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    if (!lineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(lineRef.current, {
        attr: { y1: 200, y2: 200 },
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32">
      {/* Grid dots */}
      {Array.from({ length: 8 }).map((_, r) =>
        Array.from({ length: 8 }).map((_, c) => (
          <circle
            key={`${r}-${c}`}
            cx={25 + c * 22}
            cy={25 + r * 22}
            r="2"
            fill="hsl(var(--primary))"
            opacity="0.3"
          />
        ))
      )}
      <line
        ref={lineRef}
        x1="10"
        y1="0"
        x2="190"
        y2="0"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
        opacity="0.6"
      />
    </svg>
  );
};

const WaveformAnimation = () => {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;
    const length = pathRef.current.getTotalLength();
    gsap.set(pathRef.current, { strokeDasharray: length, strokeDashoffset: length });
    const ctx = gsap.context(() => {
      gsap.to(pathRef.current, {
        strokeDashoffset: 0,
        duration: 3,
        repeat: -1,
        ease: "none",
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <svg viewBox="0 0 200 100" className="w-40 h-20">
      <path
        ref={pathRef}
        d="M0,50 Q25,10 50,50 T100,50 T150,50 T200,50"
        fill="none"
        stroke="hsl(var(--accent))"
        strokeWidth="2"
      />
    </svg>
  );
};

const steps = [
  {
    num: "01",
    title: "Share Your Story",
    desc: "Tell our AI about your symptoms, history, and preferences. It builds a comprehensive health profile in seconds.",
    anim: <HelixAnimation />,
  },
  {
    num: "02",
    title: "Intelligent Matching",
    desc: "Our algorithm cross-references your profile with verified doctors' specializations, availability, and patient outcomes.",
    anim: <ScannerAnimation />,
  },
  {
    num: "03",
    title: "Seamless Consultation",
    desc: "Connect with your matched doctor — online or in-person. Your full health context is already shared securely.",
    anim: <WaveformAnimation />,
  },
];

const ProtocolSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card || i === 0) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          onEnter: () => {
            const prev = cardsRef.current[i - 1];
            if (prev) {
              gsap.to(prev, { scale: 0.92, opacity: 0.5, filter: "blur(8px)", duration: 0.6, ease: "power2.inOut" });
            }
          },
          onLeaveBack: () => {
            const prev = cardsRef.current[i - 1];
            if (prev) {
              gsap.to(prev, { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.6, ease: "power2.inOut" });
            }
          },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="protocol" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs text-orange uppercase tracking-[0.3em] mb-4">
            The Protocol
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Three steps to{" "}
            <span className="font-drama italic text-accent">better care.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {steps.map((step, i) => (
            <div
              key={i}
              ref={(el) => { if (el) cardsRef.current[i] = el; }}
              className="sticky bg-background border border-border rounded-3xl p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center gap-8"
              style={{ top: `${120 + i * 20}px` }}
            >
              <div className="flex-1">
                <span className="font-mono text-xs text-orange tracking-widest">
                  {step.num}
                </span>
                <h3 className="font-heading font-bold text-2xl md:text-3xl mt-2 mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="font-body text-muted-foreground leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
              <div className="flex-shrink-0 opacity-60">{step.anim}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProtocolSection;