import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserCheck, BarChart3, MessageCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: UserCheck,
    title: "Professional Profile",
    desc: "Your verified PMC profile — visible to thousands of patients across Pakistan",
  },
  {
    icon: BarChart3,
    title: "Manage Your Schedule",
    desc: "Set your availability, fees, and consultation types — full control",
  },
  {
    icon: MessageCircle,
    title: "Direct Patient Connect",
    desc: "Video calls, chat, in-person — all managed from one dashboard",
  },
];

const ForDoctorsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".doctor-card", {
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
    <section id="for-doctors" ref={ref} className="py-24 md:py-32 px-6 md:px-16 lg:px-24" style={{ backgroundColor: "#F0F7F5" }}>
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-start gap-16">
        <div className="lg:w-[45%] grid gap-5">
          {benefits.map((b, i) => (
            <div
              key={i}
              className="doctor-card flex items-start gap-4 p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow"
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

        <div className="lg:w-[55%] space-y-6">
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Grow your practice with{" "}
            <span className="font-drama italic text-accent">Sync.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Join Pakistan's smartest healthcare platform and reach more patients.
          </p>
          <a
            href="/register/doctor"
            className="inline-block mt-4 px-8 py-3 rounded-full bg-accent text-accent-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Register as Doctor →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ForDoctorsSection;
