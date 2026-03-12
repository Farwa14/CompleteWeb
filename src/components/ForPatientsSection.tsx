import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Bot, CalendarDays, ClipboardList } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Bot,
    title: "AI-Powered Matching",
    desc: "Describe your symptoms — our AI finds the right specialist in seconds",
  },
  {
    icon: CalendarDays,
    title: "Book in Minutes",
    desc: "Online or in-person appointments, confirmed instantly",
  },
  {
    icon: ClipboardList,
    title: "Your Medical History",
    desc: "Every visit stored — your doctor always knows your full history",
  },
];

const ForPatientsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".patient-card", {
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section id="for-patients" ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">
        <div className="lg:w-[55%] space-y-6">
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Find the right doctor,{" "}
            <span className="font-drama italic text-accent">instantly.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            No more guessing which specialist to see. Our AI does the work for you.
          </p>
          <a
            href="/register/patient"
            className="inline-block mt-4 px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Register as Patient →
          </a>
        </div>

        <div className="lg:w-[45%] grid gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="patient-card flex items-start gap-4 p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center flex-shrink-0">
                <b.icon className="w-5 h-5 text-orange" />
              </div>
              <div>
                <h3 className="font-heading font-bold text-foreground mb-1">{b.title}</h3>
                <p className="text-sm text-muted-foreground">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForPatientsSection;
