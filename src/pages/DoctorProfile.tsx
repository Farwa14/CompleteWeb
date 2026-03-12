import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doctorService } from "../services/doctorService";
import { useAuth } from "../context/AuthContext";
import PageShell from "../components/PageShell";

const PH = { id:"1", full_name:"Dr. Ayesha Malik", specialty:"Cardiologist", sub_specialty:"Interventional Cardiology", city:"Lahore", clinic_name:"Shaukat Khanum Memorial Hospital", clinic_address:"7A, Johar Town, Lahore", years_of_experience:12, online_fee:2000, physical_fee:3500, rating:4.8, reviews:124, about:"Dr. Ayesha Malik is a board-certified cardiologist with over 12 years of experience in interventional cardiology and preventive heart care.", pmc_number:"PMC-45231" };

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">{[1,2,3,4,5].map(s => <svg key={s} className="w-3.5 h-3.5" viewBox="0 0 12 12" fill={s <= Math.round(rating) ? "#E8604C" : "rgba(232,96,76,0.15)"}><path d="M6 0l1.5 4H12L8.5 6.5 10 12 6 9l-4 3 1.5-5.5L0 4h4.5z"/></svg>)}</div>
);

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    doctorService.getProfile(id, null).then(setDoctor).catch(() => setDoctor(PH)).finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <PageShell>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#1A6B5A", borderTopColor: "transparent" }} />
      </div>
    </PageShell>
  );

  const d = doctor || PH;
  const initials = d.full_name.split(" ").filter((w: string) => !w.startsWith("Dr.")).slice(0, 2).map((w: string) => w[0]).join("");

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <Link to="/doctors" className="inline-flex items-center gap-1.5 text-sm font-body mb-8 opacity-50 hover:opacity-100 transition-opacity hover-lift text-foreground">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          All doctors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Main card */}
            <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <div className="flex items-start gap-5">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0 text-2xl font-heading font-bold"
                  style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>{initials}</div>
                <div className="flex-1">
                  <h1 className="font-heading font-extrabold text-2xl mb-1 tracking-tight" style={{ color: "#1A1A1A" }}>{d.full_name}</h1>
                  <p className="font-body text-base font-medium mb-0.5" style={{ color: "#E8604C" }}>
                    {d.specialty}{d.sub_specialty && <span className="font-normal opacity-60"> · {d.sub_specialty}</span>}
                  </p>
                  <p className="font-body text-sm text-muted-foreground">{d.clinic_name && `${d.clinic_name}, `}{d.city} · {d.years_of_experience} yrs exp.</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Stars rating={d.rating || 4.7} />
                    <span className="font-mono text-sm font-medium text-accent">{(d.rating || 4.7).toFixed(1)}</span>
                    <span className="font-body text-xs text-muted-foreground">({d.reviews || 0} reviews)</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mt-5">
                <span className="font-mono text-xs px-3 py-1 rounded-full" style={{ background: "rgba(26,107,90,0.06)", color: "#1A6B5A" }}>PMC: {d.pmc_number}</span>
                {d.clinic_address && <span className="font-body text-xs px-3 py-1 rounded-full" style={{ background: "rgba(26,107,90,0.06)", color: "#1A6B5A" }}>{d.clinic_address}</span>}
              </div>
            </div>

            {/* About */}
            {d.about && (
              <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                <p className="font-mono text-xs uppercase tracking-wider mb-3 text-accent opacity-70">About</p>
                <p className="font-body text-sm leading-relaxed text-muted-foreground">{d.about}</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div className="rounded-3xl p-6 border border-white/60 shadow-md sticky top-24" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">Consultation fees</p>
              <div className="space-y-3 mb-6">
                {[
                  { label: "Online", fee: d.online_fee },
                  { label: "In-clinic", fee: d.physical_fee },
                  ...(d.home_visit_fee ? [{ label: "Home visit", fee: d.home_visit_fee }] : []),
                ].map(({ label, fee }) => (
                  <div key={label} className="flex justify-between items-center">
                    <span className="font-body text-sm text-muted-foreground">{label}</span>
                    <span className="font-heading font-bold text-sm text-accent">PKR {(fee || 0).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              {user ? (
                <button className="btn-magnetic w-full py-3.5 rounded-full text-sm font-heading font-semibold text-white" style={{ background: "#1A6B5A" }}>Book Appointment</button>
              ) : (
                <div className="space-y-2">
                  <Link to="/register/patient" className="btn-magnetic block w-full py-3.5 rounded-full text-center text-sm font-heading font-semibold text-white" style={{ background: "#1A6B5A" }}>Register to Book</Link>
                  <Link to="/login" className="block w-full py-3 rounded-full text-center text-sm font-heading font-medium text-accent hover:scale-[1.01] transition-transform"
                    style={{ background: "rgba(26,107,90,0.06)", border: "1px solid rgba(26,107,90,0.15)" }}>Already have an account?</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
