import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import PageShell from "../components/PageShell";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(32px)";
    setTimeout(() => {
      el.style.transition = "all 0.7s cubic-bezier(0.25,0.46,0.45,0.94)";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await authService.login({ email, password });
      login(data);
      const role = data.user?.role;
      if (role === "doctor") navigate("/doctor/dashboard");
      else if (role === "admin") navigate("/admin");
      else navigate("/patient/dashboard");
    } catch (err: any) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const inp = "w-full px-4 py-3 rounded-2xl border outline-none transition-all duration-200 text-sm font-body bg-white/70 backdrop-blur-sm";
  const bd = { borderColor: "rgba(26,107,90,0.2)" };

  return (
    <PageShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div ref={formRef} className="w-full max-w-md">

          {/* Back to home */}
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body mb-8 opacity-50 hover:opacity-100 transition-opacity hover-lift text-foreground">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to home
          </Link>

          <div className="text-center mb-10">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3 text-accent opacity-70">Welcome back</p>
            <h1 className="font-heading font-extrabold text-4xl md:text-5xl tracking-tight leading-tight" style={{ color: "#1A1A1A" }}>
              Sign in to <span className="font-drama italic text-accent">Sync</span>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">Your health, organized.</p>
          </div>

          <div className="rounded-3xl p-8 border border-white/60 shadow-xl" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)" }}>
            {error && (
              <div className="mb-5 px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.1)", color: "#E8604C" }}>
                {error}
              </div>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com"
                  className={inp} style={bd}
                  onFocus={e => (e.target.style.borderColor = "#1A6B5A")}
                  onBlur={e => (e.target.style.borderColor = "rgba(26,107,90,0.2)")} />
              </div>
              <div>
                <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className={inp} style={bd}
                  onFocus={e => (e.target.style.borderColor = "#1A6B5A")}
                  onBlur={e => (e.target.style.borderColor = "rgba(26,107,90,0.2)")} />
              </div>
              <button type="submit" disabled={loading} className="btn-magnetic w-full py-3.5 rounded-full font-heading font-semibold text-sm text-white mt-2"
                style={{ background: loading ? "rgba(26,107,90,0.5)" : "#1A6B5A" }}>
                {loading ? "Signing in..." : "Sign in →"}
              </button>
            </form>
          </div>

          <div className="mt-6 text-center flex flex-col gap-2">
            <p className="text-sm font-body text-muted-foreground">
              New patient?{" "}
              <Link to="/register/patient" className="font-semibold underline underline-offset-2 text-accent hover:opacity-70">Create account</Link>
            </p>
            <p className="text-sm font-body text-muted-foreground">
              Are you a doctor?{" "}
              <Link to="/register/doctor" className="font-semibold underline underline-offset-2 hover:opacity-70" style={{ color: "#E8604C" }}>Join as provider</Link>
            </p>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
