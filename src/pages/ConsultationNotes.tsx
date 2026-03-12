import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctorService } from "../services/doctorService";
import PageShell from "../components/PageShell";

const MOCK_APPOINTMENT = { id:"t1", patient_name:"Muhammad Usman", patient_age:34, patient_gender:"Male", date:"18 March 2026", time:"9:00 AM", type:"Online" };

export default function ConsultationNotes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [appt] = useState(MOCK_APPOINTMENT);
  const [notes, setNotes] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(20px)";
    setTimeout(() => { el.style.transition = "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)"; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault(); setError(""); setSuccess(false); setSaving(true);
    const full = [
      notes && `Clinical Notes:\n${notes}`,
      diagnosis && `Diagnosis:\n${diagnosis}`,
      prescription && `Prescription:\n${prescription}`,
      followUp && `Follow-up:\n${followUp}`,
    ].filter(Boolean).join("\n\n");
    try {
      const token = localStorage.getItem("sync_auth");
      await doctorService.saveNotes(id, full, token);
      setSuccess(true);
      setTimeout(() => navigate("/doctor/dashboard"), 1500);
    } catch (err: any) { setError(err.message || "Failed to save. Try again."); }
    finally { setSaving(false); }
  };

  const inp = "w-full px-4 py-3 rounded-2xl border outline-none transition-all duration-200 text-sm font-body bg-white/70";
  const bd = { borderColor: "rgba(26,107,90,0.15)", resize: "none" };
  const fo = (e: any) => (e.target.style.borderColor = "#1A6B5A");
  const fb = (e: any) => (e.target.style.borderColor = "rgba(26,107,90,0.15)");

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24" ref={containerRef}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1 text-accent opacity-70">Consultation notes</p>
              <h1 className="font-heading font-extrabold text-3xl tracking-tight" style={{ color: "#1A1A1A" }}>{appt.patient_name}</h1>
            </div>
            <button onClick={() => navigate("/doctor/dashboard")} className="font-body text-sm text-muted-foreground hover:opacity-60 transition-opacity">
              ← Dashboard
            </button>
          </div>

          {/* Appointment meta */}
          <div className="rounded-3xl p-5 border border-white/60 shadow-md flex flex-wrap gap-6 mb-6" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
            {[
              { label: "Patient", value: appt.patient_name },
              { label: "Age", value: `${appt.patient_age} yrs` },
              { label: "Gender", value: appt.patient_gender },
              { label: "Date", value: appt.date },
              { label: "Time", value: appt.time },
              { label: "Type", value: appt.type },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-mono text-xs mb-0.5 text-muted-foreground">{label}</p>
                <p className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Notes form */}
          <form onSubmit={handleSave} className="space-y-4">
            {success && <div className="px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>Notes saved. Redirecting to dashboard...</div>}
            {error && <div className="px-4 py-3 rounded-2xl text-sm font-body" style={{ background: "rgba(232,96,76,0.08)", color: "#E8604C" }}>{error}</div>}

            {[
              { label: "Clinical Notes", value: notes, setter: setNotes, placeholder: "Presenting complaints, history, examination findings...", rows: 5 },
              { label: "Diagnosis", value: diagnosis, setter: setDiagnosis, placeholder: "Primary and differential diagnoses...", rows: 3 },
              { label: "Prescription / Treatment Plan", value: prescription, setter: setPrescription, placeholder: "Medications, dosage, duration, instructions...", rows: 4 },
              { label: "Follow-up Instructions", value: followUp, setter: setFollowUp, placeholder: "Follow-up date, tests, red flags to watch...", rows: 2 },
            ].map(({ label, value, setter, placeholder, rows }) => (
              <div key={label} className="rounded-3xl p-6 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                <label className="block font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">{label}</label>
                <textarea rows={rows} className={inp} style={bd as any} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} onFocus={fo} onBlur={fb} />
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button type="button" onClick={() => navigate("/doctor/dashboard")}
                className="flex-1 py-3.5 rounded-full font-heading font-semibold text-sm transition-all hover:scale-[1.02]"
                style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>
                Discard
              </button>
              <button type="submit" disabled={saving} className="btn-magnetic flex-[2] py-3.5 rounded-full font-heading font-semibold text-sm text-white"
                style={{ background: saving ? "rgba(26,107,90,0.5)" : "#1A6B5A" }}>
                {saving ? "Saving..." : "Save Notes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageShell>
  );
}
