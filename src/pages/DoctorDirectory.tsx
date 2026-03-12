import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { doctorService } from "../services/doctorService";
import PageShell from "../components/PageShell";

const SPECIALTIES = ["General Physician","Cardiologist","Dermatologist","Neurologist","Orthopedic Surgeon","Gynecologist","Pediatrician","Psychiatrist","Ophthalmologist","ENT Specialist","Urologist","Oncologist","Gastroenterologist","Pulmonologist","Endocrinologist","Dentist"];
const CITIES = ["Karachi","Lahore","Islamabad","Rawalpindi","Faisalabad","Multan","Peshawar","Quetta","Sialkot","Hyderabad"];

const MOCK: any[] = [
  { id:"1", full_name:"Dr. Ayesha Malik", specialty:"Cardiologist", city:"Lahore", years_of_experience:12, online_fee:2000, rating:4.8, reviews:124 },
  { id:"2", full_name:"Dr. Tariq Ahmed", specialty:"Neurologist", city:"Karachi", years_of_experience:8, online_fee:2500, rating:4.7, reviews:89 },
  { id:"3", full_name:"Dr. Sara Iqbal", specialty:"Dermatologist", city:"Islamabad", years_of_experience:6, online_fee:1500, rating:4.9, reviews:203 },
  { id:"4", full_name:"Dr. Bilal Chaudhry", specialty:"General Physician", city:"Lahore", years_of_experience:15, online_fee:1000, rating:4.6, reviews:312 },
  { id:"5", full_name:"Dr. Nadia Hussain", specialty:"Gynecologist", city:"Karachi", years_of_experience:10, online_fee:2200, rating:4.8, reviews:156 },
  { id:"6", full_name:"Dr. Kamran Shah", specialty:"Pediatrician", city:"Rawalpindi", years_of_experience:9, online_fee:1800, rating:4.5, reviews:78 },
  { id:"7", full_name:"Dr. Hina Qureshi", specialty:"Dermatologist", city:"Lahore", years_of_experience:7, online_fee:1700, rating:4.8, reviews:141 },
  { id:"8", full_name:"Dr. Usman Farooq", specialty:"Orthopedic Surgeon", city:"Islamabad", years_of_experience:14, online_fee:3000, rating:4.6, reviews:98 },
  { id:"9", full_name:"Dr. Zainab Raza", specialty:"Psychiatrist", city:"Karachi", years_of_experience:5, online_fee:2000, rating:4.7, reviews:67 },
  { id:"10", full_name:"Dr. Fahad Mirza", specialty:"ENT Specialist", city:"Lahore", years_of_experience:11, online_fee:1600, rating:4.5, reviews:53 },
  { id:"11", full_name:"Dr. Sana Yousuf", specialty:"Gynecologist", city:"Islamabad", years_of_experience:8, online_fee:2100, rating:4.9, reviews:189 },
  { id:"12", full_name:"Dr. Hamid Awan", specialty:"General Physician", city:"Karachi", years_of_experience:20, online_fee:800, rating:4.4, reviews:421 },
];

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(s => (
      <svg key={s} className="w-3 h-3" viewBox="0 0 12 12" fill={s <= Math.round(rating) ? "#E8604C" : "rgba(232,96,76,0.15)"}>
        <path d="M6 0l1.5 4H12L8.5 6.5 10 12 6 9l-4 3 1.5-5.5L0 4h4.5z"/>
      </svg>
    ))}
  </div>
);

function DoctorCard({ doc, index }: { doc: any; index: number }) {
  const initials = doc.full_name.split(" ").filter((w: string) => !w.startsWith("Dr.")).slice(0, 2).map((w: string) => w[0]).join("");
  return (
    <div className="rounded-3xl p-6 border border-white/60 shadow-md flex flex-col transition-all duration-300 hover-lift"
      style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", animationDelay: `${index * 0.07}s` }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 16px 48px rgba(26,107,90,0.12)")}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "")}>
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-lg font-heading font-bold"
          style={{ background: "rgba(26,107,90,0.08)", color: "#1A6B5A" }}>{initials}</div>
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-bold text-base mb-0.5 truncate" style={{ color: "#1A1A1A" }}>{doc.full_name}</h3>
          <p className="font-body text-sm font-medium" style={{ color: "#E8604C" }}>{doc.specialty}</p>
          <p className="font-body text-xs mt-0.5 text-muted-foreground">{doc.city} · {doc.years_of_experience} yrs exp.</p>
        </div>
      </div>
      <div className="flex items-center justify-between mb-5 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-sm font-medium text-accent">{(doc.rating || 4.7).toFixed(1)}</span>
          <Stars rating={doc.rating || 4.7} />
          <span className="font-body text-xs text-muted-foreground">({doc.reviews || 0})</span>
        </div>
        <div className="text-right">
          <p className="font-mono text-xs text-muted-foreground">Online</p>
          <p className="font-heading font-bold text-sm text-accent">PKR {(doc.online_fee || 0).toLocaleString()}</p>
        </div>
      </div>
      <Link to={`/doctors/${doc.id}`}
        className="btn-magnetic block w-full py-3 rounded-full text-center text-sm font-heading font-semibold text-white"
        style={{ background: "#1A6B5A" }}>
        View Profile
      </Link>
    </div>
  );
}

const selStyle: React.CSSProperties = {
  borderColor: "rgba(26,107,90,0.2)", background: "rgba(255,255,255,0.7)", color: "#1A1A1A",
  fontFamily: "'Outfit',sans-serif", appearance: "none", WebkitAppearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231A6B5A' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "40px",
};

export default function DoctorDirectory() {
  const [doctors, setDoctors] = useState<any[]>(MOCK);
  const [specialty, setSpecialty] = useState("");
  const [city, setCity] = useState("");
  const [search, setSearch] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    doctorService.listDoctors().then(setDoctors).catch(() => {});
    const ctx = gsap.context(() => {
      gsap.from(".dir-hero", { y: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, delay: 0.2 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const filtered = doctors.filter(d => {
    const ms = !specialty || d.specialty === specialty;
    const mc = !city || d.city === city;
    const mq = !search || d.full_name.toLowerCase().includes(search.toLowerCase()) || (d.specialty || "").toLowerCase().includes(search.toLowerCase());
    return ms && mc && mq;
  });

  return (
    <PageShell>
      {/* Hero */}
      <div ref={heroRef} className="pt-32 pb-12 px-6 md:px-12 lg:px-24">
        <p className="dir-hero font-mono text-xs tracking-[0.25em] uppercase mb-4 text-center text-accent opacity-70">Find your specialist</p>
        <h1 className="dir-hero font-heading font-extrabold text-5xl md:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-center mb-4" style={{ color: "#1A1A1A" }}>
          Doctors across <span className="font-drama italic text-accent">Pakistan</span>
        </h1>
        <p className="dir-hero font-body text-lg text-center max-w-2xl mx-auto text-muted-foreground">
          Browse verified specialists and book online or in-clinic consultations.
        </p>
      </div>

      {/* Filters */}
      <div className="px-6 md:px-12 lg:px-24 mb-10">
        <div className="rounded-3xl p-4 flex flex-col md:flex-row gap-3 border border-white/60 shadow-md" style={{ backgroundColor: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)" }}>
          <input type="text" placeholder="Search by name or specialty..." value={search} onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl border outline-none text-sm font-body bg-white/70 transition-all"
            style={{ borderColor: "rgba(26,107,90,0.2)" }}
            onFocus={e => (e.target.style.borderColor = "#1A6B5A")} onBlur={e => (e.target.style.borderColor = "rgba(26,107,90,0.2)")} />
          <select value={specialty} onChange={e => setSpecialty(e.target.value)} className="px-4 py-3 rounded-2xl border outline-none text-sm" style={{ ...selStyle, minWidth: 200 }}>
            <option value="">Select Specialty</option>
            {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={city} onChange={e => setCity(e.target.value)} className="px-4 py-3 rounded-2xl border outline-none text-sm" style={{ ...selStyle, minWidth: 170 }}>
            <option value="">Select City</option>
            {CITIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          {(specialty || city || search) && (
            <button onClick={() => { setSpecialty(""); setCity(""); setSearch(""); }}
              className="px-5 py-3 rounded-full text-sm font-heading font-semibold transition-all hover:scale-[1.02]"
              style={{ background: "rgba(232,96,76,0.08)", color: "#E8604C", border: "1px solid rgba(232,96,76,0.2)" }}>
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 md:px-12 lg:px-24 pb-20">
        <p className="font-mono text-xs text-muted-foreground mb-6">
          {filtered.length} doctor{filtered.length !== 1 ? "s" : ""} found
          {specialty && ` · ${specialty}`}{city && ` · ${city}`}
        </p>
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-heading font-bold text-2xl mb-3" style={{ color: "#1A1A1A" }}>No doctors found</p>
            <p className="font-body text-muted-foreground mb-6">Try adjusting your filters</p>
            <button onClick={() => { setSpecialty(""); setCity(""); setSearch(""); }}
              className="btn-magnetic px-6 py-3 rounded-full text-sm font-heading font-semibold text-white" style={{ background: "#1A6B5A" }}>
              Show all doctors
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((doc, i) => <DoctorCard key={doc.id} doc={doc} index={i} />)}
          </div>
        )}
      </div>
    </PageShell>
  );
}
