import { NextRequest, NextResponse } from "next/server";
import { listWaitlistSignups } from "@/lib/supabase-admin";

function toCsv(signups: { email: string; created_at: string }[]): string {
  const rows = [
    ["email", "created_at"],
    ...signups.map((signup) => [signup.email, signup.created_at]),
  ];

  return rows
    .map((row) =>
      row
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(","),
    )
    .join("\n");
}

export async function GET(request: NextRequest) {
  try {
    const signups = await listWaitlistSignups();
    const format = request.nextUrl.searchParams.get("format");

    if (format === "csv") {
      const csv = toCsv(signups);
      const timestamp = new Date().toISOString().slice(0, 10);

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv; charset=utf-8",
          "Content-Disposition": `attachment; filename="plaincost-waitlist-${timestamp}.csv"`,
        },
      });
    }

    return NextResponse.json({ signups, total: signups.length });
  } catch (error) {
    console.error("Failed to load waitlist signups:", error);
    return NextResponse.json(
      { error: "Failed to load waitlist signups." },
      { status: 500 },
    );
  }
}