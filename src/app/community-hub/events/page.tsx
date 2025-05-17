"use client";
import { useState } from "react";
import HubHeader from "@/app/components/HubHeader";
import HubFooter from "@/app/components/HubFooter";
import SectionNav from "@/app/components/SectionNav";
import { MapPin, Calendar, Filter, Search } from "lucide-react";

const EventsPage = () => {
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");
  const [query, setQuery] = useState("");

  const eventsData = [
    {
      id: 1,
      title: "Multicultural Festival",
      category: "festival",
      location: "Brussels",
      coordinates: [4.3517, 50.8503],
      date: "Dec 15, 2023",
      image: "/events/festival.jpg",
      attendees: 24,
      description:
        "A celebration of diversity with music, food, and art from around the world.",
    },
    {
      id: 2,
      title: "Story Circle: My Journey",
      category: "workshop",
      location: "Antwerp",
      coordinates: [4.4024, 51.2194],
      date: "Dec 20, 2023",
      image: "/events/workshop.jpg",
      attendees: 18,
      description:
        "Share your migration stories and connect with others through narrative.",
    },
    {
      id: 3,
      title: "Language Exchange Meetup",
      category: "networking",
      location: "Ghent",
      coordinates: [3.7174, 51.0543],
      date: "Jan 5, 2024",
      image: "/events/networking.jpg",
      attendees: 30,
      description:
        "Practice languages and make new friends in this casual gathering.",
    },
    {
      id: 4,
      title: "Professional Development Workshop",
      category: "workshop",
      location: "Brussels",
      coordinates: [4.3517, 50.8503],
      date: "Jan 12, 2024",
      image: "/events/workshop2.jpg",
      attendees: 15,
      description:
        "Develop skills for the Belgian job market with expert guidance.",
    },
  ];

  const filteredEvents = eventsData.filter((event) => {
    return (
      (category === "all" || event.category === category) &&
      (location === "all" || event.location === location) &&
      (query === "" ||
        event.title.toLowerCase().includes(query.toLowerCase()) ||
        event.description.toLowerCase().includes(query.toLowerCase()))
    );
  });

  const categories = ["all", "festival", "workshop", "networking", "cultural"];
  const locations = ["all", "Brussels", "Antwerp", "Ghent", "Liège"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center"> Let&apos;s bring people together</h1>
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md overflow-hidden h-[500px] lg:h-auto">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-[#553a5c]">
                Event Locations
              </h2>
            </div>
            <div className="h-[500px] relative">
              <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="text-gray-600 mb-2">
                    Map would be displayed here
                  </p>
                  <p className="text-gray-500 text-sm">
                    Using Mapbox or Google Maps API
                  </p>
                  {filteredEvents.map((event) => (
                    <div
                      key={event.id}
                      className="mt-2 flex items-center text-sm text-gray-700"
                    >
                      <MapPin size={14} className="mr-1" />
                      <span>
                        {event.location}: {event.coordinates.join(", ")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-[#553a5c] mb-4">
              Upcoming Events
            </h2>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-40 bg-gray-300 relative">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#553a5c]/30 to-[#937195]/30">
                        <span className="text-lg font-medium text-white">
                          {event.category}
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
                        <span>{event.date}</span>
                        <span className="mx-2">•</span>
                        <MapPin size={14} className="mr-1" />
                        <span>{event.location}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {event.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 px-2 py-1 bg-gray-100 rounded">
                          {event.category}
                        </span>
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
      </div>

      <HubFooter />
    </div>
  );
};

export default EventsPage;

