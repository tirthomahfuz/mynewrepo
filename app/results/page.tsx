"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  AlertCircle,
  CheckCircle,
  ChevronRight,
  Printer,
  RefreshCw,
  BookOpen,
  Shield,
} from "lucide-react";
import type { IntakeData, GuidanceResponse } from "@/lib/types";
import { getResourceById } from "@/lib/resources";
import ResourceCard from "@/components/ResourceCard";
import IslamicPattern from "@/components/IslamicPattern";

function LoadingState() {
  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="text-center max-w-sm px-4">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-teal-100 border-t-teal-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield className="w-6 h-6 text-teal-600" />
          </div>
        </div>
        <h2 className="text-lg font-semibold text-stone-900 mb-2">
          Analyzing your situation…
        </h2>
        <p className="text-sm text-stone-500 leading-relaxed">
          Our AI is reviewing your situation and identifying the most relevant rights, protections, and organizations for you. This takes about 10–15 seconds.
        </p>
        <div className="mt-6 space-y-2">
          {[
            "Understanding your situation",
            "Reviewing BC legal protections",
            "Matching relevant organizations",
          ].map((step, i) => (
            <div
              key={step}
              className="flex items-center gap-2 text-sm text-stone-400 animate-pulse"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-teal-400" />
              {step}
            </div>
          ))}
        </div>
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

      const data: GuidanceResponse = await response.json();
      setGuidance(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function retry() {
    if (intake) {
      fetchGuidance(intake);
    }
  }

  if (loading) return <LoadingState />;

  if (error) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="text-center max-w-sm px-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <h2 className="text-lg font-semibold text-stone-900 mb-2">
            Something went wrong
          </h2>
          <p className="text-sm text-stone-500 mb-6">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={retry}
              className="flex items-center justify-center gap-2 bg-teal-700 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-teal-600 transition-colors text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try again
            </button>
            <Link
              href="/intake"
              className="text-sm text-stone-600 hover:text-stone-900 underline"
            >
              Start over
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!guidance) return null;

  const recommendedResourceObjects = guidance.recommendedResources
    .map((rec) => ({
      resource: getResourceById(rec.resourceId),
      reason: rec.relevanceReason,
    }))
    .filter((item) => item.resource !== undefined);

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 border border-teal-200 rounded-full px-3 py-1 text-xs font-medium mb-4">
            <CheckCircle className="w-3.5 h-3.5" />
            Guidance ready
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
            Your personalized guidance
          </h1>
          <p className="text-stone-600 text-sm">
            Based on what you shared, here's what we think you need to know and do.
          </p>
        </div>

        {/* Situation Summary */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-teal-700" />
            </div>
            <h2 className="font-semibold text-stone-900">
              What we understand about your situation
            </h2>
          </div>
          <p className="text-stone-700 leading-relaxed">
            {guidance.situationSummary}
          </p>
        </div>

        {/* Rights Explained */}
        <div className="relative bg-teal-800 text-white rounded-2xl p-6 mb-5 overflow-hidden shadow-sm">
          <div className="absolute inset-0 opacity-40">
            <IslamicPattern color="#ffffff" opacity={0.1} size={55} />
          </div>
          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <h2 className="font-semibold text-white">
                Your rights and protections
              </h2>
            </div>
            <p className="text-teal-100 leading-relaxed text-sm">
              {guidance.rightsExplained}
            </p>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-2xl border border-stone-200 p-6 mb-5 shadow-sm">
          <h2 className="font-semibold text-stone-900 mb-4">
            Recommended next steps
          </h2>
          <ol className="space-y-3">
            {guidance.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-teal-700 text-white text-xs font-bold rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <p className="text-sm text-stone-700 leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </div>

        {/* Recommended Resources */}
        <div className="mb-5">
          <h2 className="font-semibold text-stone-900 mb-1">
            Organizations that can help you
          </h2>
          <p className="text-sm text-stone-500 mb-4">
            These organizations were selected based on your location, status, and situation.
          </p>
          <div className="space-y-3">
            {recommendedResourceObjects.map(({ resource, reason }) => (
              <ResourceCard
                key={resource!.id}
                resource={resource!}
                relevanceReason={reason}
              />
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-sm text-amber-800 leading-relaxed">
              {guidance.disclaimer}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pb-8">
          <button
            onClick={() => window.print()}
            className="flex items-center justify-center gap-2 border border-stone-300 text-stone-700 font-medium px-5 py-2.5 rounded-xl hover:bg-stone-100 transition-colors text-sm"
          >
            <Printer className="w-4 h-4" />
            Print this guidance
          </button>
          <Link
            href="/directory"
            className="flex items-center justify-center gap-2 border border-stone-300 text-stone-700 font-medium px-5 py-2.5 rounded-xl hover:bg-stone-100 transition-colors text-sm"
          >
            Browse all resources
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link
            href="/intake"
            className="flex items-center justify-center gap-2 bg-teal-700 text-white font-medium px-5 py-2.5 rounded-xl hover:bg-teal-600 transition-colors text-sm ml-auto"
          >
            New search
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
