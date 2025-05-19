"use client";
import { useState } from "react";
import HubHeader from "@/app/components/HubHeader";
import HubFooter from "@/app/components/HubFooter";
import SectionNav from "@/app/components/SectionNav";
import {
  MapPin,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";


const MapWithNoSSR = dynamic(
  () => import("@/app/components/MapComponent"),
  {
    ssr: false,
    loading: () => (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#553a5c]"></div>
          <p className="mt-2 text-gray-500">Loading map...</p>
        </div>
      </div>
    ),
  }
);

const EventsPage = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [query, setQuery] = useState("");
  const [mapExpanded, setMapExpanded] = useState(true);
  const [mapKey, setMapKey] = useState(0); // Key to force map re-render

  const eventsData = [
    {
      id: 1,
      title: "Multicultural Festival",
      description:
        "A celebration of diversity with music, food, and art from around the world.",
      location: "Brussels",
      latitude: 50.8503,
      longitude: 4.3517,
      start_date: "2023-12-15T10:00:00",
      end_date: "2023-12-15T22:00:00",
      organizer: "Brussels Cultural Center",
      categories: ["festival", "cultural", "networking"],
      image: "/events/festival.jpg",
      attendees: 24,
    },
    {
      id: 2,
      title: "Story Circle: My Journey",
      description:
        "Share your migration stories and connect with others through narrative.",
      location: "Antwerp",
      latitude: 51.2194,
      longitude: 4.4024,
      start_date: "2023-12-20T18:30:00",
      end_date: "2023-12-20T21:00:00",
      organizer: "Antwerp Community Hub",
      categories: ["workshop", "cultural"],
      image: "/events/workshop.jpg",
      attendees: 18,
    },
    {
      id: 3,
      title: "Language Exchange Meetup",
      description:
        "Practice languages and make new friends in this casual gathering.",
      location: "Ghent",
      latitude: 51.0543,
      longitude: 3.7174,
      start_date: "2024-01-05T14:00:00",
      end_date: "2024-01-05T17:00:00",
      organizer: "Multilingual Society",
      categories: ["networking", "cultural"],
      image: "/events/networking.jpg",
      attendees: 30,
    },
    {
      id: 4,
      title: "Professional Development Workshop",
      description:
        "Develop skills for the Belgian job market with expert guidance.",
      location: "Liège",
      latitude: 50.6056,
      longitude: 5.4439,
      start_date: "2024-01-12T09:00:00",
      end_date: "2024-01-12T16:00:00",
      organizer: "Career Connect Belgium",
      categories: ["workshop", "networking"],
      image: "/events/workshop2.jpg",
      attendees: 15,
    },
  ];

  const filteredEvents = eventsData.filter((event) => {
    return (
      (category === "all" || event.categories.includes(category)) &&
      (location === "all" || event.location === location) &&
      (query === "" ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()))
    );
  });

  // Format date for display
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const categories = ["all", "festival", "workshop", "networking", "cultural"];
  const locations = ["all", "Brussels", "Antwerp", "Ghent", "Liège"];

  // Find center of map based on events
  const getMapCenter = (): [number, number] => {
    if (filteredEvents.length === 0) {
      return [50.8503, 4.3517]; // Default to Brussels
    }
    const latSum = filteredEvents.reduce(
      (sum, event) => sum + event.latitude,
      0
    );
    const lngSum = filteredEvents.reduce(
      (sum, event) => sum + event.longitude,
      0
    );
    return [latSum / filteredEvents.length, lngSum / filteredEvents.length];
  };

  const toggleMap = () => {
    setMapExpanded(!mapExpanded);
    // Force map to re-render when expanded
    if (!mapExpanded) {
      setTimeout(() => setMapKey((prevKey) => prevKey + 1), 100);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center">
          Let&apos;s bring people together
        </h1>
      </div>
      <SectionNav />
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Filter size={20} className="text-gray-500 mr-2" />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              >
                <option value="all">All Categories</option>
                {categories
                  .filter((cat) => cat !== "all")
                  .map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center">
              <MapPin size={20} className="text-gray-500 mr-2" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              >
                <option value="all">All Locations</option>
                {locations
                  .filter((loc) => loc !== "all")
                  .map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Collapsible Map Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 transition-all duration-300">
          <div
            className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
            onClick={toggleMap}
          >
            <h2 className="text-xl font-semibold text-[#553a5c]">
              Event Locations Map
            </h2>
            <button className="text-gray-600 hover:text-[#553a5c] transition-colors focus:outline-none">
              {mapExpanded ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              mapExpanded ? "h-[400px]" : "h-0"
            }`}
          >
            {mapExpanded && (
              <div className="h-full w-full">
                <MapWithNoSSR
                  key={mapKey}
                  events={filteredEvents.map(({ start_date, ...rest }) => ({
                    ...rest,
                    startDate: start_date,
                  }))}
                  center={getMapCenter()}
                  zoom={8}
                />
              </div>
            )}
          </div>
        </div>

        {/* Events Grid - Now full width */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-[#553a5c] mb-4">
            Upcoming Events
          </h2>

          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <div className="h-40 bg-gray-300 relative">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#553a5c]/30 to-[#937195]/30">
                      <span className="text-lg font-medium text-white">
                        {event.categories.join(", ")}
                      </span>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-[#553a5c] text-white px-3 py-1 text-sm">
                      {event.attendees} attending
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-lg mb-1 text-[#553a5c]">
                      {event.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar size={14} className="mr-1" />
                      <span>{formatDate(event.start_date)}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">
                      {event.description}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      <strong>Organizer:</strong> {event.organizer}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex flex-wrap gap-1">
                        {event.categories.map((cat) => (
                          <span
                            key={cat}
                            className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                      <button className="text-sm bg-[#886f80] text-white px-4 py-1 rounded hover:bg-[#553a5c] transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500 text-lg">
                No events match your current filters
              </p>
              <button
                onClick={() => {
                  setCategory("all");
                  setLocation("all");
                  setQuery("");
                }}
                className="mt-4 text-[#553a5c] hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-8 text-center">
            <button className="bg-[#553a5c] text-white px-6 py-3 rounded-lg hover:bg-[#937195] transition-colors">
              Create New Event
            </button>
          </div>
        </div>
      </div>

      <HubFooter />
    </div>
  );
};

export default EventsPage;
