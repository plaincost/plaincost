import { NextResponse } from "next/server";
import { validateAwsConnection } from "@/lib/aws/connections";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    const connection = await validateAwsConnection(id);
    return NextResponse.json({ connection });
  } catch (error) {
    console.error("Failed to validate AWS connection:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to validate AWS connection.",
      },
      { status: 500 },
    );
  }
}