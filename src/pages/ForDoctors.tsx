import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserCheck, BarChart3, MessageCircle, ChevronRight, Shield, Clock, TrendingUp } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Create your profile",
    desc: "Upload your PMC license, set your fees and availability — go live in minutes.",
    icon: Shield,
  },
  {
    num: "02",
    title: "Get discovered",
    desc: "Patients find you through AI matching and directory search — no marketing needed.",
    icon: TrendingUp,
  },
  {
    num: "03",
    title: "Consult and earn",
    desc: "Video calls, chat, in-person — all managed from your dashboard.",
    icon: Clock,
  },
];

const benefits = [
  {
    icon: UserCheck,
    title: "Professional PMC-verified profile",
    desc: "Your verified PMC profile — visible to thousands of patients across Pakistan.",
  },
  {
    icon: BarChart3,
    title: "Full schedule management",
    desc: "Set your availability, fees, and consultation types — full control over your practice.",
  },
  {
    icon: MessageCircle,
    title: "Direct patient messaging",
    desc: "Video calls, chat, in-person — all managed from one dashboard.",
  },
];

const faqs = [
  {
    q: "Is Sync free for doctors?",
    a: "Yes — creating your profile and receiving bookings is completely free.",
  },
  {
    q: "How do I get verified?",
    a: "Upload your PMC license — verification is automatic.",
  },
  {
    q: "Can I set my own fees?",
    a: "Yes — you set your own consultation fees for online and physical appointments.",
  },
  {
    q: "What consultation types can I offer?",
    a: "Video call, text chat, in-person, and home visits — your choice.",
  },
];

const ForDoctors = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Hero entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".fd-hero-label", { y: 30, opacity: 0, duration: 0.7, delay: 0.3 })
        .from(".fd-hero-heading", { y: 40, opacity: 0, duration: 0.9 }, "-=0.5")
        .from(".fd-hero-sub", { y: 30, opacity: 0, duration: 0.7 }, "-=0.5")
        .from(".fd-hero-btn", { y: 30, opacity: 0, duration: 0.7 }, "-=0.4")
        .from(".fd-hero-stat", { y: 20, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.3");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Steps scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fd-step-title", {
        scrollTrigger: { trigger: stepsRef.current, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".fd-step-card", {
        scrollTrigger: { trigger: stepsRef.current, start: "top 80%" },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power3.out",
      });
    }, stepsRef);
    return () => ctx.revert();
  }, []);

  // Benefits scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fd-benefit-title", {
        scrollTrigger: { trigger: benefitsRef.current, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".fd-benefit-card", {
        scrollTrigger: { trigger: benefitsRef.current, start: "top 80%" },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      });
    }, benefitsRef);
    return () => ctx.revert();
  }, []);

  // FAQ scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fd-faq-title", {
        scrollTrigger: { trigger: faqRef.current, start: "top 85%" },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });
      gsap.from(".fd-faq-item", {
        scrollTrigger: { trigger: faqRef.current, start: "top 80%" },
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.6,
        ease: "power3.out",
      });
    }, faqRef);
    return () => ctx.revert();
  }, []);

  // CTA scroll animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fd-cta-content", {
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%" },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    }, ctaRef);
    return () => ctx.revert();
  }, []);

  const hexPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3C/svg%3E")`;

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 px-6 md:px-16 lg:px-24 overflow-hidden"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        {/* Hex pattern background like landing hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: hexPattern, backgroundSize: "56px 100px", opacity: 0.06 }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="fd-hero-label font-mono text-xs md:text-sm tracking-[0.25em] uppercase mb-6 text-accent">
            For Doctors · Join Sync
          </p>
          <h1 className="fd-hero-heading font-heading font-bold text-4xl md:text-6xl tracking-tight text-foreground mb-6">
            Grow your practice with{" "}
            <span className="font-drama italic text-accent">Sync.</span>
          </h1>
          <p className="fd-hero-sub text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10">
            Pakistan's smartest healthcare platform — built for doctors who want to reach more patients.
          </p>
          <Link
            to="/register/doctor"
            className="fd-hero-btn btn-magnetic inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-accent text-accent-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Register as Doctor <ChevronRight className="w-4 h-4" />
          </Link>

          {/* Trust stats */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-10 text-sm font-body text-muted-foreground">
            <span className="fd-hero-stat"><span className="text-accent font-semibold">500+</span> Verified Doctors</span>
            <span className="fd-hero-stat"><span className="text-accent font-semibold">Free</span> to Join</span>
            <span className="fd-hero-stat"><span className="text-accent font-semibold">PMC</span> Licensed</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section ref={stepsRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24" style={{ backgroundColor: "#F0F7F5" }}>
        <div className="max-w-5xl mx-auto">
          <h2 className="fd-step-title font-heading font-bold text-3xl md:text-5xl text-foreground text-center mb-16 tracking-tight">
            How it works for{" "}
            <span className="font-drama italic text-accent">doctors.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="fd-step-card hover-lift p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <s.icon className="w-5 h-5 text-accent" />
                  </div>
                  <span className="font-mono text-sm text-orange font-semibold">{s.num}</span>
                </div>
                <h3 className="font-heading font-bold text-xl text-foreground">{s.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section ref={benefitsRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-background">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-16">
          <div className="lg:w-[55%] space-y-6">
            <h2 className="fd-benefit-title font-heading font-bold text-3xl md:text-5xl tracking-tight text-foreground">
              Built for your{" "}
              <span className="font-drama italic text-accent">practice.</span>
            </h2>
            <p className="fd-benefit-title text-muted-foreground text-lg max-w-md">
              Everything you need to manage, grow, and optimize your medical practice — in one place.
            </p>
          </div>

          <div className="lg:w-[45%] grid gap-5">
            {benefits.map((b, i) => (
              <div
                key={i}
                className="fd-benefit-card hover-lift flex items-start gap-4 p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow"
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

      {/* FAQ */}
      <section ref={faqRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24" style={{ backgroundColor: "#F0F7F5" }}>
        <div className="max-w-2xl mx-auto">
          <h2 className="fd-faq-title font-heading font-bold text-3xl md:text-5xl text-foreground text-center mb-12 tracking-tight">
            Frequently asked{" "}
            <span className="font-drama italic text-accent">questions.</span>
          </h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="fd-faq-item border border-border rounded-xl px-5 bg-background hover:shadow-sm transition-shadow">
                <AccordionTrigger className="font-heading font-semibold text-foreground text-left">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Bottom CTA */}
      <section ref={ctaRef} className="py-24 md:py-32 px-6 md:px-16 lg:px-24 bg-accent overflow-hidden relative">
        {/* Subtle pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: hexPattern, backgroundSize: "56px 100px", opacity: 0.08 }}
        />
        <div className="fd-cta-content relative z-10 max-w-3xl mx-auto text-center space-y-8">
          <h2 className="font-heading font-bold text-3xl md:text-5xl text-accent-foreground tracking-tight">
            Ready to join Pakistan's top doctors?
          </h2>
          <p className="text-accent-foreground/80 text-lg max-w-md mx-auto">
            Create your free profile today and start reaching thousands of patients.
          </p>
          <Link
            to="/register/doctor"
            className="btn-magnetic inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-background text-foreground font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Register as Doctor <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ForDoctors;
