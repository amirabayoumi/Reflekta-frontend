"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  MapPin,
  Calendar,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import type { EventData, EventsClientWrapperProps } from "@/types";
import ReusableMap from "@/components/eventsComponents/ReusableMap";
import { slugit } from "@/helper";
import { useRouter, usePathname } from "next/navigation";

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

// Calculate average center point for map
const getMapCenter = (events: EventData[]): [number, number] => {
  if (!events.length) return [50.8503, 4.3517]; // Brussels
  const lat = events.reduce((sum, e) => sum + e.latitude, 0) / events.length;
  const lng = events.reduce((sum, e) => sum + e.longitude, 0) / events.length;
  return [lat, lng];
};

export default function EventsClientWrapper({
  initialEvents,
  categories = [],
  initialLocationFilter,
  initialCategoryFilter,
}: EventsClientWrapperProps) {
  const router = useRouter();
  const pathname = usePathname();

  // State for filters
  const [locationFilter, setLocationFilter] = useState<string | undefined>(
    initialLocationFilter || "all"
  );
  const [categoryFilter, setCategoryFilter] = useState<string | undefined>(
    initialCategoryFilter || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [mapExpanded, setMapExpanded] = useState(true);
  const [mapKey, setMapKey] = useState(0);

  // Use categories directly
  const displayCategories = categories.length
    ? categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
      }))
    : [{ id: 1, name: "General" }];

  // Extract just the cities for the location filter
  const belgianCities = [
    "Antwerp",
    "Gent",
    "Leuven",
    "Brugge",
    "Mechelen",
    "Liège",
    "Namur",
    "Charleroi",
    "Mons",
    "Spa",
    "Brussels",
  ];

  // Filter events based on current filter state
  const filteredEvents = initialEvents.filter((event) => {
    const matchesCategory =
      categoryFilter === "all" ||
      event.categories.some((cat) =>
        typeof cat === "string"
          ? cat === categoryFilter
          : cat.name === categoryFilter
      );

    // More precise city matching - check for city name at the beginning or after a comma
    const matchesLocation =
      locationFilter === "all" ||
      (event.location &&
        (event.location.toLowerCase() === locationFilter?.toLowerCase() || // Exact match
          event.location
            .toLowerCase()
            .startsWith(locationFilter?.toLowerCase() + ",") || // City at start
          event.location
            .toLowerCase()
            .includes(", " + locationFilter?.toLowerCase()))); // City after comma

    const matchesQuery =
      !searchQuery ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesLocation && matchesQuery;
  });

  const toggleMap = () => {
    setMapExpanded(!mapExpanded);
    if (!mapExpanded) {
      setTimeout(() => setMapKey((prev) => prev + 1), 100);
    }
  };

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (locationFilter && locationFilter !== "all") {
      params.set("location", locationFilter);
    }

    if (categoryFilter && categoryFilter !== "all") {
      params.set("category", categoryFilter);
    }

    const queryString = params.toString();
    const url = queryString
      ? `${String(pathname)}?${queryString}`
      : String(pathname);

    // Use replace to avoid creating new history entries for every filter change
    router.replace(url, { scroll: false });
  }, [locationFilter, categoryFilter, pathname, router]);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative flex-grow">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="flex items-center">
            <Filter size={20} className="text-gray-500 mr-2" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)} // THIS LINE WAS WRONG
              className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
            >
              <option value="all">All Categories</option>
              {displayCategories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Location - Updated to only show cities */}
          <div className="flex items-center">
            <MapPin size={20} className="text-gray-500 mr-2" />
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
            >
              <option value="all">All Locations</option>
              {belgianCities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 transition-all duration-300">
        <div
          className="p-4 border-b border-gray-200 flex justify-between items-center cursor-pointer"
          onClick={toggleMap}
        >
          <h2 className="text-xl font-semibold text-[#553a5c]">
            Events Locations Map
          </h2>
          {mapExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
        <div
          className={`transition-all duration-300 ease-in-out overflow-hidden ${
            mapExpanded ? "h-[400px]" : "h-0"
          }`}
        >
          {mapExpanded && (
            <ReusableMap
              key={mapKey}
              events={filteredEvents}
              center={getMapCenter(filteredEvents)}
              zoom={7}
              className="h-full w-full"
            />
          )}
        </div>
      </div>

      {/* Events Grid */}
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
                {/* <div className="h-40 bg-gray-300 relative">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#553a5c]/30 to-[#937195]/30">
                    <span className="text-lg font-medium text-white text-center px-3 max-w-[90%] truncate">
                      {event.categories.length > 2
                        ? `${event.categories
                            .slice(0, 2)
                            .map((cat) =>
                              typeof cat === "string" ? cat : cat.name
                            )
                            .join(", ")} +${event.categories.length - 2}`
                        : event.categories
                            .map((cat) =>
                              typeof cat === "string" ? cat : cat.name
                            )
                            .join(", ")}
                    </span>
                  </div>
                </div> */}
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
                    {event.description?.length > 100
                      ? `${event.description.substring(0, 100)}...`
                      : event.description}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">
                    <strong>Organizer:</strong> {event.organizer}
                  </p>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <div className="flex flex-wrap gap-1 max-w-full sm:max-w-[65%]">
                      {event.categories.map((cat, index) => (
                        <span
                          key={
                            typeof cat === "string"
                              ? `string-${index}`
                              : cat.id || `generated-${index}`
                          }
                          className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded inline-block mb-1"
                        >
                          {typeof cat === "string" ? cat : cat.name}
                        </span>
                      ))}
                    </div>
                    <Link
                      href={`/community-hub/events/${event.id}/${slugit(
                        event.title
                      )}`}
                      className="text-sm bg-[#886f80] text-white px-4 py-1 rounded hover:bg-[#553a5c] transition-colors whitespace-nowrap"
                    >
                      View Details
                    </Link>
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
                setCategoryFilter("all");
                setLocationFilter("all");
                setSearchQuery("");
              }}
              className="mt-4 text-[#553a5c] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
