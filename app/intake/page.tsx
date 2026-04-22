"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import type { IntakeData, BCRegion, ImmigrationStatus } from "@/lib/types";

const STEPS = ["Situation", "Location & Status", "Preferences", "Review"];

const BC_REGIONS: { value: BCRegion; label: string }[] = [
  { value: "vancouver", label: "Vancouver" },
  { value: "surrey", label: "Surrey / Delta" },
  { value: "burnaby", label: "Burnaby / New Westminster" },
  { value: "richmond", label: "Richmond" },
  { value: "north_shore", label: "North Shore (North/West Vancouver)" },
  { value: "tri_cities", label: "Tri-Cities (Coquitlam, Port Moody)" },
  { value: "fraser_valley", label: "Fraser Valley (Abbotsford, Langley)" },
  { value: "victoria", label: "Victoria / Vancouver Island" },
  { value: "kelowna", label: "Kelowna / Okanagan" },
  { value: "prince_george", label: "Prince George / Northern BC" },
  { value: "province_wide", label: "Other / Not sure" },
];

const STATUSES: { value: ImmigrationStatus; label: string; description: string }[] = [
  { value: "refugee_claimant", label: "Refugee Claimant", description: "I filed or want to file a refugee claim" },
  { value: "protected_person", label: "Protected Person", description: "My refugee claim was accepted" },
  { value: "permanent_resident", label: "Permanent Resident", description: "I have PR status in Canada" },
  { value: "work_permit", label: "Work or Study Permit", description: "I have a temporary permit" },
  { value: "visitor", label: "Visitor / Tourist", description: "I am here on a visitor visa or without documents" },
  { value: "undocumented", label: "No Status / Undocumented", description: "I don't have valid immigration documents" },
  { value: "other", label: "Not Sure", description: "I'm not certain of my current status" },
];

const LANGUAGES = [
  "English", "French", "Arabic", "Punjabi", "Mandarin", "Cantonese",
  "Farsi / Dari", "Spanish", "Tagalog", "Hindi", "Urdu", "Somali",
  "Amharic / Tigrinya", "Vietnamese", "Korean", "Other",
];

const URGENCY_OPTIONS = [
  { value: "immediate", label: "Urgent — I need help today or this week", color: "border-red-300 bg-red-50" },
  { value: "this_week", label: "Soon — I have something coming up in the next 2–4 weeks", color: "border-amber-300 bg-amber-50" },
  { value: "this_month", label: "Within the month — I'm planning ahead", color: "border-blue-300 bg-blue-50" },
  { value: "general_info", label: "Just exploring — I want to understand my options", color: "border-stone-200 bg-white" },
];

const EXAMPLE_SITUATIONS = [
  "I just arrived as a refugee claimant and don't know what to do next",
  "My work permit expired and I'm not sure what my options are",
  "I'm a permanent resident and my employer isn't paying me correctly",
  "I experienced domestic violence and need to know my rights",
  "I was recently accepted as a protected person and need help with next steps",
];

function ProgressBar({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-col items-center flex-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < step
                  ? "bg-teal-700 text-white"
                  : i === step
                  ? "bg-teal-700 text-white ring-4 ring-teal-100"
                  : "bg-stone-200 text-stone-500"
              }`}
            >
              {i < step ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs mt-1 hidden sm:block ${
                i === step ? "text-teal-700 font-medium" : "text-stone-400"
              }`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="h-1 bg-stone-200 rounded-full mt-3">
        <div
          className="h-1 bg-teal-600 rounded-full transition-all duration-500"
          style={{ width: `${((step) / (total - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default function IntakePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<Partial<IntakeData>>({
    urgency: "general_info",
    language: "English",
  });
  const [error, setError] = useState("");

  function update(field: keyof IntakeData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setError("");
  }

  function validateStep(): boolean {
    if (step === 0 && (!data.situation || data.situation.trim().length < 20)) {
      setError("Please describe your situation in a bit more detail (at least a few sentences).");
      return false;
    }
    if (step === 1 && (!data.location || !data.status)) {
      setError("Please select both your location and immigration status.");
      return false;
    }
    return true;
  }

  function next() {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setStep((s) => Math.max(s - 1, 0));
    setError("");
  }

  async function submit() {
    setLoading(true);
    try {
      const intake = data as IntakeData;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("intakeData", JSON.stringify(intake));
      }
      router.push("/results");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 py-10">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-stone-900 mb-2">
            Tell us about your situation
          </h1>
          <p className="text-stone-600 text-sm">
            Your answers help us find the most relevant guidance and resources for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8">
          <ProgressBar step={step} total={STEPS.length} />

          {/* Step 0: Situation */}
          {step === 0 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-stone-900 mb-1">
                What's happening?
              </h2>
              <p className="text-sm text-stone-500 mb-4">
                Describe your situation in your own words. Don't worry about using legal terms — just tell us what you're going through.
              </p>
              <textarea
                value={data.situation || ""}
                onChange={(e) => update("situation", e.target.value)}
                placeholder="Example: I arrived in Canada six months ago as a refugee claimant. My hearing is coming up and I don't have a lawyer yet. I'm not sure how to find one or what to expect..."
                rows={6}
                className="w-full border border-stone-300 rounded-xl px-4 py-3 text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
              />
              <div className="mt-3">
                <p className="text-xs text-stone-500 mb-2 font-medium">
                  Examples to get you started:
                </p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_SITUATIONS.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => update("situation", ex)}
                      className="text-xs bg-stone-100 hover:bg-teal-50 hover:text-teal-700 text-stone-600 px-3 py-1.5 rounded-full transition-colors text-left"
                    >
                      {ex.length > 50 ? ex.slice(0, 50) + "…" : ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Location & Status */}
          {step === 1 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Where are you, and what is your current status?
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  Where in BC are you located?
                </label>
                <select
                  value={data.location || ""}
                  onChange={(e) => update("location", e.target.value as BCRegion)}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  <option value="">Select your region...</option>
                  {BC_REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  What best describes your current immigration status?
                </label>
                <div className="space-y-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update("status", s.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                        data.status === s.value
                          ? "border-teal-500 bg-teal-50 text-teal-800"
                          : "border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      <div className="text-sm font-medium">{s.label}</div>
                      <div className="text-xs text-stone-500 mt-0.5">{s.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Language and urgency
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  What language do you prefer for support services?
                </label>
                <select
                  value={data.language || "English"}
                  onChange={(e) => update("language", e.target.value)}
                  className="w-full border border-stone-300 rounded-xl px-4 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">
                  How urgent is your situation?
                </label>
                <div className="space-y-2">
                  {URGENCY_OPTIONS.map((u) => (
                    <button
                      key={u.value}
                      onClick={() => update("urgency", u.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all text-sm ${
                        data.urgency === u.value
                          ? `${u.color} border-2 font-medium`
                          : "border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                      }`}
                    >
                      {u.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div className="animate-fade-in">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Review your information
              </h2>
              <div className="space-y-3 mb-6">
                <ReviewRow label="Situation">
                  <p className="text-sm text-stone-700 leading-relaxed">
                    {data.situation}
                  </p>
                </ReviewRow>
                <ReviewRow label="Location">
                  {BC_REGIONS.find((r) => r.value === data.location)?.label}
                </ReviewRow>
                <ReviewRow label="Immigration Status">
                  {STATUSES.find((s) => s.value === data.status)?.label}
                </ReviewRow>
                <ReviewRow label="Preferred Language">{data.language}</ReviewRow>
                <ReviewRow label="Urgency">
                  {URGENCY_OPTIONS.find((u) => u.value === data.urgency)?.label}
                </ReviewRow>
              </div>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-xs text-stone-500 leading-relaxed">
                <strong className="text-stone-700">Privacy:</strong> Your information is only used to generate guidance in this session. Nothing is stored on our servers.
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              {error}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <button
              onClick={back}
              className={`flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors px-3 py-2 rounded-lg hover:bg-stone-100 ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-600 transition-colors text-sm"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 bg-teal-700 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-teal-600 transition-colors text-sm disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? "Getting your guidance…" : "Get my guidance"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReviewRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3 py-3 border-b border-stone-100 last:border-0">
      <div className="w-32 shrink-0 text-xs font-semibold text-stone-500 uppercase tracking-wider pt-0.5">
        {label}
      </div>
      <div className="flex-1 text-sm text-stone-800">{children}</div>
    </div>
  );
}
