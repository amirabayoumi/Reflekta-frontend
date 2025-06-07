import { notFound } from "next/navigation";
import { fetchEventById } from "@/queries";
// import { slugit } from "@/helper";

import { Calendar, Clock, MapPin, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import TicketGenerator from "@/components/eventsComponents/TicketGenerator";
import ReusableMap from "@/components/eventsComponents/ReusableMap";
import type { EventData } from "@/types";
import type { Metadata } from "next";
// import { slugit } from "@/helper";
export const dynamicParams = true;
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

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
  const resp = (await fetchEventById(id)) as { data: EventData } | undefined;
  if (!id || !slug) {
    return {
      title: "Event Details",
      description: "reflekta - Community Hub - Event Details",
      openGraph: {
        title: "Event Details",
        description: "reflekta - Community Hub - Event Details",
        siteName: "reflekta",
        images: [
          {
            url: "https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png",
            width: 1200,
            height: 630,
            alt: "Event Details",
          },
        ],
      },
    };
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
  }
  return {
    title: ` ${resp?.data?.title}-Event Details`,

    openGraph: {
      title: `Reflekta - Community Hub - Event Details - ${resp?.data?.title}`,

      siteName: "Reflekta",
      images: [
        {
          url: `https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png`,
          width: 1200,
          height: 630,
          alt: `Event Details`,
        },
      ],
      type: "website",
    },
  };
};

const page = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;

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

  const categories = Array.isArray(eventData.categories)
    ? eventData.categories.map((cat) =>
        typeof cat === "string" ? cat : cat.name ?? "general"
      )
    : [];

  const event: EventData = {
    ...eventData,
    categories: categories.map((name) => ({
      id: 0,
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

  const mapEvent = [event];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
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
                  <MapPin size={16} className="mr-3 text-[#937195]" />
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
                  zoom={14} // Closer zoom for a single event
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

            <TicketGenerator event={event} />
          </div>
        </div>
      </div>
    </div>
  );
};
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export async function generateStaticParams(): Promise<PageParams[]> {
//   try {
//     const response = await fetch(`${baseUrl}/api/events`);

//     if (!response.ok) {
//       console.error(
//         `Failed to fetch events: ${response.status} ${response.statusText}`
//       );
//       return [];
//     }

//     const events = await response.json();
//     if (!events || !Array.isArray(events)) {
//       return [];
//     }

//     return events.map((event) => ({
//       id: String(event.id),
//       slug: slugit(event.title),
//     }));
//   } catch (err) {
//     console.error("Error in generateStaticParams:", err);
//     return [];
//   }
// }

export default page;
