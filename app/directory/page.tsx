"use client";

import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { resources, resourceTypeLabels, resourceTypeColors } from "@/lib/resources";
import type { ResourceType } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import IslamicPattern from "@/components/IslamicPattern";

const CITIES = [
  "All cities",
  "Vancouver",
  "Surrey",
  "Burnaby",
  "Richmond",
  "North Vancouver",
  "Abbotsford",
  "Victoria",
  "Kelowna",
  "Penticton",
  "Prince George",
  "Federal (Canada-wide)",
];

const LANGUAGE_OPTIONS = [
  "All languages",
  "Arabic",
  "Cantonese",
  "Farsi",
  "French",
  "Hindi",
  "Mandarin",
  "Punjabi",
  "Somali",
  "Spanish",
  "Tagalog",
  "Urdu",
];

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "refugee_claimant", label: "Refugee Claimants" },
  { value: "protected_person", label: "Protected Persons" },
  { value: "permanent_resident", label: "Permanent Residents" },
  { value: "work_permit", label: "Work / Study Permit" },
  { value: "undocumented", label: "No Status / Undocumented" },
];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedCity, setSelectedCity] = useState("All cities");
  const [selectedLanguage, setSelectedLanguage] = useState("All languages");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (selectedType !== "all" && r.type !== selectedType) return false;
      if (
        selectedCity !== "All cities" &&
        !r.city.toLowerCase().includes(selectedCity.toLowerCase())
      )
        return false;
      if (
        selectedLanguage !== "All languages" &&
        !r.languages.some((l) =>
          l.toLowerCase().includes(selectedLanguage.toLowerCase())
        )
      )
        return false;
      if (
        selectedStatus !== "all" &&
        !r.statusEligibility.includes("all") &&
        !r.statusEligibility.includes(selectedStatus)
      )
        return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          r.name.toLowerCase().includes(q) ||
          r.description.toLowerCase().includes(q) ||
          r.city.toLowerCase().includes(q) ||
          r.services.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [search, selectedType, selectedCity, selectedLanguage, selectedStatus]);

  const activeFilterCount = [
    selectedType !== "all",
    selectedCity !== "All cities",
    selectedLanguage !== "All languages",
    selectedStatus !== "all",
  ].filter(Boolean).length;

  function clearFilters() {
    setSelectedType("all");
    setSelectedCity("All cities");
    setSelectedLanguage("All languages");
    setSelectedStatus("all");
    setSearch("");
  }

  const resourceTypes = Object.entries(resourceTypeLabels) as [ResourceType, string][];

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="relative bg-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#ffffff" opacity={0.06} size={60} />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold mb-2">Resource Directory</h1>
          <p className="text-teal-200 max-w-xl">
            {resources.length} organizations across British Columbia supporting
            newcomers with legal, settlement, employment, and community services.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Search bar */}
        <div className="flex gap-3 mb-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, service, or location..."
              className="w-full pl-10 pr-4 py-2.5 border border-stone-300 rounded-xl text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              showFilters || activeFilterCount > 0
                ? "border-teal-500 bg-teal-50 text-teal-700"
                : "border-stone-300 bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-teal-600 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 mb-5 animate-slide-up">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Service Type
                </label>
                <select
                  value={selectedType}
                  onChange={(e) =>
                    setSelectedType(e.target.value as ResourceType | "all")
                  }
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  <option value="all">All types</option>
                  {resourceTypes.map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  City
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  {CITIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Language
                </label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  {LANGUAGE_OPTIONS.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                  Immigration Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={clearFilters}
                className="mt-4 flex items-center gap-1.5 text-xs text-stone-500 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Type pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType("all")}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedType === "all"
                ? "bg-teal-700 text-white"
                : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
            }`}
          >
            All ({resources.length})
          </button>
          {resourceTypes.map(([value, label]) => {
            const count = resources.filter((r) => r.type === value).length;
            if (count === 0) return null;
            return (
              <button
                key={value}
                onClick={() =>
                  setSelectedType(selectedType === value ? "all" : value)
                }
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedType === value
                    ? "bg-teal-700 text-white"
                    : "bg-white border border-stone-200 text-stone-600 hover:border-stone-300"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-stone-500">
            {filtered.length === resources.length
              ? `Showing all ${filtered.length} organizations`
              : `${filtered.length} of ${resources.length} organizations`}
          </p>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-stone-400 mb-3 text-4xl">🔍</div>
            <p className="text-stone-600 font-medium mb-1">No results found</p>
            <p className="text-sm text-stone-400 mb-4">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={clearFilters}
              className="text-sm text-teal-700 font-medium hover:text-teal-600"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
