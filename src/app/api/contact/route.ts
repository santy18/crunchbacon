const WEBHOOK_URL =
  process.env.CONTACT_WEBHOOK_URL ??
  "https://n8n.crunchbacon.com/webhook/502a046a-62a0-4c9a-8e62-87739302016a";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      console.error("[contact] webhook responded", res.status, await res.text());
    }
    return Response.json({ ok: res.ok }, { status: res.ok ? 200 : 502 });
  } catch (err) {
    console.error("[contact] webhook request failed", err);
    return Response.json({ ok: false }, { status: 502 });
  }
}
