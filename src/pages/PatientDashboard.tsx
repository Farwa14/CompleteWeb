import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PageShell from "../components/PageShell";

const UPCOMING = [
  { id:"a1", doctor:"Dr. Ayesha Malik", specialty:"Cardiologist", date:"18 March 2026", time:"10:30 AM", type:"Online" },
  { id:"a2", doctor:"Dr. Tariq Ahmed", specialty:"Neurologist", date:"25 March 2026", time:"3:00 PM", type:"In-clinic" },
];

export default function PatientDashboard() {
  const { user } = useAuth();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hello! Tell me what symptoms you're experiencing and I'll help you find the right specialist." },
  ]);
  const [chatLoading, setChatLoading] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const firstName = (user as any)?.full_name?.split(" ").find((w: string) => !w.startsWith("Dr.")) || "there";

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    el.style.opacity = "0"; el.style.transform = "translateY(20px)";
    setTimeout(() => { el.style.transition = "all 0.6s cubic-bezier(0.25,0.46,0.45,0.94)"; el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 60);
  }, []);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const msg = chatInput.trim(); setChatInput("");
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setChatLoading(true);
    try {
      const token = localStorage.getItem("sync_auth");
      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"}/chat/message`, {
        method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "assistant", text: data.reply || data.message || "I can help you find the right specialist. Could you describe your symptoms in more detail?" }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", text: "Based on your symptoms, I would suggest seeing a General Physician first. Would you like me to find available doctors in your city?" }]);
    } finally { setChatLoading(false); }
  };

  return (
    <PageShell>
      <div className="pt-28 pb-16 px-6 md:px-12 lg:px-24" ref={headerRef}>
        {/* Header */}
        <div className="mb-10">
          <p className="font-mono text-xs tracking-[0.25em] uppercase mb-1 text-accent opacity-70">Patient dashboard</p>
          <h1 className="font-heading font-extrabold text-3xl md:text-4xl tracking-tight" style={{ color: "#1A1A1A" }}>
            Good morning, <span className="font-drama italic text-accent">{firstName}</span>
          </h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Appointments", value: "3", sub: "this month" },
            { label: "AI Chats", value: "12", sub: "this week" },
            { label: "Doctors Saved", value: "5", sub: "favourites" },
          ].map(s => (
            <div key={s.label} className="rounded-3xl p-5 border border-white/60 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-heading font-extrabold text-3xl mb-1 text-accent">{s.value}</p>
              <p className="font-body text-sm font-medium" style={{ color: "#1A1A1A" }}>{s.label}</p>
              <p className="font-body text-xs text-muted-foreground">{s.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* AI Chat */}
            <div className="rounded-3xl border border-white/60 shadow-md overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <div className="px-6 py-4 border-b border-white/40 flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: "#1A6B5A" }}>
                  <span className="w-2 h-2 rounded-full bg-white pulse-dot" />
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: "#1A1A1A" }}>Sync Health AI</p>
                  <p className="font-body text-xs text-muted-foreground">Describe your symptoms</p>
                </div>
                <span className="ml-auto font-mono text-xs px-2 py-1 rounded-full text-accent" style={{ background: "rgba(26,107,90,0.08)" }}>AI</span>
              </div>
              <div className="px-6 py-4 max-h-64 overflow-y-auto space-y-3">
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className="max-w-xs px-4 py-2.5 rounded-2xl text-sm font-body"
                      style={msg.role === "user" ? { background: "#1A6B5A", color: "#fff" } : { background: "rgba(26,107,90,0.07)", color: "#1A1A1A" }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="px-4 py-3 rounded-2xl" style={{ background: "rgba(26,107,90,0.07)" }}>
                      <div className="flex gap-1">{[0,1,2].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "#1A6B5A", animationDelay: `${i * 0.15}s` }} />)}</div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="px-4 pb-4">
                <div className="flex gap-2">
                  <input type="text" value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMessage()}
                    placeholder="Describe your symptoms..."
                    className="flex-1 px-4 py-2.5 rounded-full border outline-none text-sm font-body bg-white/70 transition-all"
                    style={{ borderColor: "rgba(26,107,90,0.2)" }}
                    onFocus={e => (e.target.style.borderColor = "#1A6B5A")} onBlur={e => (e.target.style.borderColor = "rgba(26,107,90,0.2)")} />
                  <button onClick={sendMessage} disabled={chatLoading || !chatInput.trim()}
                    className="btn-magnetic px-5 py-2.5 rounded-full text-sm font-heading font-semibold text-white"
                    style={{ background: "#1A6B5A", opacity: chatInput.trim() ? 1 : 0.5 }}>Send</button>
                </div>
              </div>
            </div>

            {/* Appointments */}
            <div>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">Upcoming appointments</p>
              <div className="space-y-3">
                {UPCOMING.map(appt => (
                  <div key={appt.id} className="rounded-3xl p-5 border border-white/60 shadow-sm flex items-center justify-between"
                    style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
                    <div>
                      <p className="font-heading font-semibold text-sm mb-0.5" style={{ color: "#1A1A1A" }}>{appt.doctor}</p>
                      <p className="font-body text-xs font-medium" style={{ color: "#E8604C" }}>{appt.specialty}</p>
                      <p className="font-body text-xs mt-1 text-muted-foreground">{appt.date} at {appt.time}</p>
                    </div>
                    <span className="font-mono text-xs px-2.5 py-1 rounded-full"
                      style={{ background: appt.type === "Online" ? "rgba(26,107,90,0.08)" : "rgba(232,96,76,0.08)", color: appt.type === "Online" ? "#1A6B5A" : "#E8604C" }}>
                      {appt.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="rounded-3xl p-5 border border-white/60 shadow-sm" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
              <p className="font-mono text-xs uppercase tracking-wider mb-4 text-accent opacity-70">Quick actions</p>
              <div className="space-y-2">
                <Link to="/doctors" className="btn-magnetic flex items-center justify-center px-4 py-3 rounded-full text-sm font-heading font-semibold text-white" style={{ background: "#1A6B5A" }}>
                  Find a Doctor
                </Link>
                <Link to="/patient/profile" className="flex items-center justify-center px-4 py-3 rounded-full text-sm font-heading font-medium text-accent hover-lift transition-all"
                  style={{ background: "rgba(26,107,90,0.06)", border: "1px solid rgba(26,107,90,0.15)" }}>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
