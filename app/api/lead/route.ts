import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs";

type Lead = Record<string, unknown> & { receivedAt: string };

async function saveToFile(lead: Lead) {
  try {
    const dir = path.join(process.cwd(), "data");
    const file = path.join(dir, "leads.json");
    await fs.mkdir(dir, { recursive: true });
    let existing: Lead[] = [];
    try {
      existing = JSON.parse(await fs.readFile(file, "utf8"));
    } catch {
      existing = [];
    }
    existing.push(lead);
    await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");
  } catch (err) {
    // On serverless (read-only FS) file write may fail — that's acceptable,
    // Telegram remains the primary channel.
    console.error("Lead file write failed:", err);
  }
}

async function notifyTelegram(lead: Lead) {
  // TODO: set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID in environment.
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Telegram not configured — skipping notification.");
    return;
  }
  const lines = Object.entries(lead)
    .filter(([k]) => k !== "receivedAt")
    .map(([k, v]) => `*${k}*: ${String(v ?? "—")}`)
    .join("\n");
  const text = `🦷 *Новая заявка — Жуйкан*\n\n${lines}\n\n_${lead.receivedAt}_`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "Markdown",
      }),
    });
  } catch (err) {
    console.error("Telegram notify failed:", err);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const name = String(body.name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "name and phone are required" },
      { status: 422 },
    );
  }

  const lead: Lead = {
    name,
    phone,
    city: body.city ?? "",
    channel: body.channel ?? "",
    message: body.message ?? "",
    source: body.source ?? "unknown",
    receivedAt: new Date().toISOString(),
  };

  await Promise.all([saveToFile(lead), notifyTelegram(lead)]);

  return NextResponse.json({ ok: true });
}
