"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { IntakeData, BCRegion, ImmigrationStatus } from "@/lib/types";

const STEPS = ["Situation", "Location", "Preferences", "Review"];

const BC_REGIONS: { value: BCRegion; label: string }[] = [
  { value: "vancouver", label: "Vancouver" },
  { value: "surrey", label: "Surrey / Delta" },
  { value: "burnaby", label: "Burnaby / New Westminster" },
  { value: "richmond", label: "Richmond" },
  { value: "north_shore", label: "North Shore" },
  { value: "tri_cities", label: "Tri-Cities" },
  { value: "fraser_valley", label: "Fraser Valley" },
  { value: "victoria", label: "Victoria / Vancouver Island" },
  { value: "kelowna", label: "Kelowna / Okanagan" },
  { value: "prince_george", label: "Prince George / Northern BC" },
  { value: "province_wide", label: "Other / Not sure" },
];

const STATUSES: { value: ImmigrationStatus; label: string; description: string }[] = [
  { value: "refugee_claimant", label: "Refugee Claimant", description: "I filed or want to file a refugee claim" },
  { value: "protected_person", label: "Protected Person", description: "My refugee claim was accepted" },
  { value: "permanent_resident", label: "Permanent Resident", description: "I have PR status" },
  { value: "work_permit", label: "Work or Study Permit", description: "I have a temporary permit" },
  { value: "visitor", label: "Visitor", description: "I am here on a visitor visa" },
  { value: "undocumented", label: "No Status", description: "I do not have valid immigration documents" },
  { value: "other", label: "Not Sure", description: "I am not certain of my current status" },
];

const LANGUAGES = [
  "English", "French", "Arabic", "Punjabi", "Mandarin", "Cantonese",
  "Farsi / Dari", "Spanish", "Tagalog", "Hindi", "Urdu", "Somali",
  "Amharic / Tigrinya", "Vietnamese", "Korean", "Other",
];

const URGENCY_OPTIONS = [
  { value: "immediate", label: "Urgent — I need help this week" },
  { value: "this_week", label: "Soon — something is coming up in 2 to 4 weeks" },
  { value: "this_month", label: "Within the month — I am planning ahead" },
  { value: "general_info", label: "Just exploring my options" },
];

const EXAMPLE_SITUATIONS = [
  "I just arrived as a refugee claimant and do not know what to do next",
  "My work permit expired and I am not sure what my options are",
  "I am a permanent resident and my employer is not paying me correctly",
  "I experienced domestic violence and need to know my rights",
];

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
      setError("Please describe your situation in more detail.");
      return false;
    }
    if (step === 1 && (!data.location || !data.status)) {
      setError("Please select your location and immigration status.");
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
      sessionStorage.setItem("intakeData", JSON.stringify(intake));
      router.push("/results");
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ink-900 mb-2 tracking-tight">
            Tell us your situation
          </h1>
          <p className="text-ink-500 text-sm">
            Step {step + 1} of {STEPS.length} — {STEPS[step]}
          </p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {STEPS.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-all ${
                i <= step ? "bg-ink-900" : "bg-black/10"
              }`}
            />
          ))}
        </div>

        <div className="bg-white/80 border border-black/6 rounded-3xl p-6 sm:p-8">

          {/* Step 0: Situation */}
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-ink-900 mb-1">
                What is happening?
              </h2>
              <p className="text-sm text-ink-500 mb-4">
                Write in your own words. No need to use legal terms.
              </p>
              <textarea
                value={data.situation || ""}
                onChange={(e) => update("situation", e.target.value)}
                placeholder="Example: I arrived six months ago as a refugee claimant. My hearing is coming up and I do not have a lawyer yet..."
                rows={6}
                className="w-full border border-black/10 rounded-2xl px-4 py-3 text-sm text-ink-800 placeholder-ink-300 focus:outline-none focus:ring-2 focus:ring-ink-900 focus:border-transparent resize-none bg-white/60"
              />
              <div className="mt-4">
                <p className="text-xs text-ink-400 mb-2 font-medium">Examples</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_SITUATIONS.map((ex) => (
                    <button
                      key={ex}
                      onClick={() => update("situation", ex)}
                      className="text-xs bg-cream-200 hover:bg-gold-100 text-ink-600 px-3 py-1.5 rounded-full transition-colors text-left"
                    >
                      {ex.length > 55 ? ex.slice(0, 55) + "..." : ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Location + Status */}
          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-ink-900 mb-5">
                Where are you and what is your status?
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  Where in BC are you located?
                </label>
                <select
                  value={data.location || ""}
                  onChange={(e) => update("location", e.target.value as BCRegion)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-900 bg-white/60"
                >
                  <option value="">Select your region</option>
                  {BC_REGIONS.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  What best describes your immigration status?
                </label>
                <div className="space-y-2">
                  {STATUSES.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => update("status", s.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                        data.status === s.value
                          ? "border-ink-900 bg-ink-900 text-white"
                          : "border-black/10 bg-white/40 hover:bg-white/70"
                      }`}
                    >
                      <div className={`text-sm font-medium ${data.status === s.value ? "text-white" : "text-ink-900"}`}>
                        {s.label}
                      </div>
                      <div className={`text-xs mt-0.5 ${data.status === s.value ? "text-white/70" : "text-ink-400"}`}>
                        {s.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-ink-900 mb-5">
                Language and urgency
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  Preferred language for support services
                </label>
                <select
                  value={data.language || "English"}
                  onChange={(e) => update("language", e.target.value)}
                  className="w-full border border-black/10 rounded-xl px-4 py-2.5 text-sm text-ink-800 focus:outline-none focus:ring-2 focus:ring-ink-900 bg-white/60"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink-700 mb-2">
                  How urgent is your situation?
                </label>
                <div className="space-y-2">
                  {URGENCY_OPTIONS.map((u) => (
                    <button
                      key={u.value}
                      onClick={() => update("urgency", u.value)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ${
                        data.urgency === u.value
                          ? "border-ink-900 bg-ink-900 text-white font-medium"
                          : "border-black/10 bg-white/40 text-ink-700 hover:bg-white/70"
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
            <div>
              <h2 className="text-lg font-semibold text-ink-900 mb-5">
                Review your information
              </h2>
              <div className="space-y-0 divide-y divide-black/5">
                {[
                  { label: "Situation", value: data.situation },
                  { label: "Location", value: BC_REGIONS.find((r) => r.value === data.location)?.label },
                  { label: "Status", value: STATUSES.find((s) => s.value === data.status)?.label },
                  { label: "Language", value: data.language },
                  { label: "Urgency", value: URGENCY_OPTIONS.find((u) => u.value === data.urgency)?.label },
                ].map((row) => (
                  <div key={row.label} className="py-3 flex gap-4">
                    <span className="w-24 shrink-0 text-xs font-semibold text-ink-400 uppercase tracking-wider pt-0.5">
                      {row.label}
                    </span>
                    <span className="text-sm text-ink-800 leading-relaxed">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 bg-cream-200 rounded-xl p-4 text-xs text-ink-500 leading-relaxed">
                Your information is only used during this session and is not stored on our servers.
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 text-sm text-red-700 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Nav */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5">
            <button
              onClick={back}
              className={`flex items-center gap-2 text-sm font-medium text-ink-500 hover:text-ink-900 transition-colors px-3 py-2 rounded-lg hover:bg-black/5 ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            {step < STEPS.length - 1 ? (
              <button
                onClick={next}
                className="flex items-center gap-2 bg-ink-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-ink-800 transition-colors text-sm"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={loading}
                className="flex items-center gap-2 bg-ink-900 text-white font-semibold px-6 py-2.5 rounded-full hover:bg-ink-800 transition-colors text-sm disabled:opacity-50"
              >
                {loading ? "Loading..." : "Get my guidance"}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
