import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhilosophySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".philo-line", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.08,
        duration: 0.9,
        ease: "power3.out",
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={sectionRef}
      className="relative py-32 md:py-44 px-6 md:px-16 lg:px-24 bg-dark overflow-hidden"
    >
      {/* Organic texture background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=1920&q=80')",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="philo-line font-body text-dark-foreground/50 text-lg md:text-2xl mb-8 max-w-xl">
          Most healthcare platforms focus on: listing doctors and letting
          patients figure it out themselves.
        </p>
        <h2 className="philo-line font-drama italic text-4xl md:text-6xl lg:text-7xl text-dark-foreground leading-[1.1]">
          We focus on:{" "}
          <span className="text-accent">
            understanding you
          </span>{" "}
          — then connecting you to the{" "}
          <span className="text-accent">
            right care.
          </span>
        </h2>
        <p className="philo-line font-mono text-xs text-dark-foreground/40 mt-10 tracking-widest uppercase">
          Built for Pakistan. Powered by precision AI.
        </p>
      </div>
    </section>
  );
};

export default PhilosophySection;