import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Brain, UserCheck, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Card 1: Diagnostic Shuffler ── */
const ShufflerCard = () => {
  const [order, setOrder] = useState([0, 1, 2]);
  const labels = ["Medical History Scan", "Symptom Analysis", "Treatment Match"];

  useEffect(() => {
    const interval = setInterval(() => {
      setOrder((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-48 w-full flex items-center justify-center">
      {order.map((idx, pos) => (
        <div
          key={idx}
          className="absolute w-[85%] rounded-2xl border border-border bg-background px-5 py-4 shadow-md font-mono text-sm text-foreground transition-all"
          style={{
            top: `${pos * 18}px`,
            zIndex: 3 - pos,
            opacity: 1 - pos * 0.25,
            transform: `scale(${1 - pos * 0.04})`,
            transitionTimingFunction: "cubic-bezier(0.34,1.56,0.64,1)",
            transitionDuration: "600ms",
          }}
        >
          <span className="text-accent font-semibold">●</span> {labels[idx]}
        </div>
      ))}
    </div>
  );
};

/* ── Card 2: Telemetry Typewriter ── */
const TypewriterCard = () => {
  const messages = [
    "Verifying Dr. Ayesha's credentials...",
    "Cross-referencing patient history...",
    "Matching specialization: Cardiology...",
    "Appointment slot confirmed — 2:30 PM",
    "Sending encrypted health summary...",
  ];
  const [text, setText] = useState("");
  const [msgIdx, setMsgIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = messages[msgIdx % messages.length];
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setText((p) => p + current[charIdx]);
        setCharIdx((c) => c + 1);
      }, 35);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setText("");
        setCharIdx(0);
        setMsgIdx((m) => m + 1);
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [charIdx, msgIdx]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-accent pulse-dot" />
        <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
          Live Feed
        </span>
      </div>
      <div className="bg-foreground/5 rounded-xl p-4 min-h-[80px] font-mono text-sm text-foreground">
        {text}
        <span className="blink text-accent">▊</span>
      </div>
    </div>
  );
};

/* ── Card 3: Cursor Protocol Scheduler ── */
const SchedulerCard = () => {
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const [activeDay, setActiveDay] = useState(-1);
  const [cursorPos, setCursorPos] = useState({ x: -20, y: -20 });
  const [pressing, setPressing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const run = () => {
      setActiveDay(-1);
      setSaved(false);
      setShowCursor(true);

      // Move to day 3 (Wednesday)
      setTimeout(() => setCursorPos({ x: 130, y: 30 }), 400);
      setTimeout(() => setPressing(true), 1200);
      setTimeout(() => {
        setPressing(false);
        setActiveDay(3);
      }, 1500);
      // Move to save
      setTimeout(() => setCursorPos({ x: 200, y: 80 }), 2200);
      setTimeout(() => setPressing(true), 2800);
      setTimeout(() => {
        setPressing(false);
        setSaved(true);
      }, 3100);
      setTimeout(() => setShowCursor(false), 3800);
    };

    run();
    const interval = setInterval(run, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Cursor */}
      {showCursor && (
        <svg
          className="absolute z-10 transition-all duration-500 ease-out pointer-events-none"
          style={{ left: cursorPos.x, top: cursorPos.y, transform: pressing ? "scale(0.9)" : "scale(1)" }}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="hsl(var(--accent))"
        >
          <path d="M5.5 3.21V20.8c0 .45.54.67.85.35l4.86-4.86a.5.5 0 0 1 .35-.15h6.87a.5.5 0 0 0 .35-.85L6.35 2.85a.5.5 0 0 0-.85.36Z" />
        </svg>
      )}

      <div className="grid grid-cols-7 gap-2 mb-4">
        {days.map((d, i) => (
          <div
            key={i}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-mono font-semibold transition-all duration-300 ${
              activeDay === i
                ? "bg-accent text-accent-foreground scale-105"
                : "bg-foreground/5 text-muted-foreground"
            }`}
          >
            {d}
          </div>
        ))}
      </div>
      <div
        className={`inline-flex items-center px-4 py-2 rounded-xl font-mono text-xs font-semibold transition-all duration-300 ${
          saved
            ? "bg-primary text-primary-foreground"
            : "bg-foreground/5 text-muted-foreground"
        }`}
      >
        {saved ? "✓ Saved" : "Save"}
      </div>
    </div>
  );
};

/* ── Features Section ── */
const FeaturesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".feature-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI Medical History Agent",
      desc: "An AI agent that knows your complete medical history — symptoms, prescriptions, lab results — so every doctor you see has full context.",
      component: <ShufflerCard />,
    },
    {
      icon: UserCheck,
      title: "Pakistan's Verified Doctors",
      desc: "Pakistan's best verified doctors — available online or in-person. Every credential checked, every review authentic.",
      component: <TypewriterCard />,
    },
    {
      icon: Clock,
      title: "Right Doctor in Under 2 Minutes",
      desc: "Our AI matches your symptoms, history, and preferences to the right specialist — and books your consultation in under 2 minutes.",
      component: <SchedulerCard />,
    },
  ];

  return (
    <section id="features" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-mono text-xs text-orange uppercase tracking-[0.3em] mb-4">
            How Sync Works
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground max-w-2xl">
            Intelligent care,{" "}
            <span className="font-drama italic text-accent">delivered.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card bg-background border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-500"
            >
              <div className="w-10 h-10 rounded-2xl bg-orange/10 flex items-center justify-center mb-6">
                <f.icon className="w-5 h-5 text-orange" />
              </div>
              <h3 className="font-heading font-bold text-xl mb-3 text-foreground">
                {f.title}
              </h3>
              <p className="font-body text-muted-foreground text-sm leading-relaxed mb-6">
                {f.desc}
              </p>
              {f.component}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;