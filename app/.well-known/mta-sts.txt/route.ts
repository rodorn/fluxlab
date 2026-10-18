// Polityka MTA-STS dla poczty fluxlab.pl (Zoho), serwowana pod
// https://mta-sts.fluxlab.pl/.well-known/mta-sts.txt; rekord _mta-sts w DNS OVH.
const POLITYKA = `version: STSv1
mode: enforce
mx: mx.zoho.eu
mx: mx2.zoho.eu
mx: mx3.zoho.eu
max_age: 604800
`;

export function GET() {
  return new Response(POLITYKA, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
