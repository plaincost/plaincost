import { getSavingsRecommendations } from "@/lib/aws/compute-optimizer";
import { getWeeklyCostSummary } from "@/lib/aws/cost-explorer";
import type { AssumedRoleCredentials } from "@/lib/aws/sts";
import type { PlaincostReport } from "@/lib/reports/types";

function formatCurrency(amount: number, unit: string): string {
  if (unit === "USD") {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);
  }

  return `${amount.toFixed(2)} ${unit}`;
}

function formatPercentChange(value: number | null): string {
  if (value === null) {
    return "no prior-week comparison available";
  }

  const rounded = value.toFixed(1);
  return value >= 0 ? `up ${rounded}%` : `down ${Math.abs(Number(rounded))}%`;
}

function buildNarrative(report: {
  cost: Awaited<ReturnType<typeof getWeeklyCostSummary>>;
  recommendations: Awaited<ReturnType<typeof getSavingsRecommendations>>;
}): string[] {
  const lines: string[] = [];
  const topService = report.cost.services[0];
  const totalLabel = formatCurrency(report.cost.total, report.cost.unit);

  lines.push(
    `You spent ${totalLabel} over the last 7 days, ${formatPercentChange(report.cost.percentChange)} compared with the previous week.`,
  );

  if (topService) {
    lines.push(
      `${topService.service} was your largest cost at ${formatCurrency(topService.amount, topService.unit)}.`,
    );
  }

  if (report.recommendations.length > 0) {
    lines.push(report.recommendations[0].summary);
  } else {
    lines.push(
      "Compute Optimizer did not surface immediate rightsizing opportunities for this account.",
    );
  }

  return lines;
}

export async function generatePlaincostReport(
  credentials: AssumedRoleCredentials,
): Promise<PlaincostReport> {
  const [cost, recommendations] = await Promise.all([
    getWeeklyCostSummary(credentials),
    getSavingsRecommendations(credentials),
  ]);

  const headline = `Weekly AWS spend: ${formatCurrency(cost.total, cost.unit)}`;

  const reportWithoutNarrative = {
    generatedAt: new Date().toISOString(),
    headline,
    summary: `Costs for ${cost.periodStart} to ${cost.periodEnd}.`,
    cost,
    topServices: cost.services.slice(0, 5),
    recommendations,
    narrative: [] as string[],
  };

  return {
    ...reportWithoutNarrative,
    narrative: buildNarrative({ cost, recommendations }),
  };
}