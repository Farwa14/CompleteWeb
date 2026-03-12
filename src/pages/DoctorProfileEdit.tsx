import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doctorService } from "../services/doctorService";
import PageShell from "../components/PageShell";

const SPECIALTIES = ["General Physician","Cardiologist","Dermatologist","Neurologist","Orthopedic Surgeon","Gynecologist","Pediatrician","Psychiatrist","Ophthalmologist","ENT Specialist","Urologist","Oncologist","Gastroenterologist","Pulmonologist","Endocrinologist","Dentist"];
const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Hyderabad"];
const OG = "#E8604C";

export default function DoctorProfileEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ specialty:"", sub_specialty:"", city:"", clinic_name:"", clinic_address:"", years_of_experience:"", online_fee:"", physical_fee:"", home_visit_fee:"", about:"" });
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sync_auth");
    doctorService.getProfile("me", token).then((d: any) => setForm({ specialty: d.specialty || "", sub_specialty: d.sub_specialty || "", city: d.city || "", clinic_name: d.clinic_name || "", clinic_address: d.clinic_address || "", years_of_experience: d.years_of_experience || "", online_fee: d.online_fee || "", physical_fee: d.physical_fee || "", home_visit_fee: d.home_visit_fee || "", about: d.about || "" })).catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSuccess(false); setSaving(true);
    try {
      const token = localStorage.getItem("sync_auth");
      await doctorService.updateProfile({ ...form, years_of_experience: form.years_of_experience ? Number(form.years_of_experience) : undefined, online_fee: Number(form.online_fee), physical_fee: Number(form.physical_fee), home_visit_fee: form.home_visit_fee ? Number(form.home_visit_fee) : undefined }, token);
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) { setError(err.message); } finally { setSaving(false); }
  };

  const inp = "w-full px-4 py-3 rounded-2xl border outline-none transition-all duration-200 text-sm font-body bg-white/70";
  const bd = { borderColor: "rgba(232,96,76,0.2)" };
  const fo = (e: any) => (e.target.style.borderColor = OG);
  const fb = (e: any) => (e.target.style.borderColor = "rgba(232,96,76,0.2)");

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1 opacity-70" style={{ color: OG }}>Practice settings</p>
              <h1 className="font-heading font-extrabold text-3xl tracking-tight" style={{ color: "#1A1A1A" }}>Edit your profile</h1>
            </div>
            <button onClick={() => navigate("/doctor/dashboard")} className="font-body text-sm text-muted-foreground hover:opacity-60 transition-opacity">
              ← Dashboard
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-5">
            {success && <div className="px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>Profile updated successfully.</div>}
            {error && <div className="px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.1)", color: OG }}>{error}</div>}

            <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-5 opacity-70" style={{ color: OG }}>Professional info</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Specialty</label>
                  <select className={inp} style={bd} value={form.specialty} onChange={e => setForm({ ...form, specialty: e.target.value })}>
                    <option value="">Select</option>{SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Sub-specialty</label>
                  <input type="text" className={inp} style={bd} value={form.sub_specialty} onChange={e => setForm({ ...form, sub_specialty: e.target.value })} placeholder="Optional" onFocus={fo} onBlur={fb} />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>City</label>
                  <select className={inp} style={bd} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                    <option value="">Select city</option>{CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Experience (yrs)</label>
                  <input type="number" min="0" className={inp} style={bd} value={form.years_of_experience} onChange={e => setForm({ ...form, years_of_experience: e.target.value })} placeholder="10" onFocus={fo} onBlur={fb} />
                </div>
                <div className="col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Hospital / Clinic</label>
                  <input type="text" className={inp} style={bd} value={form.clinic_name} onChange={e => setForm({ ...form, clinic_name: e.target.value })} placeholder="City Hospital" onFocus={fo} onBlur={fb} />
                </div>
                <div className="col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Clinic address</label>
                  <input type="text" className={inp} style={bd} value={form.clinic_address} onChange={e => setForm({ ...form, clinic_address: e.target.value })} placeholder="Street, Area" onFocus={fo} onBlur={fb} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-5 opacity-70" style={{ color: OG }}>Consultation fees (PKR)</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Online</label>
                  <input type="number" min="0" className={inp} style={bd} value={form.online_fee} onChange={e => setForm({ ...form, online_fee: e.target.value })} placeholder="1500" onFocus={fo} onBlur={fb} />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>In-clinic</label>
                  <input type="number" min="0" className={inp} style={bd} value={form.physical_fee} onChange={e => setForm({ ...form, physical_fee: e.target.value })} placeholder="2500" onFocus={fo} onBlur={fb} />
                </div>
                <div className="col-span-2">
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2" style={{ color: OG }}>Home visit (optional)</label>
                  <input type="number" min="0" className={inp} style={bd} value={form.home_visit_fee} onChange={e => setForm({ ...form, home_visit_fee: e.target.value })} placeholder="Leave blank if not offered" onFocus={fo} onBlur={fb} />
                </div>
              </div>
            </div>

            <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 opacity-70" style={{ color: OG }}>About you</p>
              <textarea rows={4} className={inp} style={{ ...bd, resize: "none" } as any} value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} placeholder="Brief professional bio..." onFocus={fo} onBlur={fb} />
            </div>

            <button type="submit" disabled={saving} className="btn-magnetic w-full py-3.5 rounded-full font-heading font-semibold text-sm text-white"
              style={{ background: saving ? `${OG}80` : OG }}>
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
