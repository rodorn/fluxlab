import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-sprzedaz/spotkanie-z-klientem-przygotowanie.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo d={d} />;
}
