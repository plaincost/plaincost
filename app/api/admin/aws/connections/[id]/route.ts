import { NextRequest, NextResponse } from "next/server";
import { parseAwsAccountIdFromRoleArn } from "@/lib/aws/sts";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PATCH(request: NextRequest, context: RouteContext) {
  const { id } = await context.params;

  let body: {
    roleArn?: string;
    contactEmail?: string;
    status?: "pending" | "active" | "error" | "revoked";
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const updates: Record<string, string | null> = {
    updated_at: new Date().toISOString(),
  };

  if (body.roleArn !== undefined) {
    const roleArn = body.roleArn.trim();
    updates.role_arn = roleArn || null;
    updates.aws_account_id = roleArn
      ? parseAwsAccountIdFromRoleArn(roleArn)
      : null;
  }

  if (body.contactEmail !== undefined) {
    updates.contact_email = body.contactEmail.trim().toLowerCase() || null;
  }

  if (body.status !== undefined) {
    updates.status = body.status;
  }

  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("aws_account_connections")
      .update(updates)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ connection: data });
  } catch (error) {
    console.error("Failed to update AWS connection:", error);
    return NextResponse.json(
      { error: "Failed to update AWS connection." },
      { status: 500 },
    );
  }
}