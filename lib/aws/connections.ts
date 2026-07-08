import { randomUUID } from "crypto";
import { assumeCustomerRole, parseAwsAccountIdFromRoleArn } from "@/lib/aws/sts";
import { generatePlaincostReport } from "@/lib/reports/generate";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export type AwsAccountConnection = {
  id: string;
  contact_email: string | null;
  aws_account_id: string | null;
  role_arn: string | null;
  external_id: string;
  status: "pending" | "active" | "error" | "revoked";
  last_validated_at: string | null;
  validation_error: string | null;
  created_at: string;
  updated_at: string;
};

export async function listAwsConnections(): Promise<AwsAccountConnection[]> {
  const supabase = getSupabaseAdminClient();
  const { data, error } = await supabase
    .from("aws_account_connections")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as AwsAccountConnection[];
}

export async function createAwsConnection(input: {
  contactEmail?: string;
  roleArn?: string;
  externalId?: string;
}): Promise<AwsAccountConnection> {
  const supabase = getSupabaseAdminClient();
  const roleArn = input.roleArn?.trim() || null;
  const externalId = input.externalId?.trim() || randomUUID();
  const awsAccountId = roleArn ? parseAwsAccountIdFromRoleArn(roleArn) : null;

  const { data, error } = await supabase
    .from("aws_account_connections")
    .insert({
      contact_email: input.contactEmail?.trim().toLowerCase() || null,
      aws_account_id: awsAccountId,
      role_arn: roleArn,
      external_id: externalId,
      status: "pending",
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as AwsAccountConnection;
}

export async function validateAwsConnection(
  connectionId: string,
): Promise<AwsAccountConnection> {
  const supabase = getSupabaseAdminClient();
  const { data: connection, error: fetchError } = await supabase
    .from("aws_account_connections")
    .select("*")
    .eq("id", connectionId)
    .single();

  if (fetchError || !connection) {
    throw new Error("Connection not found.");
  }

  if (!connection.role_arn) {
    throw new Error("Role ARN is required before validation.");
  }

  try {
    await assumeCustomerRole({
      roleArn: connection.role_arn,
      externalId: connection.external_id,
      sessionName: `plaincost-validate-${connection.id}`,
    });

    const awsAccountId =
      parseAwsAccountIdFromRoleArn(connection.role_arn) ?? connection.aws_account_id;

    const { data, error } = await supabase
      .from("aws_account_connections")
      .update({
        status: "active",
        aws_account_id: awsAccountId,
        last_validated_at: new Date().toISOString(),
        validation_error: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", connectionId)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data as AwsAccountConnection;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to validate AWS connection.";

    const { data } = await supabase
      .from("aws_account_connections")
      .update({
        status: "error",
        validation_error: message,
        updated_at: new Date().toISOString(),
      })
      .eq("id", connectionId)
      .select("*")
      .single();

    if (data) {
      return data as AwsAccountConnection;
    }

    throw new Error(message);
  }
}

export async function generateReportForConnection(connectionId: string) {
  const supabase = getSupabaseAdminClient();
  const { data: connection, error: fetchError } = await supabase
    .from("aws_account_connections")
    .select("*")
    .eq("id", connectionId)
    .single();

  if (fetchError || !connection) {
    throw new Error("Connection not found.");
  }

  if (!connection.role_arn) {
    throw new Error("Role ARN is required before generating a report.");
  }

  const credentials = await assumeCustomerRole({
    roleArn: connection.role_arn,
    externalId: connection.external_id,
    sessionName: `plaincost-report-${connection.id}`,
  });

  const report = await generatePlaincostReport(credentials);

  const { error: insertError } = await supabase.from("cost_report_snapshots").insert({
    connection_id: connection.id,
    period_start: report.cost.periodStart,
    period_end: report.cost.periodEnd,
    report_data: report,
  });

  if (insertError) {
    throw new Error(insertError.message);
  }

  return report;
}