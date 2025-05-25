import { fetchAllCategories, fetchAllEvents } from "@/queries";
import HubHeader from "@/app/components/HubHeader";
import HubFooter from "@/app/components/HubFooter";
import SectionNav from "@/app/components/SectionNav";
import EventsClientWrapper from "@/app/components/EventsClientWrapper";
import type { CategoryData, EventData, Events, Categories , FormatedEvent} from "@/types";


export default async function EventsPage() {
  let eventsData: EventData[] = [];
  let categoryData: CategoryData[] = [];

  try {
    const eventsResponse: EventData[] | Events | undefined =
      await fetchAllEvents();
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
    const categoryResponse: CategoryData[] | Categories | undefined =
      await fetchAllCategories();

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
          categoryData = categoryResponse as CategoryData[];
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
