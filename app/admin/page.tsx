import Link from "next/link";
import { Suspense } from "react";
import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            PC
          </div>
          <span className="font-semibold text-slate-900">PlainCost Insights</span>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <Suspense fallback={<div className="text-sm text-slate-500">Loading…</div>}>
          <AdminLoginForm />
        </Suspense>
      </div>
    </main>
  );
}