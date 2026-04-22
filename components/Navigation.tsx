"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Scale } from "lucide-react";

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/directory", label: "Browse Resources" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-teal-700 rounded-lg flex items-center justify-center group-hover:bg-teal-600 transition-colors">
              <Scale className="w-4 h-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <span className="font-semibold text-stone-900 text-sm leading-tight block">
                Legal Navigator BC
              </span>
              <span className="text-xs text-stone-500 leading-tight block">
                For Newcomers
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? "text-teal-700"
                    : "text-stone-600 hover:text-stone-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/intake"
              className="bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-teal-600 transition-colors"
            >
              Get Help Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-stone-100 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-sm text-stone-700 hover:bg-stone-50 rounded-md"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 px-3">
              <Link
                href="/intake"
                className="block bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg text-center hover:bg-teal-600 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Get Help Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
