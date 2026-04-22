import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, Phone, Globe, Clock, Mail, CheckCircle, ArrowRight } from "lucide-react";
import { resources, resourceTypeLabels, resourceTypeColors } from "@/lib/resources";
import IslamicPattern from "@/components/IslamicPattern";

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
    title: `${resource.name} — Newcomer Legal Navigator BC`,
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
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative bg-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#ffffff" opacity={0.06} size={60} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <Link
            href="/directory"
            className="inline-flex items-center gap-2 text-teal-200 hover:text-white text-sm mb-5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to directory
          </Link>
          <span
            className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full mb-3 ${resourceTypeColors[resource.type]}`}
          >
            {resourceTypeLabels[resource.type]}
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{resource.name}</h1>
          <p className="text-teal-200 flex items-center gap-1.5 text-sm">
            <MapPin className="w-4 h-4" />
            {resource.address}, {resource.city}, {resource.province}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-5">
            {/* Description */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-3">About this organization</h2>
              <p className="text-stone-700 leading-relaxed">{resource.description}</p>
            </div>

            {/* Services */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-4">Services provided</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {resource.services.map((service) => (
                  <div key={service} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-stone-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-4">Who can access this service</h2>
              <div className="flex flex-wrap gap-2">
                {resource.statusEligibility.includes("all") ? (
                  <span className="bg-teal-50 text-teal-800 border border-teal-200 px-3 py-1.5 rounded-full text-sm font-medium">
                    Open to everyone — all immigration statuses welcome
                  </span>
                ) : (
                  resource.statusEligibility.map((status) => (
                    <span
                      key={status}
                      className="bg-stone-100 text-stone-700 px-3 py-1.5 rounded-full text-sm"
                    >
                      {status.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-3">Languages available</h2>
              <div className="flex flex-wrap gap-2">
                {resource.languages.map((lang) => (
                  <span
                    key={lang}
                    className="bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-sm"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Contact sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm">
              <h2 className="font-semibold text-stone-900 mb-4">Contact information</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm text-stone-700">{resource.address}</p>
                    <p className="text-sm text-stone-700">
                      {resource.city}, {resource.province}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                  <a
                    href={`tel:${resource.phone}`}
                    className="text-sm text-teal-700 hover:text-teal-600 font-medium"
                  >
                    {resource.phone}
                  </a>
                </div>
                {resource.email && (
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                    <a
                      href={`mailto:${resource.email}`}
                      className="text-sm text-teal-700 hover:text-teal-600 truncate"
                    >
                      {resource.email}
                    </a>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-stone-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-stone-700">{resource.hours}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-stone-400 shrink-0" />
                  <a
                    href={resource.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-teal-700 hover:text-teal-600 truncate"
                  >
                    {resource.website.replace(/^https?:\/\//, "")}
                  </a>
                </div>
              </div>

              <a
                href={resource.website}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2 bg-teal-700 text-white text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-teal-600 transition-colors w-full"
              >
                Visit website
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {resource.urgencySupport && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-sm font-semibold text-red-800 mb-1">
                  Urgent help available
                </p>
                <p className="text-xs text-red-700 leading-relaxed">
                  This organization can help with urgent or time-sensitive situations.
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
              <p className="text-sm font-semibold text-teal-900 mb-1.5">
                Not sure if this is right for you?
              </p>
              <p className="text-xs text-teal-700 mb-3 leading-relaxed">
                Tell us about your situation and we'll match you with the most relevant organizations.
              </p>
              <Link
                href="/intake"
                className="flex items-center justify-center gap-1.5 bg-teal-700 text-white text-xs font-medium px-3 py-2 rounded-lg hover:bg-teal-600 transition-colors"
              >
                Get personalized guidance
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Similar resources */}
        {similar.length > 0 && (
          <div className="mt-10">
            <h2 className="font-semibold text-stone-900 mb-4">
              Similar organizations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {similar.map((r) => (
                <Link
                  key={r.id}
                  href={`/directory/${r.id}`}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-teal-300 hover:shadow-sm transition-all p-4"
                >
                  <p className="font-medium text-sm text-stone-900 mb-1">
                    {r.name}
                  </p>
                  <p className="text-xs text-stone-500 flex items-center gap-1">
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
