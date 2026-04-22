import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-black/8 bg-white/40 backdrop-blur-sm mt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold text-ink-900 text-sm mb-2">Legal Navigator BC</p>
            <p className="text-sm text-ink-500 leading-relaxed">
              Free legal guidance for refugees and immigrants in British Columbia.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Links</p>
            <ul className="space-y-2">
              {[
                { href: "/intake", label: "Get Help" },
                { href: "/directory", label: "Browse Resources" },
                { href: "/about", label: "About" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-ink-500 hover:text-ink-900 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Notice</p>
            <p className="text-sm text-ink-500 leading-relaxed">
              This tool provides general information only, not legal advice. Consult a qualified lawyer for your specific situation.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-black/5">
          <p className="text-xs text-ink-400">
            {new Date().getFullYear()} Newcomer Legal Navigator BC. Built for the community.
          </p>
        </div>
      </div>
    </footer>
  );
}
