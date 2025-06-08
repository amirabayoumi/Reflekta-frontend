import Link from "next/link";
import type { FormatedEvent } from "@/types";
import { slugit } from "@/helper";

async function fetchEvents(): Promise<FormatedEvent[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
      cache: "no-store",
    });
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch {
    return [];
  }
}

export default async function FeaturedEventsBox() {
  const events = await fetchEvents();

  // Sort by start_date ascending and pick the next 2 events
  const now = new Date();
  const upcoming = [...events]
    .filter((e) => new Date(e.start_date) >= now)
    .sort(
      (a, b) =>
        new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
    )
    .slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#553a5c]">
          Upcoming Events
        </h2>
        <Link
          href="/community-hub/events"
          className="text-sm text-[#886f80] hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {upcoming.length === 0 && (
          <div className="text-gray-500 text-center">No upcoming events</div>
        )}
        {upcoming.map((event) => (
          <div
            key={event.id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <h3 className="font-medium text-gray-700">{event.title}</h3>
            <p className="text-gray-500 text-sm">
              {new Date(event.start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}{" "}
              • {event.location}
            </p>
            <Link
              href={`/community-hub/events/${event.id}/${slugit(event.title)}`}
              className="mt-2 text-[#553a5c] text-sm font-medium hover:underline inline-block"
            >
              Learn more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
