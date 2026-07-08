import Link from "next/link";
import AdminAwsPanel from "@/components/AdminAwsPanel";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { getPublicPlaincostAwsAccountId } from "@/lib/aws/config";

export const dynamic = "force-dynamic";

export default function AdminAwsPage() {
  const plaincostAwsAccountId = getPublicPlaincostAwsAccountId();
  const templateUrl = "https://plaincost.ai/cloudformation/plaincost-readonly-role.yaml";

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-700">Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            AWS connections
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Create customer connections, validate IAM roles, and preview reports.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/waitlist"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Waitlist
          </Link>
          <AdminLogoutButton />
        </div>
      </div>

      {!plaincostAwsAccountId && (
        <p className="mt-6 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Set `NEXT_PUBLIC_PLAINCOST_AWS_ACCOUNT_ID` (and PlainCost AWS credentials)
          in Vercel to enable CloudFormation links and role validation.
        </p>
      )}

      <div className="mt-8">
        <AdminAwsPanel
          plaincostAwsAccountId={plaincostAwsAccountId}
          templateUrl={templateUrl}
        />
      </div>
    </main>
  );
}