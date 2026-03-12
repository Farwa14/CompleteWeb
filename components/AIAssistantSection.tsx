import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const AIAssistantSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".ai-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-accent text-accent-foreground">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <p className="font-mono text-xs uppercase tracking-[0.3em] opacity-80">Powered by AI</p>
        <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight">
          Meet your personal{" "}
          <span className="font-drama italic">health assistant.</span>
        </h2>
        <p className="text-accent-foreground/80 text-lg max-w-lg mx-auto">
          Available 24/7. Knows your complete medical history. Finds the right doctor for you — every time.
        </p>

        {/* Chat mockup */}
        <div className="ai-card mt-12 max-w-md mx-auto rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl overflow-hidden text-left">
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
            <span className="font-heading font-semibold text-sm text-accent-foreground">Sync AI</span>
            <span className="text-xs text-accent-foreground/70">·</span>
            <span className="flex items-center gap-1 text-xs text-accent-foreground/70">
              <span className="w-2 h-2 rounded-full bg-green-400 inline-block pulse-dot" />
              Online
            </span>
          </div>

          {/* Messages */}
          <div className="px-5 py-6 space-y-4">
            <div className="bg-white/10 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] text-sm text-accent-foreground/90">
              I have sharp knee pain for a week
            </div>
            <div className="bg-white rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%] ml-auto text-sm text-foreground">
              Based on your history, I recommend an Orthopedic specialist. Online or in-person?
            </div>
          </div>

          {/* Input */}
          <div className="px-4 pb-4">
            <div className="flex items-center gap-2 bg-white/10 rounded-full px-4 py-2.5">
              <span className="text-sm text-accent-foreground/50 flex-1">Ask about your health...</span>
              <button className="w-8 h-8 rounded-full bg-accent-foreground flex items-center justify-center">
                <Send className="w-4 h-4 text-accent" />
              </button>
            </div>
          </div>
        </div>

        <a
          href="/patient/dashboard"
          className="inline-block mt-8 px-8 py-3 rounded-full bg-orange text-orange-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
        >
          Try the AI Assistant →
        </a>
      </div>
    </section>
  );
};

export default AIAssistantSection;
