import { permanentRedirect } from "next/navigation";

export default function LegacySponsorPage() {
  permanentRedirect("/sponsors");
}
