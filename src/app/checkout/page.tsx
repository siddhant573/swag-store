import { uiVersion } from "@/ui/version";
import { CheckoutClient } from "./CheckoutClient";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return <CheckoutClient ui={uiVersion()} />;
}
