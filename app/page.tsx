import Link from "next/link";
import { ArrowRight, MapPin, Phone } from "lucide-react";
import { resources, resourceTypeLabels } from "@/lib/resources";

const stats = [
  { value: resources.length.toString(), label: "Organizations" },
  { value: "11", label: "Cities covered" },
  { value: "Free", label: "Always" },
  { value: "All", label: "Statuses welcome" },
];

const quickLinks = [
  { label: "Refugee Claimants", desc: "Hearings, legal aid, settlement support" },
  { label: "Permanent Residents", desc: "Rights, employment, family sponsorship" },
  { label: "Work Permit Holders", desc: "Labour rights, permit renewals, status changes" },
  { label: "No Status / Undocumented", desc: "Safe access to services and protections" },
  { label: "Domestic Violence", desc: "Safety planning, legal protection, housing" },
  { label: "Employment Issues", desc: "Unpaid wages, discrimination, wrongful dismissal" },
];

const featuredResources = resources.filter((r) =>
  ["legal-aid-bc", "mosaic", "issbc", "access-pro-bono"].includes(r.id)
);

export default function HomePage() {
  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">

      {/* Hero */}
      <div className="mb-12">
        <p className="text-sm font-medium text-ink-500 mb-3">British Columbia, Canada</p>
        <h1 className="text-5xl sm:text-6xl font-bold text-ink-900 leading-tight mb-5 tracking-tight">
          Legal help for<br />newcomers in BC
        </h1>
        <p className="text-lg text-ink-500 max-w-xl leading-relaxed mb-8">
          Describe your situation and get plain-language guidance on your rights, along with the organizations best placed to help you.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/intake"
            className="inline-flex items-center justify-center gap-2 bg-ink-900 text-white font-semibold px-6 py-3 rounded-full hover:bg-ink-800 transition-colors text-sm"
          >
            Get guidance now
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/directory"
            className="inline-flex items-center justify-center gap-2 bg-white border border-black/10 text-ink-700 font-medium px-6 py-3 rounded-full hover:bg-cream-100 transition-colors text-sm"
          >
            Browse directory
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/70 border border-black/6 rounded-2xl px-5 py-4">
            <p className="text-3xl font-bold text-ink-900 tracking-tight">{s.value}</p>
            <p className="text-sm text-ink-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-12">

        {/* Get help card */}
        <div className="lg:col-span-1 bg-ink-900 text-white rounded-3xl p-6 flex flex-col justify-between min-h-56">
          <div>
            <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">Start here</p>
            <h2 className="text-2xl font-bold leading-snug mb-3">
              Tell us what is happening
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Answer a few questions and get matched with the right organizations and a summary of your rights.
            </p>
          </div>
          <Link
            href="/intake"
            className="mt-6 inline-flex items-center gap-2 bg-gold-300 text-ink-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-gold-400 transition-colors w-fit"
          >
            Start now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Common situations */}
        <div className="lg:col-span-2 bg-white/70 border border-black/6 rounded-3xl p-6">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">Common situations</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map((q) => (
              <Link
                key={q.label}
                href="/intake"
                className="group flex flex-col p-3 rounded-xl hover:bg-cream-200 transition-colors"
              >
                <p className="text-sm font-semibold text-ink-900 group-hover:text-ink-700 mb-0.5">{q.label}</p>
                <p className="text-xs text-ink-400 leading-relaxed">{q.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Directory preview */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-ink-900">Featured organizations</h2>
          <Link href="/directory" className="text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors">
            View all {resources.length}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredResources.map((r) => (
            <Link
              key={r.id}
              href={`/directory/${r.id}`}
              className="bg-white/70 border border-black/6 rounded-2xl p-4 hover:shadow-card-hover hover:border-black/10 transition-all group"
            >
              <span className="text-xs font-medium bg-gold-100 text-gold-600 px-2 py-0.5 rounded-full">
                {resourceTypeLabels[r.type]}
              </span>
              <h3 className="font-semibold text-ink-900 text-sm mt-3 mb-1 group-hover:text-ink-700 leading-snug">
                {r.name}
              </h3>
              <p className="text-xs text-ink-400 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {r.city}
              </p>
              <p className="text-xs text-ink-400 flex items-center gap-1 mt-0.5">
                <Phone className="w-3 h-3" />
                {r.phone}
              </p>
            </Link>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="bg-white/70 border border-black/6 rounded-3xl p-8">
        <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-6">How it works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "01",
              title: "Describe your situation",
              desc: "Write in your own words what you are going through. No legal terms needed.",
            },
            {
              step: "02",
              title: "Review your rights",
              desc: "Get a plain-language explanation of the legal protections that apply to your situation in BC.",
            },
            {
              step: "03",
              title: "Connect with support",
              desc: "See the specific organizations that can help you, with a reason why each one fits your case.",
            },
          ].map((item) => (
            <div key={item.step}>
              <p className="text-3xl font-bold text-gold-400 mb-3">{item.step}</p>
              <h3 className="font-semibold text-ink-900 mb-2">{item.title}</h3>
              <p className="text-sm text-ink-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
