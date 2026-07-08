"use client";

import { useEffect, useState } from "react";

type AwsConnection = {
  id: string;
  contact_email: string | null;
  aws_account_id: string | null;
  role_arn: string | null;
  external_id: string;
  status: "pending" | "active" | "error" | "revoked";
  last_validated_at: string | null;
  validation_error: string | null;
  created_at: string;
};

type PlaincostReport = {
  headline: string;
  summary: string;
  narrative: string[];
  cost: {
    total: number;
    unit: string;
    percentChange: number | null;
    services: { service: string; amount: number }[];
  };
  recommendations: { summary: string; estimatedMonthlySavings: number }[];
};

type AdminAwsPanelProps = {
  plaincostAwsAccountId: string | null;
  templateUrl: string;
};

export default function AdminAwsPanel({
  plaincostAwsAccountId,
  templateUrl,
}: AdminAwsPanelProps) {
  const [connections, setConnections] = useState<AwsConnection[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [reportPreview, setReportPreview] = useState<PlaincostReport | null>(null);
  const [roleArnDrafts, setRoleArnDrafts] = useState<Record<string, string>>({});
  const [busyId, setBusyId] = useState<string | null>(null);

  async function loadConnections() {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/aws/connections");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load connections.");
      }

      setConnections(data.connections ?? []);
      setRoleArnDrafts(
        Object.fromEntries(
          (data.connections ?? []).map((connection: AwsConnection) => [
            connection.id,
            connection.role_arn ?? "",
          ]),
        ),
      );
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load connections.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadConnections();
  }, []);

  async function handleCreateConnection() {
    setBusyId("create");
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/admin/aws/connections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contactEmail }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to create connection.");
      }

      setContactEmail("");
      setMessage("Connection created. Share the External ID and setup link.");
      await loadConnections();
    } catch (createError) {
      setError(
        createError instanceof Error
          ? createError.message
          : "Failed to create connection.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleSaveRoleArn(connectionId: string) {
    setBusyId(connectionId);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/aws/connections/${connectionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleArn: roleArnDrafts[connectionId] }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save role ARN.");
      }

      setMessage("Role ARN saved.");
      await loadConnections();
    } catch (saveError) {
      setError(
        saveError instanceof Error ? saveError.message : "Failed to save role ARN.",
      );
    } finally {
      setBusyId(null);
    }
  }

  async function handleValidate(connectionId: string) {
    setBusyId(connectionId);
    setMessage("");
    setError("");

    try {
      const response = await fetch(
        `/api/admin/aws/connections/${connectionId}/validate`,
        { method: "POST" },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Validation failed.");
      }

      setMessage(
        data.connection.status === "active"
          ? "Connection validated successfully."
          : "Validation finished with errors.",
      );
      await loadConnections();
    } catch (validateError) {
      setError(
        validateError instanceof Error ? validateError.message : "Validation failed.",
      );
      await loadConnections();
    } finally {
      setBusyId(null);
    }
  }

  async function handleGenerateReport(connectionId: string) {
    setBusyId(connectionId);
    setMessage("");
    setError("");
    setReportPreview(null);

    try {
      const response = await fetch(
        `/api/admin/aws/connections/${connectionId}/report`,
        { method: "POST" },
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to generate report.");
      }

      setReportPreview(data.report);
      setMessage("Report generated and saved.");
    } catch (reportError) {
      setError(
        reportError instanceof Error
          ? reportError.message
          : "Failed to generate report.",
      );
    } finally {
      setBusyId(null);
    }
  }

  function cloudFormationUrl(externalId: string): string | null {
    if (!plaincostAwsAccountId) {
      return null;
    }

    const params = new URLSearchParams({
      stackName: "PlainCostReadOnly",
      templateURL: templateUrl,
      param_ExternalId: externalId,
      param_PlainCostAwsAccountId: plaincostAwsAccountId,
    });

    return `https://console.aws.amazon.com/cloudformation/home#/stacks/create/review?${params.toString()}`;
  }

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">Create connection</h2>
        <p className="mt-2 text-sm text-slate-600">
          Generate an External ID for a customer, then have them deploy the
          CloudFormation template in their AWS account.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="customer@company.com (optional)"
            value={contactEmail}
            onChange={(event) => setContactEmail(event.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
          />
          <button
            type="button"
            onClick={handleCreateConnection}
            disabled={busyId === "create"}
            className="rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
          >
            {busyId === "create" ? "Creating…" : "Create connection"}
          </button>
        </div>
      </section>

      {message && <p className="text-sm text-brand-700">{message}</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}

      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Connections</h2>

        {loading ? (
          <p className="text-sm text-slate-500">Loading connections…</p>
        ) : connections.length === 0 ? (
          <p className="rounded-xl border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
            No AWS connections yet.
          </p>
        ) : (
          connections.map((connection) => {
            const launchUrl = cloudFormationUrl(connection.external_id);

            return (
              <div
                key={connection.id}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <p className="font-medium text-slate-900">
                    {connection.contact_email ?? "No contact email"}
                  </p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {connection.status}
                  </span>
                </div>

                <dl className="mt-4 grid gap-3 text-sm text-slate-600">
                  <div>
                    <dt className="font-medium text-slate-700">External ID</dt>
                    <dd className="mt-1 break-all font-mono text-xs text-slate-900">
                      {connection.external_id}
                    </dd>
                  </div>
                  {launchUrl && (
                    <div>
                      <dt className="font-medium text-slate-700">CloudFormation</dt>
                      <dd className="mt-1">
                        <a
                          href={launchUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand-700 hover:underline"
                        >
                          Open AWS setup stack
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>

                <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    placeholder="arn:aws:iam::123456789012:role/PlainCostReadOnly"
                    value={roleArnDrafts[connection.id] ?? ""}
                    onChange={(event) =>
                      setRoleArnDrafts((current) => ({
                        ...current,
                        [connection.id]: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleSaveRoleArn(connection.id)}
                    disabled={busyId === connection.id}
                    className="rounded-lg border border-slate-300 px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    Save ARN
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => handleValidate(connection.id)}
                    disabled={busyId === connection.id}
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700 disabled:opacity-60"
                  >
                    Validate connection
                  </button>
                  <button
                    type="button"
                    onClick={() => handleGenerateReport(connection.id)}
                    disabled={busyId === connection.id || connection.status !== "active"}
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-60"
                  >
                    Generate report preview
                  </button>
                </div>

                {connection.validation_error && (
                  <p className="mt-3 text-sm text-red-600">
                    {connection.validation_error}
                  </p>
                )}
              </div>
            );
          })
        )}
      </section>

      {reportPreview && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Report preview</h2>
          <p className="mt-2 text-xl font-bold text-slate-900">{reportPreview.headline}</p>
          <p className="mt-2 text-sm text-slate-600">{reportPreview.summary}</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {reportPreview.narrative.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-slate-900">Top services</h3>
            <ul className="mt-2 space-y-1 text-sm text-slate-600">
              {reportPreview.cost.services.slice(0, 5).map((service) => (
                <li key={service.service}>
                  {service.service}: ${service.amount.toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}