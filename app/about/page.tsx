import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resources } from "@/lib/resources";

export default function AboutPage() {
  return (
    <div className="py-10">
      <div className="max-w-3xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-semibold text-ink-400 uppercase tracking-wider mb-2">About</p>
          <h1 className="text-4xl font-bold text-ink-900 tracking-tight mb-4">Why we built this</h1>
          <p className="text-ink-500 leading-relaxed text-lg">
            Legal Navigator BC was built to close the information gap that leaves many refugees and immigrants in British Columbia unsure of their rights.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { value: resources.length.toString(), label: "Organizations" },
            { value: "Free", label: "Always" },
            { value: "All", label: "Statuses served" },
          ].map((s) => (
            <div key={s.label} className="bg-white/80 border border-black/6 rounded-2xl p-5 text-center">
              <p className="text-3xl font-bold text-ink-900 tracking-tight">{s.value}</p>
              <p className="text-sm text-ink-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-5">
          <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
            <h2 className="font-semibold text-ink-900 mb-3">The problem</h2>
            <div className="space-y-3 text-sm text-ink-600 leading-relaxed">
              <p>
                Each year, tens of thousands of people arrive in British Columbia as refugees, refugee claimants, or immigrants facing complex legal situations. Many do not know where to turn. They may not speak English fluently, may not know what organizations exist, and may be afraid to reach out.
              </p>
              <p>
                The result: people with legitimate claims miss deadlines. Workers accept exploitation because they do not know their rights. Families stay in dangerous situations because they do not know what protections apply to them.
              </p>
            </div>
          </div>

          <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
            <h2 className="font-semibold text-ink-900 mb-3">How the AI guidance works</h2>
            <div className="space-y-3 text-sm text-ink-600 leading-relaxed">
              <p>
                When you describe your situation, we send it to Claude, an AI model by Anthropic, along with our full directory of BC organizations. Claude is instructed to explain rights in plain language, identify which organizations are most relevant, and give you clear next steps.
              </p>
              <p>
                The AI is explicitly instructed not to give legal advice and to always direct you to qualified legal professionals for anything situation-specific. It is a starting point, not a replacement for a lawyer.
              </p>
              <p>
                Your information is only used for that session and is not stored on any server.
              </p>
            </div>
          </div>

          <div className="bg-white/80 border border-black/6 rounded-2xl p-6">
            <h2 className="font-semibold text-ink-900 mb-3">Important limitations</h2>
            <ul className="space-y-2 text-sm text-ink-600">
              <li>This tool provides general information, not legal advice</li>
              <li>AI guidance may not reflect the most recent changes in Canadian immigration law</li>
              <li>Always verify information with organizations directly before taking action</li>
              <li>For complex or urgent situations, contact Legal Aid BC or a qualified lawyer immediately</li>
              <li>The directory covers a selection of organizations and may not include all available services in your area</li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-ink-900 text-white rounded-2xl p-8 text-center">
            <h2 className="text-xl font-bold mb-3 tracking-tight">Ready to find support?</h2>
            <p className="text-white/60 mb-6 text-sm">
              Describe your situation and get personalized guidance in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 bg-gold-300 text-ink-900 font-semibold px-6 py-3 rounded-full hover:bg-gold-400 transition-colors text-sm"
              >
                Get guidance
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white font-medium px-6 py-3 rounded-full hover:bg-white/20 transition-colors text-sm"
              >
                Browse resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
