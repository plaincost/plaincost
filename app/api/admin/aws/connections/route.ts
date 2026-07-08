import { NextRequest, NextResponse } from "next/server";
import {
  createAwsConnection,
  listAwsConnections,
} from "@/lib/aws/connections";

export async function GET() {
  try {
    const connections = await listAwsConnections();
    return NextResponse.json({ connections });
  } catch (error) {
    console.error("Failed to list AWS connections:", error);
    return NextResponse.json(
      { error: "Failed to list AWS connections." },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  let body: {
    contactEmail?: string;
    roleArn?: string;
    externalId?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  try {
    const connection = await createAwsConnection(body);
    return NextResponse.json({ connection });
  } catch (error) {
    console.error("Failed to create AWS connection:", error);
    return NextResponse.json(
      { error: "Failed to create AWS connection." },
      { status: 500 },
    );
  }
}