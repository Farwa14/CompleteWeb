import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageShell from "../components/PageShell";

const TODAY = [
  { id:"t1", patient:"Muhammad Usman", age:34, time:"9:00 AM", type:"Online", status:"confirmed" },
  { id:"t2", patient:"Fatima Zahra", age:28, time:"11:30 AM", type:"In-clinic", status:"confirmed" },
  { id:"t3", patient:"Ahmed Raza", age:52, time:"2:00 PM", type:"Online", status:"pending" },
];
const UPCOMING = [
  { id:"u1", patient:"Sara Bano", age:41, date:"19 March", time:"10:00 AM", type:"In-clinic" },
  { id:"u2", patient:"Tariq Mehmood", age:29, date:"21 March", time:"3:30 PM", type:"Online" },
];
const OG = "#E8604C";

export default function DoctorDashboard() {
  const { user } = useAuth();
  const firstName = (user as any)?.full_name?.replace("Dr. ", "").split(" ")[0] || "Doctor";

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24">
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1 opacity-70" style={{ color: OG }}>Doctor dashboard</p>
            <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight" style={{ color: "#1A1A1A" }}>
              Welcome back, <span className="font-drama italic" style={{ color: OG }}>Dr. {firstName}</span>
            </h1>
          </div>
          <Link to="/doctor/profile/edit" className="px-4 py-2.5 rounded-full text-sm font-heading font-semibold transition-all hover:scale-[1.02]"
            style={{ background: "rgba(232,96,76,0.08)", color: OG, border: "1px solid rgba(232,96,76,0.2)" }}>
            Edit Profile
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label:"Total Patients", value:"142", sub:"this month" },
            { label:"This Week", value:"18", sub:"appointments" },
            { label:"Rating", value:"4.8", sub:"out of 5" },
            { label:"Response Rate", value:"96%", sub:"avg. 2hr reply" },
          ].map(s => (
            <div key={s.label} className="rounded-3xl p-5 border border-white/60 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-heading font-extrabold text-3xl mb-1 text-accent">{s.value}</p>
              <p className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{s.label}</p>
              <p className="font-body text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <p className="font-mono text-xs uppercase tracking-wider text-accent opacity-70">Today's schedule</p>
            <div className="space-y-3">
              {TODAY.map(appt => (
                <div key={appt.id} className="rounded-3xl p-5 border border-white/60 shadow-sm flex items-center justify-between"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-heading font-bold flex-shrink-0"
                      style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>
                      {appt.patient.split(" ").map(w => w[0]).join("").slice(0, 2)}
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm" style={{ color: "#1A1A1A" }}>{appt.patient}</p>
                      <p className="font-body text-xs text-muted-foreground">Age {appt.age} · {appt.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full"
                      style={{ background: appt.type === "Online" ? "rgba(26,107,90,0.08)" : "rgba(232,96,76,0.08)", color: appt.type === "Online" ? "#1A6B5A" : OG }}>
                      {appt.type}
                    </span>
                    <Link to={`/doctor/appointments/${appt.id}/notes`}
                      className="btn-magnetic text-xs px-3 py-1.5 rounded-full text-white font-heading font-semibold" style={{ background: "#1A6B5A" }}>
                      Notes
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <p className="font-mono text-xs uppercase tracking-wider text-accent opacity-70 pt-2">Upcoming</p>
            <div className="space-y-3">
              {UPCOMING.map(appt => (
                <div key={appt.id} className="rounded-3xl p-5 border border-white/60 shadow-sm flex items-center justify-between"
                  style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                  <div>
                    <p className="font-heading font-semibold text-sm" style={{ color: "#1A1A1A" }}>{appt.patient}</p>
                    <p className="font-body text-xs text-muted-foreground">{appt.date} at {appt.time}</p>
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded-full"
                    style={{ background: appt.type === "Online" ? "rgba(26,107,90,0.08)" : "rgba(232,96,76,0.08)", color: appt.type === "Online" ? "#1A6B5A" : OG }}>
                    {appt.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl p-5 border border-white/60 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-3 text-accent opacity-70">Profile status</p>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>Verification pending</span>
              </div>
              <p className="font-body text-xs text-muted-foreground">Your PMC license is being verified. Usually 1–2 business days.</p>
            </div>
            <div className="rounded-3xl p-5 border border-white/60 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">Quick actions</p>
              <div className="space-y-2">
                <Link to="/doctor/profile/edit" className="btn-magnetic flex items-center justify-center px-4 py-3 rounded-full text-sm font-heading font-semibold text-white" style={{ background: OG }}>
                  Edit practice details
                </Link>
                <button className="w-full flex items-center justify-center px-4 py-3 rounded-full text-sm font-heading font-medium text-accent hover-lift"
                  style={{ background: "rgba(26,107,90,0.06)", border: "1px solid rgba(26,107,90,0.15)" }}>
                  Set availability
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
