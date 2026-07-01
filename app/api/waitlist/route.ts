import { promises as fs } from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";

const WAITLIST_PATH = path.join(process.cwd(), "data", "waitlist.json");

type WaitlistEntry = {
  email: string;
  createdAt: string;
};

async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await fs.readFile(WAITLIST_PATH, "utf-8");
    return JSON.parse(raw) as WaitlistEntry[];
  } catch {
    return [];
  }
}

async function writeWaitlist(entries: WaitlistEntry[]): Promise<void> {
  await fs.mkdir(path.dirname(WAITLIST_PATH), { recursive: true });
  await fs.writeFile(WAITLIST_PATH, JSON.stringify(entries, null, 2));
}

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

  const waitlist = await readWaitlist();

  if (waitlist.some((entry) => entry.email === email)) {
    return NextResponse.json(
      { error: "This email is already on the waitlist." },
      { status: 409 },
    );
  }

  waitlist.push({ email, createdAt: new Date().toISOString() });
  await writeWaitlist(waitlist);

  return NextResponse.json({ success: true });
}