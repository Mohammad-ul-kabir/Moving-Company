export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="font-semibold text-slate-900 text-lg">MovingCo</div>
            <p className="text-sm text-slate-600 mt-2">
              Fast quotes and reliable movers for local & long-distance moves.
            </p>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold text-slate-900">Company</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <a className="hover:text-slate-900" href="/services">
                  Services
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900" href="/how-it-works">
                  How it works
                </a>
              </li>
              <li>
                <a className="hover:text-slate-900" href="/account">
                  My account
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <div className="font-semibold text-slate-900">Get started</div>
            <p className="text-sm text-slate-600 mt-2">
              Check service availability and book in minutes.
            </p>
            <a
              href="/inquiry"
              className="inline-flex mt-4 px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-sm hover:bg-blue-700"
            >
              Get a Quote
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-between text-sm text-slate-500">
          <div>© {new Date().getFullYear()} MovingCo. All rights reserved.</div>
          <div className="flex gap-4">
            <a className="hover:text-slate-700" href="#">
              Privacy
            </a>
            <a className="hover:text-slate-700" href="#">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
