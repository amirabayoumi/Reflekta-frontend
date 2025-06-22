"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { ReusableMapProps, CategoryData } from "@/types";
// Dynamically load the map component (no SSR)
// This is necessary to prevent issues with Leaflet in server-side rendering
// environments, as Leaflet relies on the DOM being available.
const MapWithNoSSR = dynamic(
  () => import("@/components/eventsComponents/MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#553a5c]"></div>
          <p className="mt-2 text-gray-500">Loading map...</p>
        </div>
      </div>
    ),
  }
);

export default function ReusableMap({
  events,
  center,
  zoom,
  className = "",
}: ReusableMapProps) {
  const sanitizedEvents = events.map((event) => ({
    ...event,
    categories: Array.isArray(event.categories)
      ? event.categories.map((cat: CategoryData | string) =>
          typeof cat === "string" ? cat : cat.name
        )
      : [],

    location: event.location || "Location TBD",
    startDate: event.start_date || new Date().toISOString(),
  }));

  return (
    <div className={className}>
      <MapWithNoSSR events={sanitizedEvents} center={center} zoom={zoom} />
    </div>
  );
}
