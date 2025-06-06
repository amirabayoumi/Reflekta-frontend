import HubHeader from "@/components/HubHeader";
import HubFooter from "@/components/HubFooter";
import SectionNav from "@/components/SectionNav";
import EventsClientWrapper from "@/components/EventsClientWrapper";
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
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png",
        width: 1000,
        height: 1000,
        alt: "Community Hub Events",
      },
    ],
  },
};

export default async function EventsPage() {
  let eventsData: EventData[] = [];
  let categoryData: CategoryData[] = [];
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response: Response = await fetch(`${baseUrl}/api/events`, {
      next: { revalidate: 60 },
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
    const response: Response = await fetch(`${baseUrl}/api/categories`, {
      next: { revalidate: 60 },
    });
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
    categories: Array.isArray(event.categories)
      ? event.categories.map((cat) => cat.name)
      : [],
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
      <HubHeader />
      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center">
          Let&apos;s bring people together
        </h1>
      </div>
      <SectionNav />
      <EventsClientWrapper
        initialEvents={formattedEvents}
        categories={categoryData}
        locations={uniqueLocations}
      />
      <HubFooter />
    </div>
  );
}
