"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [message, setMessage] = useState("");

  const configError = searchParams.get("error") === "config";
  const redirectTo = searchParams.get("from") ?? "/admin/waitlist";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.error ?? "Login failed.");
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } catch {
      setStatus("error");
      setMessage("Login failed. Please try again.");
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">
        Admin login
      </h1>
      <p className="mt-2 text-sm text-slate-600">
        Sign in to view waitlist signups and export CSV.
      </p>

      {configError && (
        <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
          Admin is not configured. Set `WAITLIST_ADMIN_SECRET` in the environment.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="admin-password"
            className="block text-sm font-medium text-slate-700"
          >
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            name="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={status === "loading"}
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 disabled:opacity-60"
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "loading" ? "Signing in…" : "Sign in"}
        </button>
      </form>

      {message && (
        <p className="mt-3 text-sm text-red-600" role="status">
          {message}
        </p>
      )}
    </div>
  );
}