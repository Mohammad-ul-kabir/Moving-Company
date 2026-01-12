import { Link, NavLink } from "react-router-dom";

import logoImg from "../assets/blueline.jpg";

const navLinkClass = ({ isActive }) =>
  `inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
    isActive ? "text-blue-700" : "text-slate-700 hover:bg-slate-100"
  }`;

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="font-semibold text-slate-900">
            <img alt="Moving illustration" src={logoImg} className=" h-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
            <NavLink to="/service-areas" className={navLinkClass}>
              Service Areas
            </NavLink>
            <NavLink to="/how-it-works" className={navLinkClass}>
              How It Works
            </NavLink>
            <NavLink to="/account" className={navLinkClass}>
              My Account
            </NavLink>
          </nav>
        </div>

        <Link
          to="/inquiry"
          className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
        >
          Get a Quote
        </Link>
      </div>
    </header>
  );
}
