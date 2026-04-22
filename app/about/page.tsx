import Link from "next/link";
import { ArrowRight, Heart, Shield, AlertCircle, Users, Sparkles } from "lucide-react";
import IslamicPattern from "@/components/IslamicPattern";
import { resources } from "@/lib/resources";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Hero */}
      <div className="relative bg-teal-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <IslamicPattern color="#ffffff" opacity={0.07} size={65} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Why we built this
          </h1>
          <p className="text-teal-200 text-lg max-w-2xl leading-relaxed">
            Newcomer Legal Navigator BC was built to close the information gap that leaves many refugees and immigrants in British Columbia unsure of their rights and disconnected from the help they're entitled to.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
        {/* Mission */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-100 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-teal-700" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">The problem we're solving</h2>
          </div>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              Each year, tens of thousands of people arrive in British Columbia as refugees, refugee claimants, or immigrants facing complex legal situations. Many don't know where to turn. They may not speak English fluently, may not know what organizations exist, and may be afraid to reach out for fear of consequences.
            </p>
            <p>
              The result: people with legitimate claims miss deadlines. Workers accept exploitation because they don't know their rights. Families stay in dangerous situations because they don't know what protections apply to them.
            </p>
            <p>
              <strong className="text-stone-900">This tool changes that.</strong> By combining AI with a curated directory of real BC organizations, we help newcomers understand their situation in plain language and find the right support — in minutes, for free.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-700" />
            </div>
            <h2 className="text-xl font-bold text-stone-900">How the AI guidance works</h2>
          </div>
          <div className="space-y-4 text-stone-700 leading-relaxed">
            <p>
              When you describe your situation, we send it to Claude — Anthropic's AI — along with our full directory of BC organizations. Claude is instructed to act as a knowledgeable guide: explaining rights in plain language, identifying which organizations are most relevant to your specific situation, and giving you clear next steps.
            </p>
            <p>
              The AI is explicitly instructed <em>not</em> to give legal advice and to always direct you to qualified legal professionals for anything situation-specific. It's a starting point, not a replacement for a lawyer.
            </p>
            <p>
              Your information is used only for that session and is not stored on our servers.
            </p>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { number: resources.length.toString(), label: "Organizations in directory", icon: Users },
            { number: "Free", label: "Always — no registration required", icon: Heart },
            { number: "24/7", label: "Available whenever you need it", icon: Shield },
          ].map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl border border-stone-200 p-6 text-center shadow-sm">
              <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <stat.icon className="w-5 h-5 text-teal-700" />
              </div>
              <div className="text-2xl font-bold text-teal-700 mb-1">{stat.number}</div>
              <div className="text-sm text-stone-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Important limitations */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-amber-900 mb-2">Important limitations</h3>
              <ul className="space-y-2 text-sm text-amber-800">
                <li>• This tool provides <strong>general information</strong>, not legal advice</li>
                <li>• AI guidance may not reflect the most recent changes in Canadian immigration law</li>
                <li>• Always verify information with the organizations directly before taking action</li>
                <li>• For complex or urgent legal situations, contact Legal Aid BC or a qualified lawyer immediately</li>
                <li>• The resource directory covers a selection of organizations and may not include all available services in your area</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Design philosophy */}
        <div className="bg-white rounded-2xl border border-stone-200 p-8 mb-8 shadow-sm">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Design philosophy</h2>
          <p className="text-stone-700 leading-relaxed mb-4">
            This tool was designed to feel welcoming, not institutional. The use of Islamic geometric patterns in the design reflects a commitment to making the experience feel warm and familiar for newcomers from diverse backgrounds, including Muslim communities who represent a significant portion of refugees and newcomers to BC.
          </p>
          <p className="text-stone-700 leading-relaxed">
            The interface prioritizes accessibility: plain language throughout, large touch targets, and a calming color palette that signals trust rather than bureaucracy.
          </p>
        </div>

        {/* CTA */}
        <div className="relative bg-teal-800 text-white rounded-2xl p-8 overflow-hidden text-center">
          <div className="absolute inset-0">
            <IslamicPattern color="#ffffff" opacity={0.07} size={55} />
          </div>
          <div className="relative">
            <h2 className="text-xl font-bold mb-3">Ready to find the right support?</h2>
            <p className="text-teal-200 mb-6 text-sm max-w-md mx-auto">
              Tell us about your situation and get personalized guidance in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/intake"
                className="inline-flex items-center justify-center gap-2 bg-white text-teal-800 font-semibold px-6 py-3 rounded-xl hover:bg-teal-50 transition-colors"
              >
                Get help now
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/directory"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/30 text-white font-medium px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
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
