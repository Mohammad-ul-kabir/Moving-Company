import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../assets/blueline.jpg";
import {
  clearCustomerAuth,
  getCustomerAuth,
} from "../services/customerAuthApi";

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "text-blue-700" : "text-slate-700 hover:bg-slate-100"
  }`;

// Mobile version of the link style (full width)
const mobileLinkClass = ({ isActive }) =>
  `w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "text-blue-700 bg-slate-50" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function Navbar() {
  const nav = useNavigate();
  const location = useLocation();
  const auth = getCustomerAuth();
  const isLoggedIn = !!auth?.token;

  // Mobile menu state (only used below md)
  const [mobileOpen, setMobileOpen] = useState(false);

  const logout = () => {
    clearCustomerAuth();
    setMobileOpen(false);
    nav("/", { replace: true });
  };

  // Close menu when route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-semibold text-slate-900">
            <img alt="Moving illustration" src={logoImg} className="h-auto" />
          </div>

          {/* Desktop nav (UNCHANGED) */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/service-areas" className={navLinkClass}>
              Service Areas
            </NavLink>
            <NavLink to="/book" className={navLinkClass}>
              book
            </NavLink>
            <NavLink to="/how-it-works" className={navLinkClass}>
              How It Works
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink to="/my-requests" className={navLinkClass}>
                  My Requests
                </NavLink>
                <button onClick={logout} className={navLinkClass} type="button">
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={navLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={navLinkClass}>
                  Sign up
                </NavLink>
              </>
            )}
          </nav>
        </div>

        {/* Right side: keep Get a Quote for desktop, hamburger for mobile */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA (UNCHANGED) */}
          <Link
            to="/inquiry"
            className="hidden md:inline-flex px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
          >
            Get a Quote
          </Link>

          {/* Mobile/Tablet hamburger (below md) */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-xl hover:bg-slate-100"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Open menu</span>

            {!mobileOpen ? (
              // Hamburger icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h16M4 12h16M4 17h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            ) : (
              // X icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown (below md only) */}
      {mobileOpen && (
        <div id="mobile-menu" className="md:hidden border-t bg-white">
          <div className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <NavLink to="/" className={mobileLinkClass}>
              Home
            </NavLink>
            <NavLink to="/service-areas" className={mobileLinkClass}>
              Service Areas
            </NavLink>
            <NavLink to="/book" className={mobileLinkClass}>
              book
            </NavLink>
            <NavLink to="/how-it-works" className={mobileLinkClass}>
              How It Works
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink to="/my-requests" className={mobileLinkClass}>
                  My Requests
                </NavLink>
                <button
                  onClick={logout}
                  className="w-full inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition text-slate-700 hover:bg-slate-100"
                  type="button"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink to="/login" className={mobileLinkClass}>
                  Login
                </NavLink>
                <NavLink to="/signup" className={mobileLinkClass}>
                  Sign up
                </NavLink>
              </>
            )}

            {/* Mobile CTA */}
            <Link
              to="/inquiry"
              className="mt-2 w-full inline-flex justify-center px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
