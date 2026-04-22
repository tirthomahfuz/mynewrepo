import Link from "next/link";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import type { Resource } from "@/lib/types";
import { resourceTypeLabels } from "@/lib/resources";

interface ResourceCardProps {
  resource: Resource;
  relevanceReason?: string;
  compact?: boolean;
}

export default function ResourceCard({ resource, relevanceReason, compact = false }: ResourceCardProps) {
  return (
    <Link
      href={`/directory/${resource.id}`}
      className="block bg-white/70 border border-black/6 rounded-2xl hover:shadow-card-hover hover:border-black/10 transition-all group"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <span className="inline-block text-xs font-medium bg-gold-100 text-gold-600 px-2.5 py-0.5 rounded-full mb-2">
              {resourceTypeLabels[resource.type]}
            </span>
            <h3 className="font-semibold text-ink-900 group-hover:text-ink-700 transition-colors leading-snug text-sm">
              {resource.name}
            </h3>
          </div>
          {resource.urgencySupport && (
            <span className="shrink-0 text-xs bg-red-50 text-red-600 border border-red-100 px-2 py-0.5 rounded-full font-medium">
              Urgent
            </span>
          )}
        </div>

        {relevanceReason && (
          <p className="text-xs text-ink-600 bg-cream-200 rounded-xl px-3 py-2 mb-3 leading-relaxed">
            {relevanceReason}
          </p>
        )}

        {!compact && (
          <p className="text-xs text-ink-500 leading-relaxed mb-3 line-clamp-2">
            {resource.description}
          </p>
        )}

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{resource.city}, BC</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-ink-400">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>{resource.phone}</span>
          </div>
          {!compact && (
            <>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{resource.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-ink-400">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{resource.website.replace(/^https?:\/\//, "")}</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-3 pt-3 border-t border-black/5 flex flex-wrap gap-1">
          {resource.languages.slice(0, 4).map((lang) => (
            <span key={lang} className="text-xs bg-ink-50 text-ink-500 px-2 py-0.5 rounded-full">
              {lang}
            </span>
          ))}
          {resource.languages.length > 4 && (
            <span className="text-xs text-ink-400 px-1 py-0.5">
              +{resource.languages.length - 4}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
