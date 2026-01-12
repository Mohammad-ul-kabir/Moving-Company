import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function StepCard({ step, title, desc }) {
  return (
    <div className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition">
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

function MiniCard({ title, desc }) {
  return (
    <div className="bg-white border rounded-2xl p-5 shadow-sm">
      <div className="font-semibold text-slate-900">{title}</div>
      <p className="text-sm text-slate-600 mt-2">{desc}</p>
    </div>
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="group bg-white border rounded-2xl p-5 shadow-sm">
      <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
        <div className="font-semibold text-slate-900">{q}</div>
        <span className="text-slate-500 group-open:rotate-45 transition">
          +
        </span>
      </summary>
      <p className="text-sm text-slate-600 mt-3 leading-relaxed">{a}</p>
    </details>
  );
}

export default function HowItWorks() {
  const steps = [
    {
      step: "1",
      title: "Check Service Areas",
      desc: "Search your pickup/drop postcode to confirm availability in your area.",
    },
    {
      step: "2",
      title: "Request a Quote",
      desc: "Fill in your move details and get quotes based on the scope of your move.",
    },
    {
      step: "3",
      title: "Book Instantly",
      desc: "Choose a suitable option and confirm your booking in minutes.",
    },
  ];

  const faqs = [
    {
      q: "Do you provide quotes without a home visit?",
      a: "Yes — share pickup/drop postcodes and move details, and we’ll provide a quote based on the information you submit.",
    },
    {
      q: "Can I move without selecting a date?",
      a: "Yes. If you’re unsure, you can submit an inquiry without a fixed date and we’ll contact you to confirm.",
    },
    {
      q: "What if my area isn’t available?",
      a: "You can still send an inquiry. We’ll let you know if we can arrange service or add your area soon.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-10 space-y-12">
        {/* HERO */}
        <section className="bg-white border rounded-2xl shadow-sm p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
                How It Works
              </h1>
              <p className="text-slate-600 mt-3 max-w-2xl">
                A simple process to get quotes, confirm availability, and book
                your move online.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/service-areas"
                className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-900 font-semibold hover:bg-slate-200"
              >
                Check Areas
              </Link>
              <Link
                to="/inquiry"
                className="px-5 py-2.5 rounded-xl bg-white border font-semibold hover:bg-slate-50"
              >
                Get a Quote
              </Link>
              <Link
                to="/book"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>

        {/* STEPS */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 text-center">
            3 Simple Steps
          </h2>
          <div className="mt-6 grid md:grid-cols-3 gap-5">
            {steps.map((s) => (
              <StepCard key={s.step} {...s} />
            ))}
          </div>
        </section>

        {/* WHAT YOU GET */}
        <section className="grid lg:grid-cols-3 gap-5">
          <MiniCard
            title="Instant clarity"
            desc="Know if we serve your area and what to do next."
          />
          <MiniCard
            title="Fast quotes"
            desc="Submit details and receive quotations based on your move scope."
          />
          <MiniCard
            title="Quick booking"
            desc="Book instantly once you’re ready — no long back-and-forth."
          />
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900">FAQs</h2>
          <div className="mt-5 grid gap-4">
            {faqs.map((f, idx) => (
              <FAQItem key={idx} q={f.q} a={f.a} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-slate-900 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Ready to get started?</h3>
              <p className="text-slate-200 mt-2">
                Check service areas, request a quote, or book instantly.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/service-areas"
                className="px-5 py-2.5 rounded-xl bg-white text-slate-900 font-semibold"
              >
                Service Areas
              </Link>
              <Link
                to="/book"
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
