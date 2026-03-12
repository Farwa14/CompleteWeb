import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";
import { doctorService } from "../services/doctorService";
import PageShell from "../components/PageShell";

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Hyderabad","Gujranwala","Bahawalpur","Sargodha","Sukkur","Larkana"];
const SPECIALTIES = ["General Physician","Cardiologist","Dermatologist","Neurologist","Orthopedic Surgeon","Gynecologist","Pediatrician","Psychiatrist","Ophthalmologist","ENT Specialist","Urologist","Oncologist","Gastroenterologist","Pulmonologist","Endocrinologist","Rheumatologist","Nephrologist","Radiologist","Dentist"];
const STEPS = ["Account", "Professional Info", "Fees & Details"];
const OG = "#E8604C";

export default function DoctorRegister() {
  const [step, setStep] = useState(1);
  const [account, setAccount] = useState({ full_name: "", email: "", password: "", phone: "" });
  const [prof, setProf] = useState({ pmc_number: "", specialty: "", sub_specialty: "", city: "", clinic_name: "", clinic_address: "", years_of_experience: "" });
  const [fees, setFees] = useState({ online_fee: "", physical_fee: "", home_visit_fee: "", about: "" });
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
  const bd = { borderColor: "rgba(232,96,76,0.2)" };
  const fo = (e: any) => (e.target.style.borderColor = OG);
  const fb = (e: any) => (e.target.style.borderColor = "rgba(232,96,76,0.2)");

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (account.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try {
      const data = await authService.register({ ...account, role: "doctor" });
      login(data);
      setStep(2);
    } catch (err: any) { setError(err.message || "Registration failed. Email may already be in use."); }
    finally { setLoading(false); }
  };

  const handleStep2 = (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!prof.pmc_number.trim()) { setError("PMC license number is required."); return; }
    if (!prof.specialty) { setError("Please select your specialty."); return; }
    setStep(3);
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!fees.online_fee || !fees.physical_fee) { setError("Online and in-clinic fees are required."); return; }
    setLoading(true);
    try {
      const token = localStorage.getItem("sync_auth");
      await doctorService.registerDoctor({
        ...prof, ...fees,
        online_fee: Number(fees.online_fee),
        physical_fee: Number(fees.physical_fee),
        home_visit_fee: fees.home_visit_fee ? Number(fees.home_visit_fee) : undefined,
        years_of_experience: prof.years_of_experience ? Number(prof.years_of_experience) : undefined,
      }, token);
      navigate("/doctor/dashboard");
    } catch (err: any) {
      setError(err.message + " — Your account was created. Complete your profile from the dashboard.");
      setTimeout(() => navigate("/doctor/dashboard"), 2500);
    } finally { setLoading(false); }
  };

  return (
    <PageShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16">
        <div ref={formRef} className="w-full max-w-lg">

          <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-body mb-8 opacity-50 hover:opacity-100 transition-opacity hover-lift text-foreground">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to home
          </Link>

          <div className="text-center mb-8">
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-3 opacity-70" style={{ color: OG }}>Provider registration</p>
            <h1 className="font-heading font-extrabold text-4xl tracking-tight leading-tight" style={{ color: "#1A1A1A" }}>
              Join as a <span className="font-drama italic" style={{ color: OG }}>doctor</span>
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">Complete your profile to start seeing patients.</p>
          </div>

          {/* Step indicator */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300"
                    style={{ background: step >= i + 1 ? OG : "rgba(232,96,76,0.1)", color: step >= i + 1 ? "#fff" : "rgba(232,96,76,0.4)" }}>
                    {step > i + 1 ? "✓" : i + 1}
                  </div>
                  <span className="text-xs font-body hidden sm:block" style={{ color: step === i + 1 ? OG : "rgba(26,26,26,0.4)", fontWeight: step === i + 1 ? 600 : 400 }}>{label}</span>
                </div>
                {i < STEPS.length - 1 && <div className="w-5 sm:w-8 h-px" style={{ background: "rgba(232,96,76,0.15)" }} />}
              </div>
            ))}
          </div>

          <div className="rounded-3xl p-8 border border-white/60 shadow-xl" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)" }}>
            {error && <div className="mb-5 px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.1)", color: OG }}>{error}</div>}

            {step === 1 && (
              <form onSubmit={handleStep1} className="flex flex-col gap-5">
                {[
                  { l: "Full name", t: "text", k: "full_name", p: "Dr. Ayesha Khan" },
                  { l: "Email address", t: "email", k: "email", p: "doctor@hospital.com" },
                  { l: "Phone (optional)", t: "tel", k: "phone", p: "+92 300 0000000", req: false },
                  { l: "Password (min. 8 chars)", t: "password", k: "password", p: "••••••••" },
                ].map(({ l, t, k, p, req = true }: any) => (
                  <div key={k}>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>{l}</label>
                    <input type={t} required={req} className={inp} style={bd} value={(account as any)[k]}
                      onChange={e => setAccount({ ...account, [k]: e.target.value })} placeholder={p} onFocus={fo} onBlur={fb} />
                  </div>
                ))}
                <button type="submit" disabled={loading} className="btn-magnetic w-full py-3.5 rounded-full font-heading font-semibold text-sm text-white mt-2"
                  style={{ background: loading ? `${OG}80` : OG }}>
                  {loading ? "Creating account..." : "Continue →"}
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleStep2} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>PMC License Number *</label>
                    <input type="text" required className={inp} style={bd} value={prof.pmc_number}
                      onChange={e => setProf({ ...prof, pmc_number: e.target.value.toUpperCase() })} placeholder="PMC-XXXXX" onFocus={fo} onBlur={fb} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Specialty *</label>
                    <select required className={inp} style={bd} value={prof.specialty} onChange={e => setProf({ ...prof, specialty: e.target.value })}>
                      <option value="">Select specialty</option>
                      {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Sub-specialty</label>
                    <input type="text" className={inp} style={bd} value={prof.sub_specialty}
                      onChange={e => setProf({ ...prof, sub_specialty: e.target.value })} placeholder="Optional" onFocus={fo} onBlur={fb} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>City *</label>
                    <select required className={inp} style={bd} value={prof.city} onChange={e => setProf({ ...prof, city: e.target.value })}>
                      <option value="">Select city</option>
                      {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Experience (yrs)</label>
                    <input type="number" min="0" max="60" className={inp} style={bd} value={prof.years_of_experience}
                      onChange={e => setProf({ ...prof, years_of_experience: e.target.value })} placeholder="10" onFocus={fo} onBlur={fb} />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Hospital / Clinic</label>
                    <input type="text" className={inp} style={bd} value={prof.clinic_name}
                      onChange={e => setProf({ ...prof, clinic_name: e.target.value })} placeholder="City Hospital, Lahore" onFocus={fo} onBlur={fb} />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Clinic Address</label>
                    <input type="text" className={inp} style={bd} value={prof.clinic_address}
                      onChange={e => setProf({ ...prof, clinic_address: e.target.value })} placeholder="Street, Area, City" onFocus={fo} onBlur={fb} />
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-full font-heading font-semibold text-sm hover:scale-[1.02] transition-transform"
                    style={{ background: "rgba(232,96,76,0.08)", color: OG, border: "1px solid rgba(232,96,76,0.2)" }}>Back</button>
                  <button type="submit" className="btn-magnetic flex-[2] py-3.5 rounded-full font-heading font-semibold text-sm text-white" style={{ background: OG }}>Continue →</button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleStep3} className="flex flex-col gap-5">
                <p className="text-xs font-body text-muted-foreground">Set your consultation fees in PKR. You can update these anytime from your dashboard.</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Online fee (PKR) *</label>
                    <input type="number" required min="0" className={inp} style={bd} value={fees.online_fee}
                      onChange={e => setFees({ ...fees, online_fee: e.target.value })} placeholder="1500" onFocus={fo} onBlur={fb} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>In-clinic fee (PKR) *</label>
                    <input type="number" required min="0" className={inp} style={bd} value={fees.physical_fee}
                      onChange={e => setFees({ ...fees, physical_fee: e.target.value })} placeholder="2500" onFocus={fo} onBlur={fb} />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Home visit fee (optional)</label>
                    <input type="number" min="0" className={inp} style={bd} value={fees.home_visit_fee}
                      onChange={e => setFees({ ...fees, home_visit_fee: e.target.value })} placeholder="Leave blank if not offered" onFocus={fo} onBlur={fb} />
                  </div>
                  <div className="col-span-2">
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>About you</label>
                    <textarea rows={3} className={inp} style={{ ...bd, resize: "none" } as any} value={fees.about}
                      onChange={e => setFees({ ...fees, about: e.target.value })} placeholder="Brief professional bio..." onFocus={fo} onBlur={fb} />
                  </div>
                </div>
                <div className="rounded-2xl px-4 py-3" style={{ background: "rgba(26,107,90,0.04)", border: "1px solid rgba(26,107,90,0.08)" }}>
                  <p className="text-xs font-body text-muted-foreground"><span className="font-mono text-accent">NOTE </span>Your profile will be reviewed by our team before you go live. This usually takes 1-2 business days.</p>
                </div>
                <div className="flex gap-3 mt-2">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-full font-heading font-semibold text-sm hover:scale-[1.02] transition-transform"
                    style={{ background: "rgba(232,96,76,0.08)", color: OG, border: "1px solid rgba(232,96,76,0.2)" }}>Back</button>
                  <button type="submit" disabled={loading} className="btn-magnetic flex-[2] py-3.5 rounded-full font-heading font-semibold text-sm text-white"
                    style={{ background: loading ? `${OG}80` : OG }}>
                    {loading ? "Submitting..." : "Complete Registration"}
                  </button>
                </div>
              </form>
            )}
          </div>

          <p className="text-center mt-5 text-sm font-body text-muted-foreground">
            Already registered?{" "}
            <Link to="/login" className="font-semibold underline underline-offset-2 hover:opacity-70" style={{ color: OG }}>Sign in</Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
