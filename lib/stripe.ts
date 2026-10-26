export async function stripe(sciezka: string, body?: URLSearchParams) {
  const r = await fetch(`https://api.stripe.com/v1/${sciezka}`, {
    method: body ? "POST" : "GET",
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      ...(body && { "Content-Type": "application/x-www-form-urlencoded" }),
    },
    body,
  });
  const dane = await r.json();
  if (!r.ok) throw new Error(dane?.error?.message ?? `Stripe ${r.status}`);
  return dane;
}
