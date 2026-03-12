import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (hash: string) => {
    if (isHome) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/" + hash);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 bg-background ${scrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="font-heading font-bold text-xl text-accent">Sync</Link>
        <div className="hidden md:flex items-center gap-1">
          <Link to="/doctors" className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">Find Doctors</Link>
          <button onClick={() => handleSmoothScroll("#how-it-works")} className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">How it Works</button>
          <Link to="/for-doctors" className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">For Doctors</Link>
          {user ? (
            <>
              <Link to={user.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"} className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">Dashboard</Link>
              <button onClick={handleLogout} className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">Sign Out</button>
            </>
          ) : (
            <Link to="/login" className="hover-lift px-4 py-2 text-sm font-body font-medium rounded-full transition-colors duration-300 text-foreground">Login</Link>
          )}
        </div>
        {user ? (
          <Link to={user.role === "doctor" ? "/doctor/dashboard" : "/patient/dashboard"} className="btn-magnetic px-6 py-2.5 rounded-full text-white text-sm font-heading font-semibold bg-accent">My Dashboard</Link>
        ) : (
          <Link to="/register/patient" className="btn-magnetic px-6 py-2.5 rounded-full text-white text-sm font-heading font-semibold bg-accent">Sign Up</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
