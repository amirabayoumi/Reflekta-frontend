"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { EventData, CategoryData } from "@/types";
// Dynamically load the map component (no SSR)
const MapWithNoSSR = dynamic(() => import("@/components/eventsComponents/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#553a5c]"></div>
        <p className="mt-2 text-gray-500">Loading map...</p>
      </div>
    </div>
  ),
});

interface ReusableMapProps {
  events: EventData[]; // Using any[] for flexibility, can be typed more strictly
  center: [number, number];
  zoom: number;
  className?: string;
}

export default function ReusableMap({
  events,
  center,
  zoom,
  className = "",
}: ReusableMapProps) {
  // Ensure each event has the required properties, especially categories
  const sanitizedEvents = events.map((event) => ({
    ...event,
    // Ensure categories is always an array of strings (e.g., category names)
    categories: Array.isArray(event.categories)
      ? event.categories.map((cat: CategoryData | string) =>
          typeof cat === "string" ? cat : cat.name
        )
      : [],
    // Ensure other required properties have defaults
    location: event.location || "Location TBD",
    startDate: event.start_date || new Date().toISOString(),
  }));

  return (
    <div className={className}>
      <MapWithNoSSR events={sanitizedEvents} center={center} zoom={zoom} />
    </div>
  );
}
