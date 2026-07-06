import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How PlainCost Insights handles your data.",
  openGraph: {
    title: "Privacy Policy — PlainCost Insights",
    description: "How PlainCost Insights handles your data.",
    url: "/privacy",
  },
  twitter: {
    title: "Privacy Policy — PlainCost Insights",
    description: "How PlainCost Insights handles your data.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="mx-auto flex max-w-3xl items-center justify-between px-6 py-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            PC
          </div>
          <span className="font-semibold text-slate-900">PlainCost Insights</span>
        </Link>
      </header>

      <main className="mx-auto max-w-3xl px-6 pb-16">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-slate-500">Last updated: June 30, 2026</p>

        <div className="prose prose-slate mt-8 max-w-none space-y-6 text-slate-600">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">Overview</h2>
            <p className="mt-2 leading-relaxed">
              PlainCost Insights (&quot;we,&quot; &quot;us&quot;) respects your
              privacy. This policy explains what we collect when you join our
              waitlist and how we use it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              Information we collect
            </h2>
            <p className="mt-2 leading-relaxed">
              When you join the waitlist, we collect your email address and the
              date you signed up. We do not collect payment information, AWS
              credentials, or account data through the waitlist form.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              How we use your information
            </h2>
            <p className="mt-2 leading-relaxed">
              We use your email to notify you about early access, product
              updates, and launch information related to PlainCost Insights. We
              do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              Data storage and security
            </h2>
            <p className="mt-2 leading-relaxed">
              Waitlist data is stored securely on our servers. We take reasonable
              measures to protect your information from unauthorized access,
              alteration, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Your rights</h2>
            <p className="mt-2 leading-relaxed">
              You may request removal from the waitlist at any time by contacting
              us. We will delete your email from our waitlist upon request.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">
              Changes to this policy
            </h2>
            <p className="mt-2 leading-relaxed">
              We may update this policy as the product evolves. Material changes
              will be reflected on this page with an updated date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
            <p className="mt-2 leading-relaxed">
              Questions about this policy? Reach out through the contact
              information provided when you receive waitlist communications.
            </p>
          </section>
        </div>

        <p className="mt-12 text-sm text-slate-500">
          <Link href="/" className="font-medium text-brand-700 hover:text-brand-800">
            ← Back to home
          </Link>
        </p>
      </main>
    </div>
  );
}