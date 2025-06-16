import EventsClientWrapper from "@/components/eventsComponents/EventsClientWrapper";
import { Metadata } from "next";
import type { CategoryData, EventData, FormatedEvent } from "@/types";

export const metadata: Metadata = {
  title: "Events - Community Hub ",
  description: "Community Hub - Events",
  openGraph: {
    title: "Reflekta - Community Hub - Events",
    description: "Explore events in the community hub",
    siteName: "Reflekta",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png",
        width: 1000,
        height: 1000,
        alt: "Community Hub Events",
      },
    ],
  },
};

const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;

type SearchParams = {
  location?: string;
  category?: string;
};

export default async function EventsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  let eventsData: EventData[] = [];
  let categoryData: CategoryData[] = [];
  const locationFilter = resolvedSearchParams?.location;
  const categoryFilter = resolvedSearchParams?.category;

  try {
    let eventsUrl = "https://inputoutput.be/api/events";

    if (locationFilter) {
      eventsUrl += `?location=${encodeURIComponent(locationFilter)}`;
    }

    const response: Response = await fetch(eventsUrl, {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });
    const eventsResponse: EventData[] = await response.json();
    if (eventsResponse) {
      if (Array.isArray(eventsResponse)) {
        eventsData = eventsResponse;
      } else if (
        typeof eventsResponse === "object" &&
        eventsResponse !== null
      ) {
        if (
          "data" in eventsResponse &&
          Array.isArray((eventsResponse as { data?: EventData[] }).data)
        ) {
          eventsData = (eventsResponse as { data: EventData[] }).data || [];
        } else {
          eventsData = eventsResponse;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching events:", error);
  }

  try {
    const response: Response = await fetch(
      "https://inputoutput.be/api/categories",
      {
        next: { revalidate: 60 },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      }
    );
    const categoryResponse: CategoryData[] = await response.json();

    if (categoryResponse) {
      if (Array.isArray(categoryResponse)) {
        categoryData = categoryResponse;
      } else if (
        typeof categoryResponse === "object" &&
        categoryResponse !== null
      ) {
        if (
          "data" in categoryResponse &&
          Array.isArray((categoryResponse as { data?: CategoryData[] }).data)
        ) {
          categoryData =
            (categoryResponse as { data: CategoryData[] }).data || [];
        } else {
          categoryData = categoryResponse;
        }
      }
      console.log("Fetched categories:", categoryData);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  const formattedEvents: FormatedEvent[] = eventsData.map((event) => ({
    id: event.id,
    title: event.title,
    description: event.description,
    location: event.location,
    latitude: event.latitude,
    longitude: event.longitude,
    start_date: event.start_date,
    end_date: event.end_date,
    organizer: event.organizer,
    categories: Array.isArray(event.categories) ? event.categories : [],
    created_at: event.created_at,
    updated_at: event.updated_at,
  }));

  const uniqueLocations = Array.from(
    formattedEvents
      .map((event) => event.location)
      .filter(
        (location): location is string =>
          location !== null && location !== undefined
      )
      .reduce((set, location) => set.add(location), new Set<string>())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <EventsClientWrapper
        initialEvents={formattedEvents}
        categories={categoryData}
        locations={uniqueLocations}
        initialLocationFilter={locationFilter}
        initialCategoryFilter={categoryFilter}
      />
    </div>
  );
}
