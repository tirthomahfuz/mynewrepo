import Link from "next/link";
import { ArrowRight, Search, Sparkles, BookOpen, Shield, Users, CheckCircle } from "lucide-react";
import IslamicPattern from "@/components/IslamicPattern";
import ResourceCard from "@/components/ResourceCard";
import { resources } from "@/lib/resources";

export default function HomePage() {
  const featuredResources = resources.filter((r) =>
    ["legal-aid-bc", "mosaic", "issbc"].includes(r.id)
  );

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative bg-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#ffffff" opacity={0.07} size={70} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-teal-900/80 via-teal-800/60 to-teal-700/40" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              Free · Confidential · AI-assisted
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6 text-balance">
              Understand your rights.
              <br />
              <span className="text-teal-300">Find the right help.</span>
            </h1>

            <p className="text-lg text-teal-100 leading-relaxed mb-8 max-w-xl">
              A free tool for refugees and immigrants in British Columbia. Tell us your situation and get plain-language guidance about your legal rights and the organizations that can help you.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors text-base shadow-lg"
              >
                Get help now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-base"
              >
                <Search className="w-4 h-4" />
                Browse resources
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 40H1440V20C1200 0 960 40 720 20C480 0 240 40 0 20V40Z" fill="#fafaf9" />
          </svg>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-stone-50 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              "All immigration statuses welcome",
              "No registration required",
              "20+ BC organizations",
              "Plain language explanations",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-stone-600">
                <CheckCircle className="w-4 h-4 text-teal-600 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 mb-3">
              How it works
            </h2>
            <p className="text-stone-600 max-w-xl mx-auto">
              Get personalized guidance in minutes — no appointment needed, no cost.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: BookOpen,
                step: "1",
                title: "Tell us your situation",
                description:
                  "Describe what's happening in your own words — your immigration status, what you need help with, where you are in BC.",
                color: "bg-teal-50 text-teal-700",
              },
              {
                icon: Sparkles,
                step: "2",
                title: "Get AI-powered guidance",
                description:
                  "Our AI reviews your situation and provides plain-language explanations of your rights and options in BC.",
                color: "bg-amber-50 text-amber-700",
              },
              {
                icon: Users,
                step: "3",
                title: "Connect with the right support",
                description:
                  "Get a list of specific organizations that can help you, ranked by relevance with clear explanations of why each one matters.",
                color: "bg-stone-100 text-stone-700",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white rounded-2xl p-6 border border-stone-200 relative"
              >
                <div className="absolute -top-3 -left-3 w-7 h-7 bg-teal-700 text-white text-xs font-bold rounded-full flex items-center justify-center shadow">
                  {item.step}
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/intake"
              className="inline-flex items-center gap-2 bg-teal-700 text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-teal-600 transition-colors shadow-md"
            >
              Start now — it's free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Islamic pattern divider */}
      <div className="relative h-16 bg-stone-50 overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#0f766e" opacity={0.08} size={50} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50 via-transparent to-stone-50" />
      </div>

      {/* Key protections */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-stone-900 mb-4">
                You have rights in Canada — regardless of your status
              </h2>
              <p className="text-stone-600 leading-relaxed mb-6">
                Many newcomers don't know that Canadian law protects them even before they become permanent residents or citizens. Understanding these rights can make a critical difference in your situation.
              </p>
              <ul className="space-y-3">
                {[
                  "Refugee claimants have the right to a fair hearing",
                  "Everyone has the right to legal representation",
                  "Workers have labour rights regardless of permit status",
                  "Victims of crime can access supports without fear of deportation",
                  "Children have the right to education in BC",
                ].map((right) => (
                  <li key={right} className="flex items-start gap-2.5 text-sm text-stone-700">
                    <Shield className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    {right}
                  </li>
                ))}
              </ul>
              <Link
                href="/intake"
                className="inline-flex items-center gap-2 mt-6 text-teal-700 font-medium text-sm hover:text-teal-600"
              >
                Learn about your specific situation
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Featured resources */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-4">
                Featured organizations
              </h3>
              {featuredResources.map((r) => (
                <ResourceCard key={r.id} resource={r} compact />
              ))}
              <Link
                href="/directory"
                className="block text-center text-sm text-teal-700 font-medium hover:text-teal-600 mt-2 py-2"
              >
                Browse all {resources.length} organizations →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative bg-amber-600 text-white overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#ffffff" opacity={0.08} size={55} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Not sure where to start?
          </h2>
          <p className="text-amber-100 mb-7 max-w-xl mx-auto text-base">
            Tell us a little about your situation and we'll point you in the right direction — in plain language, for free.
          </p>
          <Link
            href="/intake"
            className="inline-flex items-center gap-2 bg-white text-amber-700 font-semibold px-8 py-3.5 rounded-xl hover:bg-amber-50 transition-colors shadow-lg"
          >
            Describe your situation
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
