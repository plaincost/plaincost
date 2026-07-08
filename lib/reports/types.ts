import type { SavingsRecommendation } from "@/lib/aws/compute-optimizer";
import type { WeeklyCostSummary } from "@/lib/aws/cost-explorer";

export type PlaincostReport = {
  generatedAt: string;
  headline: string;
  summary: string;
  cost: WeeklyCostSummary;
  topServices: WeeklyCostSummary["services"];
  recommendations: SavingsRecommendation[];
  narrative: string[];
};