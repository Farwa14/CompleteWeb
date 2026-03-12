import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { patientService } from "../services/patientService";
import PageShell from "../components/PageShell";

const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Hyderabad","Gujranwala","Bahawalpur","Sargodha","Sukkur"];

export default function PatientProfilePage() {
  const { user } = useAuth();
  const [form, setForm] = useState({ age: "", gender: "", city: "", emergency_contact_name: "", emergency_contact_phone: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("sync_auth");
    patientService.getProfile(token).then((d: any) => setForm({ age: d.age || "", gender: d.gender || "", city: d.city || "", emergency_contact_name: d.emergency_contact_name || "", emergency_contact_phone: d.emergency_contact_phone || "" })).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSuccess(false); setSaving(true);
    try {
      const token = localStorage.getItem("sync_auth");
      await patientService.updateProfile({ ...form, age: Number(form.age) }, token);
      setSuccess(true); setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) { setError(err.message); } finally { setSaving(false); }
  };

  const inp = "w-full px-4 py-3 rounded-2xl border outline-none transition-all duration-200 text-sm font-body bg-white/70";
  const bd = { borderColor: "rgba(26,107,90,0.2)" };
  const fo = (e: any) => (e.target.style.borderColor = "#1A6B5A");
  const fb = (e: any) => (e.target.style.borderColor = "rgba(26,107,90,0.2)");

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <div className="max-w-2xl mx-auto">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1 text-accent opacity-70">My account</p>
          <h1 className="font-heading font-extrabold text-3xl tracking-tight mb-8" style={{ color: "#1A1A1A" }}>Profile settings</h1>

          <div className="rounded-3xl p-6 border border-white/60 shadow-md mb-5" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
            <p className="font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">Account info</p>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="font-mono text-xs mb-1 text-muted-foreground">Full name</p><p className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{(user as any)?.full_name || "—"}</p></div>
              <div><p className="font-mono text-xs mb-1 text-muted-foreground">Email</p><p className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{(user as any)?.email || "—"}</p></div>
            </div>
          </div>

          <div className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
            <p className="font-mono text-xs uppercase tracking-wider mb-5 text-accent opacity-70">Health profile</p>
            {success && <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>Profile updated successfully.</div>}
            {error && <div className="mb-4 px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.1)", color: "#E8604C" }}>{error}</div>}
            {loading ? (
              <div className="py-8 flex justify-center"><div className="w-6 h-6 rounded-full border-2 animate-spin" style={{ borderColor: "#1A6B5A", borderTopColor: "transparent" }} /></div>
            ) : (
              <form onSubmit={handleSave} className="flex flex-col gap-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Age</label>
                    <input type="number" min="1" max="120" className={inp} style={bd} value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} placeholder="25" onFocus={fo} onBlur={fb} />
                  </div>
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">Gender</label>
                    <select className={inp} style={bd} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })}>
                      <option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase tracking-wider mb-2 text-accent">City</label>
                  <select className={inp} style={bd} value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}>
                    <option value="">Select city</option>{CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="rounded-2xl p-4" style={{ background: "rgba(26,107,90,0.04)", border: "1px solid rgba(26,107,90,0.1)" }}>
                  <p className="font-mono text-xs uppercase tracking-wider mb-3 text-accent">Emergency contact</p>
                  <div className="flex flex-col gap-3">
                    <input type="text" className={inp} style={bd} value={form.emergency_contact_name} onChange={e => setForm({ ...form, emergency_contact_name: e.target.value })} placeholder="Contact name" onFocus={fo} onBlur={fb} />
                    <input type="tel" className={inp} style={bd} value={form.emergency_contact_phone} onChange={e => setForm({ ...form, emergency_contact_phone: e.target.value })} placeholder="+92 300 0000000" onFocus={fo} onBlur={fb} />
                  </div>
                </div>
                <button type="submit" disabled={saving} className="btn-magnetic py-3.5 rounded-full font-heading font-semibold text-sm text-white"
                  style={{ background: saving ? "rgba(26,107,90,0.5)" : "#1A6B5A" }}>
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}
