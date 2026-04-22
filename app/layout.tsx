import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Newcomer Legal Navigator BC — Free Legal Guidance for Immigrants & Refugees",
  description:
    "Free AI-assisted tool helping refugees and immigrants in British Columbia understand their legal rights and find the right support organizations.",
  keywords: [
    "legal aid BC",
    "refugee rights BC",
    "immigrant help BC",
    "newcomer legal help",
    "British Columbia immigration",
    "free legal advice BC",
  ],
  openGraph: {
    title: "Newcomer Legal Navigator BC",
    description:
      "Free AI guidance for refugees and immigrants in British Columbia.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-stone-50 antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
