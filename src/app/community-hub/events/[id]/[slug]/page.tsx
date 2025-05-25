import { notFound } from "next/navigation";
import { fetchEventById } from "@/queries";
import HubHeader from "@/app/components/HubHeader";
import HubFooter from "@/app/components/HubFooter";
import SectionNav from "@/app/components/SectionNav";
import { Calendar, Clock, MapPin, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
// import EventLocationMap from "@/app/components/EventLocationMap";
// import EventMapSection from "@/app/components/EventMapSection";
import JoinEventButton from "@/app/components/JoinEventButton";
import ReusableMap from "@/app/components/ReusableMap";
import type { EventData } from "@/types";
import type { Metadata } from "next";
export const dynamicParams = true;

interface PageParams {
  id: string;
  slug: string;
}
export const generateMetadata = async ({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> => {
  const { id, slug } = await params;
  if (!id || !slug) {
    return {
      title: "Event Details",
      description: "Detailed information about the event",
    };
  }
  return {
    title: "Event Details",
    description: "Detailed information about the event",
    openGraph: {
      title: "Event Details",
      description: "Detailed information about the event",
      siteName: "Community Hub",
      images: [
        {
          url: "/images/event-details-og.jpg",
          width: 1200,
          height: 630,
          alt: "Event Details",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Event Details",
      description: "Detailed information about the event",
      images: ["/images/event-details-og.jpg"],
    },
  };
};

/**
 * Renders the Event Details Page.
 *
 * This page fetches and displays detailed information about a specific event
 * identified by the provided `id` and `slug` parameters. It includes the event's
 * title, date, time, location, organizer, categories, and description. The page
 * also provides a map view of the event location and a button to join the event.
 *
 * @param params Object containing the event `id` and `slug`.
 */

const page = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;
  // Fetch data from API
  const rawEvent = (await fetchEventById(id)) as
    | { data: EventData | EventData[] }
    | undefined;

  if (!rawEvent || !rawEvent.data) {
    notFound();
  }

  // Normalize data
  let eventData = rawEvent.data;

  if (Array.isArray(eventData)) {
    eventData =
      eventData.find((e) => String(e.id) === String(id)) ?? eventData[0];
  }

  if (!eventData) {
    notFound();
  }

  // Clean categories to ensure strings or fallback
  const categories = Array.isArray(eventData.categories)
    ? eventData.categories.map((cat) =>
        typeof cat === "string" ? cat : cat.name ?? "general"
      )
    : [];

  const event: EventData = {
    ...eventData,
    categories: categories.map((name) => ({
      id: 0, // fallback, ideally you should pass actual ID
      name,
      created_at: "",
      updated_at: "",
    })),
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateDuration = () => {
    if (!event.end_date) return "Single day";
    const startDate = new Date(event.start_date);
    const endDate = new Date(event.end_date);
    const days = Math.ceil(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return days <= 1 ? "1 day" : `${days} days`;
  };

  // Create a single event array for the map
  const mapEvent = [event];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />
      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center">Community Events</h1>
      </div>
      <SectionNav />

      <div className="container mx-auto px-4 py-8">
        <Link
          href="/community-hub/events"
          className="inline-flex items-center text-[#553a5c] hover:text-[#937195] mb-6"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Events
        </Link>

        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative w-full h-64 md:h-80">
            <div className="w-full h-full bg-gradient-to-r from-[#553a5c] to-[#937195] flex items-center justify-center">
              <h1 className="text-4xl font-bold text-white text-center px-6">
                {event.title}
              </h1>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <h2 className="text-3xl font-bold text-[#553a5c] mb-3">
              {event.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar size={20} className="mr-3 text-[#937195]" />
                  <div>
                    <p className="font-medium">Date</p>
                    <p className="text-gray-600">
                      {formatDate(event.start_date)}
                    </p>
                    {event.end_date && event.end_date !== event.start_date && (
                      <p className="text-gray-600">
                        to {formatDate(event.end_date)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock size={20} className="mr-3 text-[#937195]" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600">
                      {formatTime(event.start_date)}
                    </p>
                    {event.end_date && (
                      <p className="text-gray-600">
                        Duration: {calculateDuration()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin size={20} className="mr-3 text-[#937195]" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600">{event.location}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User size={20} className="mr-3 text-[#937195]" />
                  <div>
                    <p className="font-medium">Organizer</p>
                    <p className="text-gray-600">
                      {event.organizer || "Community Member"}
                    </p>
                  </div>
                </div>

                {categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {categories.map((category) => (
                      <span
                        key={category}
                        className="px-3 py-1 bg-[#f3edf7] text-[#553a5c] text-sm rounded-full"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="h-[300px] rounded-lg overflow-hidden shadow-md">
                <ReusableMap
                  events={mapEvent}
                  center={[event.latitude, event.longitude]}
                  zoom={20} // Closer zoom for a single event
                  className="h-full w-full"
                />
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-3">
                Description
              </h3>
              <div className="prose max-w-none text-gray-700">
                {event.description ? (
                  <p className="whitespace-pre-line">{event.description}</p>
                ) : (
                  <p className="text-gray-500 italic">
                    No description provided
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 mt-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="text-gray-600">
                  Share this event with friends and family who might be
                  interested.
                </p>
                <JoinEventButton eventId={event.id} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <HubFooter />
    </div>
  );
};

export default page;
