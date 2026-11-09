import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-sprzedaz/klient-nie-odpowiada-na-oferte.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo d={d} />;
}
