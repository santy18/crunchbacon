export async function POST(request: Request) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error("[contact] CONTACT_WEBHOOK_URL is not set");
    return Response.json({ ok: false }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  try {
    const res = await fetch(webhookUrl, {
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
