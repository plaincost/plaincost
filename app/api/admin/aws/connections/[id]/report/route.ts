import { NextResponse } from "next/server";
import { generateReportForConnection } from "@/lib/aws/connections";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const report = await generateReportForConnection(id);
    return NextResponse.json({ report });
  } catch (error) {
    console.error("Failed to generate AWS report:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to generate AWS report.",
      },
      { status: 500 },
    );
  }
}