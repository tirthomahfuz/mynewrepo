"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ChevronRight, Printer, RefreshCw } from "lucide-react";
import type { IntakeData, GuidanceResponse } from "@/lib/types";
import { getResourceById } from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";

function LoadingState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <div className="w-12 h-12 rounded-full border-4 border-black/10 border-t-ink-900 animate-spin mx-auto mb-6" />
        <h2 className="text-lg font-semibold text-ink-900 mb-2">Analyzing your situation</h2>
        <p className="text-sm text-ink-500 leading-relaxed">
          Reviewing your situation, matching relevant organizations, and identifying your rights in BC. This takes about 15 seconds.
        </p>
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();
  const [guidance, setGuidance] = useState<GuidanceResponse | null>(null);
  const [intake, setIntake] = useState<IntakeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("intakeData");
    if (!stored) {
      router.push("/intake");
      return;
    }
    const intakeData: IntakeData = JSON.parse(stored);
    setIntake(intakeData);
    fetchGuidance(intakeData);
  }, [router]);

  async function fetchGuidance(intakeData: IntakeData) {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/guidance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(intakeData),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Failed to get guidance");
      }
      setGuidance(await response.json());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <h2 className="text-lg font-semibold text-ink-900 mb-2">Something went wrong</h2>
          <p className="text-sm text-ink-500 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => intake && fetchGuidance(intake)}
              className="flex items-center justify-center gap-2 bg-ink-900 text-white font-medium px-5 py-2.5 rounded-full text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link href="/intake" className="text-sm text-ink-500 hover:text-ink-900 underline">
              Start over
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!guidance) return null;

  const recommendedResources = guidance.recommendedResources
    .map((rec) => ({
      resource: getResourceById(rec.resourceId),
      reason: rec.relevanceReason,
    }))
    .filter((item) => item.resource !== undefined);

  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">Your guidance</p>
          <h1 className="text-3xl font-bold text-ink-900 tracking-tight">
            Here is what we found
          </h1>
        </div>

        {/* Situation summary */}
        <div className="bg-white/80 border border-black/6 rounded-3xl p-6 mb-4">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-3">Summary</p>
          <p className="text-ink-700 leading-relaxed">{guidance.situationSummary}</p>
        </div>

        {/* Rights */}
        <div className="bg-ink-900 text-white rounded-3xl p-6 mb-4">
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Your rights in BC</p>
          <p className="text-white/80 leading-relaxed text-sm">{guidance.rightsExplained}</p>
        </div>

        {/* Next steps */}
        <div className="bg-white/80 border border-black/6 rounded-3xl p-6 mb-4">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">Next steps</p>
          <ol className="space-y-3">
            {guidance.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-6 h-6 bg-gold-300 text-ink-900 text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-ink-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Recommended resources */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-4">
            Organizations that can help
          </p>
          <div className="space-y-3">
            {recommendedResources.map(({ resource, reason }) => (
              <ResourceCard
                key={resource!.id}
                resource={resource!}
                relevanceReason={reason}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-cream-200 border border-gold-200 rounded-2xl p-5 mb-8">
          <p className="text-sm text-ink-600 leading-relaxed">{guidance.disclaimer}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 border border-black/10 bg-white/70 text-ink-700 font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <Link
            href="/directory"
            className="flex items-center gap-2 border border-black/10 bg-white/70 text-ink-700 font-medium px-5 py-2.5 rounded-full text-sm hover:bg-white transition-colors"
          >
            All resources
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/intake"
            className="flex items-center gap-2 bg-ink-900 text-white font-medium px-5 py-2.5 rounded-full text-sm hover:bg-ink-800 transition-colors ml-auto"
          >
            New search
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
