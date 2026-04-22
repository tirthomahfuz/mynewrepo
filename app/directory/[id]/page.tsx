import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Globe, Clock, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { resources, resourceTypeLabels } from "@/lib/resources";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  return resources.map((r) => ({ id: r.id }));
}

export async function generateMetadata({ params }: Props) {
  const resource = resources.find((r) => r.id === params.id);
  if (!resource) return {};
  return {
    title: `${resource.name} — Legal Navigator BC`,
    description: resource.description,
  };
}

export default function ResourceDetailPage({ params }: Props) {
  const resource = resources.find((r) => r.id === params.id);
  if (!resource) notFound();

  const similar = resources
    .filter((r) => r.id !== resource.id && r.type === resource.type)
    .slice(0, 3);

  return (
    <div className="py-10">
      <div className="max-w-4xl mx-auto px-5 sm:px-8">

        {/* Back */}
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-ink-900 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to directory
        </Link>

        {/* Header */}
        <div className="bg-ink-900 text-white rounded-3xl p-8 mb-5">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            {resourceTypeLabels[resource.type]}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2 mb-2 tracking-tight">{resource.name}</h1>
          <p className="text-white/50 text-sm flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {resource.address}, {resource.city}, {resource.province}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Main */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">About</p>
              <p className="text-ink-700 leading-relaxed text-sm">{resource.description}</p>
            </div>

            <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">Services</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resource.services.map((service) => (
                  <div key={service} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-gold-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-ink-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Who can access this</p>
              <div className="flex flex-wrap gap-2">
                {resource.statusEligibility.includes("all") ? (
                  <span className="bg-gold-100 text-gold-600 border border-gold-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    Open to all immigration statuses
                  </span>
                ) : (
                  resource.statusEligibility.map((status) => (
                    <span key={status} className="bg-cream-200 text-ink-600 px-3 py-1.5 rounded-full text-sm">
                      {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  ))
                )}
              </div>
            </div>

            <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Languages</p>
              <div className="flex flex-wrap gap-2">
                {resource.languages.map((lang) => (
                  <span key={lang} className="bg-cream-200 text-ink-600 px-3 py-1 rounded-full text-sm">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <div className="bg-white/80 border border-black/6 rounded-2xl p-5">
              <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">Contact</p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-ink-300 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-ink-700">{resource.address}</p>
                    <p className="text-sm text-ink-700">{resource.city}, {resource.province}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-ink-300 shrink-0" />
                  <a href={`tel:${resource.phone}`} className="text-sm text-ink-900 font-medium hover:text-ink-600">
                    {resource.phone}
                  </a>
                </div>
                {resource.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-ink-300 shrink-0" />
                    <a href={`mailto:${resource.email}`} className="text-sm text-ink-700 hover:text-ink-900 truncate">
                      {resource.email}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-ink-300 mt-0.5 shrink-0" />
                  <p className="text-sm text-ink-700">{resource.hours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-ink-300 shrink-0" />
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-ink-700 hover:text-ink-900 truncate"
                  >
                    {resource.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>

              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 bg-ink-900 text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-ink-800 transition-colors w-full"
              >
                Visit website
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {resource.urgencySupport && (
              <div className="bg-red-50 border border-red-100 rounded-2xl p-4">
                <p className="text-sm font-semibold text-red-800 mb-1">Urgent support available</p>
                <p className="text-xs text-red-600 leading-relaxed">
                  This organization can help with time-sensitive situations.
                </p>
              </div>
            )}

            <div className="bg-cream-200 border border-gold-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-ink-900 mb-1.5">Not sure if this fits?</p>
              <p className="text-xs text-ink-500 mb-3 leading-relaxed">
                Describe your situation and we will match you with the right organizations.
              </p>
              <Link
                href="/intake"
                className="flex items-center justify-center gap-1.5 bg-ink-900 text-white text-xs font-medium px-3 py-2 rounded-full hover:bg-ink-800 transition-colors"
              >
                Get guidance
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">Similar organizations</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similar.map((r) => (
                <Link
                  key={r.id}
                  href={`/directory/${r.id}`}
                  className="bg-white/70 border border-black/6 rounded-2xl p-4 hover:shadow-card-hover transition-all"
                >
                  <p className="font-medium text-sm text-ink-900 mb-1">{r.name}</p>
                  <p className="text-xs text-ink-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {r.city}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
