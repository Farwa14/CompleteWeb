import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const hexPattern = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'%3E%3Cpath d='M28 66L0 50L0 16L28 0L56 16L56 50L28 66L28 100' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3Cpath d='M28 0L28 34L0 50L0 84L28 100L56 84L56 50L28 34' fill='none' stroke='%231A6B5A' stroke-width='1'/%3E%3C/svg%3E")`;

interface PageShellProps {
  children: ReactNode;
  noFooter?: boolean;
}

const PageShell = ({ children, noFooter = false }: PageShellProps) => (
  <div className="min-h-screen relative bg-background">
    {/* Hex pattern — same as landing page hero */}
    <div
      className="fixed inset-0 pointer-events-none z-0"
      style={{ backgroundImage: hexPattern, backgroundSize: "56px 100px", opacity: 0.06 }}
    />
    <div className="relative z-10 flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      {!noFooter && <Footer />}
    </div>
  </div>
);

export default PageShell;
