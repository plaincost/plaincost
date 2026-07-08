import Link from "next/link";
import AdminLogoutButton from "@/components/AdminLogoutButton";
import { listWaitlistSignups } from "@/lib/supabase-admin";

export const dynamic = "force-dynamic";

function formatDate(value: string): string {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function countRecentSignups(
  signups: { created_at: string }[],
  days: number,
): number {
  const cutoff = Date.now() - days * 24 * 60 * 60 * 1000;

  return signups.filter((signup) => new Date(signup.created_at).getTime() >= cutoff)
    .length;
}

export default async function AdminWaitlistPage() {
  const signups = await listWaitlistSignups();
  const lastSevenDays = countRecentSignups(signups, 7);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-brand-700">Admin</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Waitlist signups
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            View signups and export a CSV for outreach or analysis.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/admin/waitlist?format=csv"
            className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700"
          >
            Export CSV
          </a>
          <AdminLogoutButton />
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total signups</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{signups.length}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Last 7 days</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{lastSevenDays}</p>
        </div>
      </div>

      <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-medium text-slate-700">Email</th>
                <th className="px-4 py-3 font-medium text-slate-700">Signed up</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {signups.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-4 py-8 text-center text-slate-500">
                    No signups yet.
                  </td>
                </tr>
              ) : (
                signups.map((signup) => (
                  <tr key={`${signup.email}-${signup.created_at}`}>
                    <td className="px-4 py-3 font-medium text-slate-900">
                      {signup.email}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {formatDate(signup.created_at)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-6 text-sm text-slate-500">
        <Link href="/" className="font-medium text-brand-700 hover:underline">
          Back to site
        </Link>
      </p>
    </main>
  );
}