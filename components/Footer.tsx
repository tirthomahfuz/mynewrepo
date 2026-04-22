import Link from "next/link";
import { Scale, Heart } from "lucide-react";
import IslamicPattern from "./IslamicPattern";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <IslamicPattern color="#ffffff" opacity={0.06} size={50} />
      </div>
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-teal-600 rounded-lg flex items-center justify-center">
                <Scale className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-semibold text-white text-sm">
                Legal Navigator BC
              </span>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed">
              Free, AI-assisted guidance to help refugees and immigrants in British Columbia understand their rights and find the right support.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
              Resources
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/intake", label: "Get Help Now" },
                { href: "/directory", label: "Browse All Resources" },
                { href: "/about", label: "About This Tool" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-stone-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-xs font-semibold text-stone-400 uppercase tracking-wider mb-3">
              Important Notice
            </h3>
            <p className="text-sm text-stone-400 leading-relaxed">
              This tool provides general information only and is not legal advice. Always consult with a qualified lawyer or legal aid organization for your specific situation.
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-stone-500">
            © {new Date().getFullYear()} Newcomer Legal Navigator BC. Built for the community.
          </p>
          <p className="text-xs text-stone-500 flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-rose-500" /> for newcomers in BC
          </p>
        </div>
      </div>
    </footer>
  );
}
