import {
  CostExplorerClient,
  GetCostAndUsageCommand,
  Granularity,
} from "@aws-sdk/client-cost-explorer";
import type { AssumedRoleCredentials } from "@/lib/aws/sts";

export type ServiceCost = {
  service: string;
  amount: number;
  unit: string;
};

export type WeeklyCostSummary = {
  periodStart: string;
  periodEnd: string;
  total: number;
  unit: string;
  previousTotal: number;
  percentChange: number | null;
  services: ServiceCost[];
};

function getCostExplorerClient(credentials: AssumedRoleCredentials) {
  return new CostExplorerClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
    },
  });
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function parseAmount(value?: string): number {
  return Number.parseFloat(value ?? "0") || 0;
}

type CostGroup = {
  Keys?: string[];
  Metrics?: {
    UnblendedCost?: {
      Amount?: string;
      Unit?: string;
    };
  };
};

function extractServiceCosts(groups: CostGroup[] | undefined): ServiceCost[] {
  if (!groups?.length) {
    return [];
  }

  const totals = new Map<string, ServiceCost>();

  for (const group of groups) {
    const service = group.Keys?.[0] ?? "Unknown";
    const amount = parseAmount(group.Metrics?.UnblendedCost?.Amount);
    const unit = group.Metrics?.UnblendedCost?.Unit ?? "USD";
    const existing = totals.get(service);

    if (existing) {
      existing.amount += amount;
      continue;
    }

    totals.set(service, { service, amount, unit });
  }

  return Array.from(totals.values())
    .filter((item) => item.amount > 0)
    .sort((left, right) => right.amount - left.amount);
}

async function fetchPeriodTotal(
  client: CostExplorerClient,
  start: string,
  end: string,
): Promise<{ total: number; unit: string; services: ServiceCost[] }> {
  const response = await client.send(
    new GetCostAndUsageCommand({
      TimePeriod: { Start: start, End: end },
      Granularity: Granularity.DAILY,
      Metrics: ["UnblendedCost"],
      GroupBy: [{ Type: "DIMENSION", Key: "SERVICE" }],
    }),
  );

  const groups = response.ResultsByTime?.flatMap((result) => result.Groups ?? []);
  const services = extractServiceCosts(groups);
  const total = services.reduce((sum, service) => sum + service.amount, 0);
  const unit = services[0]?.unit ?? "USD";

  return { total, unit, services };
}

export async function getWeeklyCostSummary(
  credentials: AssumedRoleCredentials,
  referenceDate = new Date(),
): Promise<WeeklyCostSummary> {
  const client = getCostExplorerClient(credentials);

  const currentEnd = formatDate(referenceDate);
  const currentStart = formatDate(addDays(referenceDate, -7));
  const previousEnd = currentStart;
  const previousStart = formatDate(addDays(referenceDate, -14));

  const [current, previous] = await Promise.all([
    fetchPeriodTotal(client, currentStart, currentEnd),
    fetchPeriodTotal(client, previousStart, previousEnd),
  ]);

  const percentChange =
    previous.total > 0
      ? ((current.total - previous.total) / previous.total) * 100
      : null;

  return {
    periodStart: currentStart,
    periodEnd: currentEnd,
    total: current.total,
    unit: current.unit,
    previousTotal: previous.total,
    percentChange,
    services: current.services,
  };
}