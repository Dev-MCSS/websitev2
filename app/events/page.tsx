import type { Metadata } from "next";
import InnerPageShell from "../components/InnerPageShell";
import InnerPageSection from "../components/InnerPageSection";
import EventsGallery from "./EventsGallery";

export const metadata: Metadata = {
  title: "Events — MCSS",
  description: "Explore photographs from MCSS events and celebrations.",
};

export default function EventsPage() {
  return (
    <InnerPageShell tone="rose">
      <InnerPageSection title="Events" titleId="events-title">
        <EventsGallery />
      </InnerPageSection>
    </InnerPageShell>
  );
}
