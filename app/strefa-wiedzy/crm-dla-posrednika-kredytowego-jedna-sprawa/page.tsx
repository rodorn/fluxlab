import ArtykulWideo, { metadaneArtykuluWideo } from "@/components/ArtykulWideo";
import d from "@/lib/wiedza-wideo/crm-dla-posrednika-kredytowego-jedna-sprawa.json";

export async function generateMetadata() {
  return metadaneArtykuluWideo(d);
}

export default function Page() {
  return <ArtykulWideo d={d} />;
}
