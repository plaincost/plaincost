import Link from "next/link";
import ReportMockup from "@/components/ReportMockup";
import WaitlistForm from "@/components/WaitlistForm";

const painPoints = [
  {
    title: "Surprise bills, no explanation",
    description:
      "Your AWS invoice goes up and nobody on the team can tell you why — or what to do about it.",
  },
  {
    title: "Dashboards built for engineers",
    description:
      "Cost Explorer and billing consoles assume cloud expertise your business shouldn't need.",
  },
  {
    title: "Savings buried in jargon",
    description:
      "AWS flags optimization opportunities, but they're written for DevOps teams — not owners.",
  },
];

const steps = [
  {
    step: "1",
    title: "Connect with read-only access",
    description:
      "Add a secure IAM role in about five minutes. We only read billing data — nothing else.",
  },
  {
    step: "2",
    title: "We analyze your costs weekly",
    description:
      "PlainCost pulls from Cost Explorer and Compute Optimizer, then translates it for you.",
  },
  {
    step: "3",
    title: "Get a plain-English email report",
    description:
      "Every week, a clear summary of what you spent, what changed, and where to save.",
  },
];

const features = [
  {
    title: "Secure IAM connection",
    description:
      "Connect with read-only access. We never store credentials — only analyze what AWS already exposes.",
  },
  {
    title: "Weekly email reports",
    description:
      "Get a plain-English summary of where your money went and what changed since last week.",
  },
  {
    title: "Actionable recommendations",
    description:
      "See basic savings opportunities pulled from AWS Cost Explorer and Compute Optimizer.",
  },
];

const trustPoints = [
  "Read-only IAM — we cannot change anything in your account",
  "No credential storage — access is managed through AWS roles",
  "Revoke access anytime from your AWS console",
  "Built for teams spending $500–$5,000/month on AWS",
];

const faqs = [
  {
    question: "What data does PlainCost access?",
    answer:
      "Only billing and usage data through read-only IAM permissions — the same information visible in AWS Cost Explorer. We do not access your application code, databases, or customer data.",
  },
  {
    question: "Do I need a cloud engineer to set this up?",
    answer:
      "No. Setup takes about five minutes with our guided IAM instructions. If you have someone who manages AWS today, they can do it — but you don't need ongoing DevOps support to use PlainCost.",
  },
  {
    question: "How much will it cost?",
    answer:
      "Pricing isn't finalized yet. Waitlist members get early access and founding-member pricing when we launch. The goal is to cost far less than the savings we help you find.",
  },
  {
    question: "Is my AWS account safe?",
    answer:
      "Yes. PlainCost uses read-only IAM roles — we cannot create, modify, or delete any AWS resources. You can revoke access at any time directly from your AWS console.",
  },
  {
    question: "When does PlainCost launch?",
    answer:
      "We're building now and onboarding waitlist members in batches. Join the list to get early access and help shape the product.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            PC
          </div>
          <span className="font-semibold text-slate-900">PlainCost Insights</span>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href="#waitlist"
            className="hidden text-sm font-medium text-slate-600 transition-colors hover:text-brand-700 sm:inline"
          >
            Join waitlist
          </a>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            Coming soon
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 sm:pb-24">
        {/* Hero */}
        <section className="pt-4 sm:pt-8 lg:grid lg:grid-cols-2 lg:items-center lg:gap-12 xl:gap-16">
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-brand-700">
              AWS costs shouldn&apos;t require a translator
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Your AWS bill went up again.{" "}
              <span className="text-brand-700">
                Get plain-English weekly reports.
              </span>
            </h1>
            <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
              Stop guessing where your money went. PlainCost sends you a clear
              weekly breakdown — what you spent, what changed, and where you can
              save. No cloud team required.
            </p>

            <p className="mt-5 text-sm text-slate-500">
              Helping SMBs save thousands on AWS every month
            </p>

            <p className="mt-5 inline-block rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm">
              For teams spending{" "}
              <strong className="font-medium text-slate-900">$500–$5k/month</strong>{" "}
              on AWS
            </p>

            <div
              id="waitlist"
              className="mt-8 w-full scroll-mt-24 lg:max-w-lg"
            >
              <WaitlistForm />
            </div>
            <p className="mt-3 text-sm font-medium text-brand-700">
              Limited spots for the first 500 members
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Early access + a free sample report. No spam, ever.
            </p>
          </div>

          <div className="mx-auto mt-10 w-full max-w-md lg:mt-0 lg:max-w-none">
            <ReportMockup compact />
          </div>
        </section>

        {/* Pain points */}
        <section className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Sound familiar?
            </h2>
            <p className="mt-3 text-slate-600">
              If you run a business on AWS, you&apos;ve probably felt this.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-6">
            {painPoints.map((point) => (
              <div
                key={point.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="font-semibold text-slate-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Report preview */}
        <section className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              This is what you&apos;ll get every week
            </h2>
            <p className="mt-3 text-slate-600">
              No dashboards to learn. Just a clear email that tells you what
              matters.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-lg sm:mt-10">
            <ReportMockup />
          </div>
        </section>

        {/* How it works */}
        <section className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              How it works
            </h2>
            <p className="mt-3 text-slate-600">
              Three steps. No cloud expertise required.
            </p>
          </div>
          <div className="mt-8 grid gap-8 sm:mt-10 sm:grid-cols-3">
            {steps.map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3 sm:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <h3 className="font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="mt-20 sm:mt-24">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Your AWS account stays yours
              </h2>
              <p className="mt-3 text-slate-600">
                We know handing over AWS access is a big decision. Here&apos;s
                how we keep it safe.
              </p>
            </div>
            <ul className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              {trustPoints.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-slate-700">
                  <span
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-20 sm:mt-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Common questions
            </h2>
          </div>
          <div className="mx-auto mt-8 max-w-2xl divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white shadow-sm sm:mt-10">
            {faqs.map((faq) => (
              <details key={faq.question} className="group px-4 py-1 sm:px-5">
                <summary className="flex min-h-12 cursor-pointer list-none items-center py-3 font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex w-full items-start justify-between gap-3 text-left text-[15px] leading-snug sm:items-center sm:gap-4 sm:text-base">
                    {faq.question}
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm text-slate-500 transition-transform group-open:rotate-45 sm:mt-0"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="pb-4 text-sm leading-relaxed text-slate-600">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-20 sm:mt-24">
          <div className="rounded-2xl bg-brand-600 px-5 py-10 text-center sm:px-12 sm:py-12">
            <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Stop guessing about your AWS bill
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-brand-100 sm:text-base">
              Join the waitlist for early access and a free sample report. Be
              among the first 500 members.
            </p>
            <div className="mx-auto mt-8 flex justify-center [&_input]:border-brand-400/30 [&_input]:focus:border-white [&_input]:focus:ring-white/20 [&_button]:bg-white [&_button]:text-brand-700 [&_button]:hover:bg-brand-50">
              <WaitlistForm inputId="email-cta" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl space-y-3 px-4 py-8 text-center text-sm text-slate-500 sm:px-6">
          <p>© {new Date().getFullYear()} PlainCost Insights</p>
          <p>
            <Link
              href="/privacy"
              className="font-medium text-slate-600 underline-offset-2 hover:text-brand-700 hover:underline"
            >
              Privacy Policy
            </Link>
          </p>
          <p className="mx-auto max-w-lg text-xs leading-relaxed text-slate-400">
            Independent project, not affiliated with Amazon Web Services, Inc.
          </p>
        </div>
      </footer>
    </div>
  );
}