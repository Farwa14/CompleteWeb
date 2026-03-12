import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { patientService } from "../services/patientService";
import PageShell from "../components/PageShell";

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Hyderabad","Gujranwala","Bahawalpur","Sargodha","Sukkur","Larkana","Sheikhupura","Jhang","Gujrat","Sahiwal","Wah Cantonment"];

export default function PatientRegister() {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState({ full_name: "", email: "", password: "", phone: "" });
  const [profile, setProfile] = useState({ age: "", gender: "", city: "", emergency_contact_name: "", emergency_contact_phone: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const el = formRef.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(28px)";
    setTimeout(() => { el.style.transition = "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)"; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 80);
  }, []);

  const inp = "w-full px-4 py-3 rounded-2xl border outline-none transition-all duration-200 text-sm font-body bg-white/70";
  const bd = { borderColor: "rgba(26,107,90,0.2)" };
  const fo = (e: any) => (e.target.style.borderColor = "#1A6B5A");
  const fb = (e: any) => (e.target.style.borderColor = "rgba(26,107,90,0.2)");

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (account.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const data = await authService.register({ ...account, role: "patient" });
      login(data);
      setStep(2);
    } catch (err: any) { setError(err.message || "Registration failed. Email may already be in use."); }
    finally { setLoading(false); }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const token = localStorage.getItem("sync_auth");
      await patientService.updateProfile({ ...profile, age: Number(profile.age) }, token);
      navigate("/patient/dashboard");
    } catch (err: any) {
      setError(err.message + " — You can update your profile later from your dashboard.");
      setTimeout(() => navigate("/patient/dashboard"), 2000);
    } finally { setLoading(false); }
  };

  return (
    <PageShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div ref={formRef} className="w-full max-w-md">

          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body mb-8 opacity-50 hover:opacity-100 transition-opacity hover-lift text-foreground">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3 text-accent opacity-70">Patient registration</p>
            <h1 className="font-heading font-extrabold text-4xl tracking-tight leading-tight" style={{ color: "#1A1A1A" }}>
              Create your <span className="font-drama italic text-accent">account</span>
            </h1>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {["Account", "Profile"].map((label, i) => (
              <div key={label} className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
                    style={{ background: step >= i + 1 ? "#1A6B5A" : "rgba(26,107,90,0.1)", color: step >= i + 1 ? "#fff" : "rgba(26,107,90,0.4)" }}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className="text-xs font-body" style={{ color: step === i + 1 ? "#1A6B5A" : "rgba(26,26,26,0.4)", fontWeight: step === i + 1 ? 600 : 400 }}>{label}</span>
                </div>
                {i < 1 && <div className="w-8 h-px" style={{ background: "rgba(26,107,90,0.15)" }} />}
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 border border-white/60 shadow-xl" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)" }}>
            {error && <div className="mb-5 px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.1)", color: "#E8604C" }}>{error}</div>}

            {step === 1 && (
              <form onSubmit={handleStep1} className="flex flex-col gap-5">
                {[
                  { l: "Full name", t: "text", k: "full_name", p: "Muhammad Ali" },
                  { l: "Email address", t: "email", k: "email", p: "you@example.com" },
                  { l: "Phone (optional)", t: "tel", k: "phone", p: "+92 300 0000000", req: false },
                  { l: "Password (min. 8 chars)", t: "password", k: "password", p: "••••••••" },
                ].map(({ l, t, k, p, req = true }: any) => (
                  <div key={k}>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">{l}</label>
                    <input type={t} required={req} className={inp} style={bd} value={(account as any)[k]}
                      onChange={e => setAccount({ ...account, [k]: e.target.value })} placeholder={p} onFocus={fo} onBlur={fb} />
                  </div>
                ))}
                <button type="submit" disabled={loading} className="btn-magnetic w-full py-3.5 rounded-full font-heading font-semibold text-sm text-white mt-2"
                  style={{ background: loading ? "rgba(26,107,90,0.5)" : "#1A6B5A" }}>
                  {loading ? "Creating account..." : "Continue →"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2} className="flex flex-col gap-5">
                <p className="text-sm font-body text-muted-foreground">Help us personalize your experience — you can skip and update later.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Age</label>
                    <input type="number" min="1" max="120" className={inp} style={bd} value={profile.age}
                      onChange={e => setProfile({ ...profile, age: e.target.value })} placeholder="25" onFocus={fo} onBlur={fb} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Gender</label>
                    <select className={inp} style={bd} value={profile.gender} onChange={e => setProfile({ ...profile, gender: e.target.value })}>
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">City</label>
                  <select className={inp} style={bd} value={profile.city} onChange={e => setProfile({ ...profile, city: e.target.value })}>
                    <option value="">Select your city</option>
                    {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="rounded-2xl p-4" style={{ background: "rgba(26,107,90,0.04)", border: "1px solid rgba(26,107,90,0.1)" }}>
                  <p className="font-mono text-xs uppercase tracking-wider mb-3 text-accent">Emergency contact</p>
                  <div className="flex flex-col gap-3">
                    <input type="text" className={inp} style={bd} value={profile.emergency_contact_name}
                      onChange={e => setProfile({ ...profile, emergency_contact_name: e.target.value })} placeholder="Contact name" onFocus={fo} onBlur={fb} />
                    <input type="tel" className={inp} style={bd} value={profile.emergency_contact_phone}
                      onChange={e => setProfile({ ...profile, emergency_contact_phone: e.target.value })} placeholder="+92 300 0000000" onFocus={fo} onBlur={fb} />
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(1)}
                    className="flex-1 py-3.5 rounded-full font-heading font-semibold text-sm text-accent hover:scale-[1.02] transition-transform"
                    style={{ background: "rgba(26,107,90,0.08)", border: "1px solid rgba(26,107,90,0.2)" }}>
                    Back
                  </button>
                  <button type="submit" disabled={loading} className="btn-magnetic flex-[2] py-3.5 rounded-full font-heading font-semibold text-sm text-white"
                    style={{ background: loading ? "rgba(26,107,90,0.5)" : "#1A6B5A" }}>
                    {loading ? "Saving..." : "Finish Onboarding"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center mt-5 text-sm font-body text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold underline underline-offset-2 text-accent hover:opacity-70">Sign in</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
