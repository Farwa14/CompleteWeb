import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Essential",
    price: "Free",
    desc: "Get started with AI-matched consultations.",
    features: [
      "AI symptom analysis",
      "Doctor matching",
      "1 consultation / month",
      "Basic health profile",
    ],
    highlighted: false,
  },
  {
    name: "Performance",
    price: "PKR 1,499",
    period: "/mo",
    desc: "Full access to Pakistan's top verified doctors.",
    features: [
      "Unlimited consultations",
      "Complete medical history AI",
      "Priority doctor matching",
      "Prescription management",
      "Lab results tracking",
    ],
    highlighted: true,
  },
  {
    name: "Family",
    price: "PKR 3,499",
    period: "/mo",
    desc: "Healthcare for your entire family, centralized.",
    features: [
      "Up to 6 family members",
      "All Performance features",
      "Family health dashboard",
      "Emergency doctor access",
      "Dedicated care coordinator",
    ],
    highlighted: false,
  },
];

const PricingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={sectionRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs text-accent uppercase tracking-[0.3em] mb-4">
            Pricing
          </p>
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
            Choose your{" "}
            <span className="font-drama italic text-accent">plan.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`pricing-card rounded-3xl p-8 border transition-shadow duration-500 ${
                tier.highlighted
                  ? "bg-primary text-primary-foreground border-primary shadow-xl scale-[1.03]"
                  : "bg-background text-foreground border-border shadow-sm hover:shadow-lg"
              }`}
            >
              <h3 className="font-heading font-bold text-lg mb-2">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="font-heading font-extrabold text-3xl">{tier.price}</span>
                {tier.period && (
                  <span className={`text-sm ${tier.highlighted ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {tier.period}
                  </span>
                )}
              </div>
              <p className={`text-sm mb-6 ${tier.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {tier.desc}
              </p>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm">
                    <Check className={`w-4 h-4 flex-shrink-0 ${tier.highlighted ? "text-accent" : "text-accent"}`} />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`btn-magnetic block text-center py-3 rounded-2xl font-heading font-semibold text-sm relative overflow-hidden ${
                  tier.highlighted
                    ? "bg-accent text-accent-foreground"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                }`}
              >
                <span className="relative z-10">Book a Consultation</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;