"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { resources, resourceTypeLabels } from "@/lib/resources";
import type { ResourceType } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";

const STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "refugee_claimant", label: "Refugee Claimants" },
  { value: "protected_person", label: "Protected Persons" },
  { value: "permanent_resident", label: "Permanent Residents" },
  { value: "work_permit", label: "Work / Study Permit" },
  { value: "undocumented", label: "No Status" },
];

export default function DirectoryPage() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filtered = useMemo(() => {
    return resources.filter((r) => {
      if (selectedType !== "all" && r.type !== selectedType) return false;
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
  }, [search, selectedType, selectedStatus]);

  const resourceTypes = Object.entries(resourceTypeLabels) as [ResourceType, string][];

  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">BC Resources</p>
          <h1 className="text-3xl font-bold text-ink-900 tracking-tight mb-2">
            Resource Directory
          </h1>
          <p className="text-ink-500 text-sm">
            {resources.length} organizations across British Columbia supporting newcomers.
          </p>
        </div>

        {/* Search + filters */}
        <div className="bg-white/80 border border-black/6 rounded-2xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-300" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, service, or city..."
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-xl text-sm text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-900 bg-white/60"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="border border-black/10 rounded-xl px-3 py-2 text-sm text-ink-700 focus:outline-none focus:ring-2 focus:ring-ink-900 bg-white/60"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>

        {/* Type pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedType("all")}
            className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
              selectedType === "all"
                ? "bg-ink-900 text-white"
                : "bg-white/70 border border-black/8 text-ink-600 hover:bg-white"
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
                onClick={() => setSelectedType(selectedType === value ? "all" : value)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-colors ${
                  selectedType === value
                    ? "bg-ink-900 text-white"
                    : "bg-white/70 border border-black/8 text-ink-600 hover:bg-white"
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </div>

        {/* Count */}
        <p className="text-xs text-ink-400 mb-4">
          {filtered.length === resources.length
            ? `${filtered.length} organizations`
            : `${filtered.length} of ${resources.length} organizations`}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-ink-600 font-medium mb-1">No results found</p>
            <p className="text-sm text-ink-400 mb-4">Try a different search or filter</p>
            <button
              onClick={() => { setSearch(""); setSelectedType("all"); setSelectedStatus("all"); }}
              className="text-sm text-ink-700 font-medium hover:text-ink-900 underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
