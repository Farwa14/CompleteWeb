const Footer = () => {
  const navCols = [
    {
      title: "Product",
      links: ["Features", "Pricing", "For Doctors", "Mobile App"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Blog", "Press"],
    },
    {
      title: "Legal",
      links: ["Privacy", "Terms", "HIPAA", "Data Policy"],
    },
  ];

  return (
    <footer className="bg-dark text-dark-foreground rounded-t-[4rem] mt-12">
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16 md:py-24">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-heading font-bold text-2xl mb-3">Sync</h3>
            <p className="font-body text-dark-foreground/60 text-sm leading-relaxed max-w-xs">
              AI-powered healthcare connecting Pakistani patients with verified
              doctors — instantly.
            </p>

            {/* System status */}
            <div className="flex items-center gap-2 mt-8">
              <span className="w-2 h-2 rounded-full bg-green-500 pulse-dot" />
              <span className="font-mono text-xs text-dark-foreground/40 tracking-widest uppercase">
                System Operational
              </span>
            </div>
          </div>

          {/* Nav columns */}
          {navCols.map((col, i) => (
            <div key={i}>
              <h4 className="font-heading font-semibold text-sm mb-4 text-dark-foreground/80">
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <a
                      href="#"
                      className="hover-lift inline-block font-body text-sm text-dark-foreground/50 hover:text-dark-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-dark-foreground/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-xs text-dark-foreground/30">
            © 2026 Sync Health. All rights reserved.
          </p>
          <p className="font-mono text-xs text-dark-foreground/30">
            Made in Pakistan 🇵🇰
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;