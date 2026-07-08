import {
  ComputeOptimizerClient,
  GetEC2InstanceRecommendationsCommand,
  GetEnrollmentStatusCommand,
  GetRecommendationSummariesCommand,
} from "@aws-sdk/client-compute-optimizer";
import type { AssumedRoleCredentials } from "@/lib/aws/sts";

export type SavingsRecommendation = {
  resourceType: string;
  resourceId: string;
  finding: string;
  currentType?: string;
  recommendedType?: string;
  estimatedMonthlySavings: number;
  summary: string;
};

function getComputeOptimizerClient(credentials: AssumedRoleCredentials) {
  return new ComputeOptimizerClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
      sessionToken: credentials.sessionToken,
    },
  });
}

export async function getSavingsRecommendations(
  credentials: AssumedRoleCredentials,
): Promise<SavingsRecommendation[]> {
  const client = getComputeOptimizerClient(credentials);

  const enrollment = await client.send(new GetEnrollmentStatusCommand({}));

  if (enrollment.status !== "Active") {
    return [];
  }

  const [summaries, ec2Recommendations] = await Promise.all([
    client.send(new GetRecommendationSummariesCommand({})),
    client.send(
      new GetEC2InstanceRecommendationsCommand({
        maxResults: 5,
      }),
    ),
  ]);

  const recommendations: SavingsRecommendation[] = [];

  for (const summary of summaries.recommendationSummaries ?? []) {
    const savings = Number(
      summary.savingsOpportunity?.estimatedMonthlySavings?.value ?? 0,
    );

    if (savings <= 0) {
      continue;
    }

    recommendations.push({
      resourceType: summary.accountId ? "Account summary" : "Summary",
      resourceId: summary.accountId ?? "account",
      finding: summary.recommendationResourceType ?? "Optimization",
      estimatedMonthlySavings: savings,
      summary: `Potential monthly savings of about $${savings.toFixed(2)} from ${summary.recommendationResourceType ?? "Compute Optimizer"} recommendations.`,
    });
  }

  for (const instance of ec2Recommendations.instanceRecommendations ?? []) {
    const topOption = instance.recommendationOptions?.[0];
    const savings = Number(topOption?.savingsOpportunity?.estimatedMonthlySavings?.value ?? 0);

    if (savings <= 0) {
      continue;
    }

    recommendations.push({
      resourceType: "EC2",
      resourceId: instance.instanceArn?.split("/").pop() ?? "instance",
      finding: instance.finding ?? "OPTIMIZED",
      currentType: instance.currentInstanceType,
      recommendedType: topOption?.instanceType,
      estimatedMonthlySavings: savings,
      summary: `Rightsizing ${instance.instanceName ?? "an EC2 instance"} from ${instance.currentInstanceType ?? "current size"} to ${topOption?.instanceType ?? "a smaller size"} could save about $${savings.toFixed(2)}/month.`,
    });
  }

  return recommendations
    .sort((left, right) => right.estimatedMonthlySavings - left.estimatedMonthlySavings)
    .slice(0, 5);
}