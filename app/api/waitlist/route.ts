import { track } from "@vercel/analytics/server";
import { NextRequest, NextResponse } from "next/server";
import { sendWaitlistConfirmationEmail } from "@/lib/resend";
import { getSupabaseServerClient } from "@/lib/supabase";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  let body: { email?: string };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();

  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  let supabase;

  try {
    supabase = getSupabaseServerClient();
  } catch {
    console.error("Waitlist API: Supabase is not configured.");
    return NextResponse.json(
      { error: "Waitlist is temporarily unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const { error } = await supabase.from("waitlist_signups").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "This email is already on the waitlist." },
        { status: 409 },
      );
    }

    console.error("Waitlist insert failed:", error.message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  await track("Waitlist Signup");

  const emailResult = await sendWaitlistConfirmationEmail(email);

  if (!emailResult.sent) {
    console.warn(
      `Waitlist signup saved for ${email}, but confirmation email was not sent.`,
    );
  }

  return NextResponse.json({ success: true });
}