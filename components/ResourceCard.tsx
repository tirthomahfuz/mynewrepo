import Link from "next/link";
import { MapPin, Phone, Globe, Clock } from "lucide-react";
import type { Resource } from "@/lib/types";
import { resourceTypeLabels, resourceTypeColors } from "@/lib/resources";

interface ResourceCardProps {
  resource: Resource;
  relevanceReason?: string;
  compact?: boolean;
}

export default function ResourceCard({
  resource,
  relevanceReason,
  compact = false,
}: ResourceCardProps) {
  return (
    <Link
      href={`/directory/${resource.id}`}
      className="block bg-white rounded-2xl border border-stone-200 hover:border-teal-300 hover:shadow-md transition-all duration-200 group"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <span
              className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2 ${resourceTypeColors[resource.type]}`}
            >
              {resourceTypeLabels[resource.type]}
            </span>
            <h3 className="font-semibold text-stone-900 group-hover:text-teal-700 transition-colors leading-snug">
              {resource.name}
            </h3>
          </div>
          {resource.urgencySupport && (
            <span className="shrink-0 text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded-full font-medium">
              Urgent help
            </span>
          )}
        </div>

        {/* Relevance reason (shown on results page) */}
        {relevanceReason && (
          <p className="text-sm text-teal-700 bg-teal-50 rounded-lg px-3 py-2 mb-3 leading-relaxed">
            {relevanceReason}
          </p>
        )}

        {/* Description */}
        {!compact && (
          <p className="text-sm text-stone-600 leading-relaxed mb-4 line-clamp-2">
            {resource.description}
          </p>
        )}

        {/* Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            <span>{resource.city}, BC</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>{resource.phone}</span>
          </div>
          {!compact && (
            <>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{resource.hours}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Globe className="w-3.5 h-3.5 shrink-0" />
                <span className="text-teal-600 truncate">{resource.website}</span>
              </div>
            </>
          )}
        </div>

        {/* Languages */}
        <div className="mt-3 pt-3 border-t border-stone-100 flex flex-wrap gap-1">
          {resource.languages.slice(0, 4).map((lang) => (
            <span
              key={lang}
              className="text-xs bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
            >
              {lang}
            </span>
          ))}
          {resource.languages.length > 4 && (
            <span className="text-xs text-stone-400 px-1 py-0.5">
              +{resource.languages.length - 4} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
