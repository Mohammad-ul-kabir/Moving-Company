import carMove from "../assets/car_move.png";
import uxImg from "../assets/hero.png";
import homeMove from "../assets/home_move.png";
import officeMove from "../assets/office_move.png";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

import QuoteCard from "../components/QuoteCard";

function ServiceCard({ title, desc, src }) {
  return (
    <div className="bg-white  rounded-2xl p-6 shadow-sm hover:shadow-md transition">
      <div>
        <img src={src} />
      </div>
      <div className="font-semibold text-slate-900">{title}</div>
      <div className="text-sm text-slate-600 mt-1">{desc}</div>
    </div>
  );
}

function HowCard({ step, title, desc }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-700">
          {step}
        </div>
        <div className="font-semibold text-slate-900">{title}</div>
      </div>
      <p className="text-sm text-slate-600 mt-3">{desc}</p>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-white">
      <Navbar />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Moving Made Easy
            </h1>
            <p className="text-lg text-slate-600 mt-3">
              Get instant quotes for your move
            </p>

            <div className="mt-6">
              <QuoteCard />
            </div>
          </div>

          {/* Right illustration area */}
          <div className="hidden lg:block">
            <div className="relative overflow-hidden bg-white">
              {/* If you don’t want to use ux.png, delete the img and keep a placeholder div */}
              <img
                alt="Moving illustration"
                src={uxImg}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CARDS */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="grid md:grid-cols-3 gap-5">
          <ServiceCard
            src={homeMove}
            title="Home Moves"
            desc="House & apartment relocations"
          />
          <ServiceCard
            src={officeMove}
            title="Furniture & Large Items"
            desc="Single items, furniture & more"
          />
          <ServiceCard
            src={carMove}
            title="Vehicle Transport"
            desc="Car & motorcycle delivery"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <h2 className="text-2xl font-bold text-slate-900 text-center">
          How It Works
        </h2>

        <div className="mt-6 grid md:grid-cols-3 gap-5">
          <HowCard
            step="1"
            title="Request Your Quote"
            desc="Tell us what you need moved"
          />
          <HowCard
            step="2"
            title="Compare Prices"
            desc="Get instant quotes from trusted movers"
          />
          <HowCard
            step="3"
            title="Choose & Move"
            desc="Select the best deal and relax"
          />
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="mx-auto max-w-6xl px-4 pb-10">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <p className="text-slate-700 text-lg leading-relaxed">
            “Excellent service! The movers were punctual and very professional.
            Highly recommend!”
          </p>
          <div className="text-right text-slate-600 mt-4">— Sarah M.</div>
        </div>

        {/* RATINGS STRIP (placeholders for now) */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6 text-slate-600">
          <div className="font-semibold">Trustpilot ★★★★★</div>
          <div className="font-semibold">Google ★★★★★</div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
