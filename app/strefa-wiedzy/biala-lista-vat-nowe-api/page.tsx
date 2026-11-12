import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-integracje/biala-lista-vat-nowe-api.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo d={d} />;
}
