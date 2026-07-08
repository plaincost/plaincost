import Link from "next/link";
import { getPublicPlaincostAwsAccountId } from "@/lib/aws/config";

export const metadata = {
  title: "AWS Setup",
  description:
    "Connect your AWS account to PlainCost with read-only access for cost reports.",
};

export default function SetupPage() {
  const plaincostAwsAccountId = getPublicPlaincostAwsAccountId();
  const templateUrl = "https://plaincost.ai/cloudformation/plaincost-readonly-role.yaml";

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link href="/" className="text-sm font-medium text-brand-700 hover:underline">
        ← Back to PlainCost
      </Link>

      <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">
        Connect AWS with read-only access
      </h1>
      <p className="mt-3 text-base leading-relaxed text-slate-600">
        PlainCost only reads billing and optimization data. We cannot change
        resources in your AWS account, and you can revoke access anytime.
      </p>

      <ol className="mt-8 list-decimal space-y-4 pl-5 text-sm leading-relaxed text-slate-700">
        <li>
          PlainCost will send you an <strong>External ID</strong> when your
          early-access spot opens.
        </li>
        <li>
          Deploy our CloudFormation template in your AWS account. It creates a
          read-only IAM role named <code>PlainCostReadOnly</code>.
        </li>
        <li>
          Copy the stack output <strong>RoleArn</strong> and send it back to
          PlainCost.
        </li>
        <li>
          We validate the connection and generate your sample report from real
          billing data.
        </li>
      </ol>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">What PlainCost can access</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>AWS Cost Explorer usage and spend data</li>
          <li>Billing visibility needed for cost summaries</li>
          <li>Compute Optimizer rightsizing recommendations</li>
        </ul>
        <p className="mt-4 text-sm text-slate-600">
          PlainCost cannot create, modify, or delete AWS resources.
        </p>
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">CloudFormation template</h2>
        <p className="mt-2 text-sm text-slate-600">
          Your setup link will include the External ID and PlainCost account ID.
          For reference, the template lives here:
        </p>
        <a
          href={templateUrl}
          className="mt-3 inline-block text-sm font-medium text-brand-700 hover:underline"
        >
          {templateUrl}
        </a>
        {plaincostAwsAccountId && (
          <p className="mt-4 text-sm text-slate-600">
            PlainCost AWS account ID:{" "}
            <span className="font-mono text-slate-900">{plaincostAwsAccountId}</span>
          </p>
        )}
      </div>
    </main>
  );
}