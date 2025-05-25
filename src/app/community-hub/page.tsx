"use client";

import Link from "next/link";
import HubFooter from "@/app/components/HubFooter";
import HubHeader from "../components/HubHeader";
import CommunitySections from "../components/CommunitySections";
import UserProfileSummary from "../components/UserProfileSummary";
import SectionNav from "../components/SectionNav";

const CommunityHub = () => {
  const featuredEvents = [
    {
      id: 1,
      title: "Multicultural Festival",
      date: "Dec 15, 2023",
      image: "/events/photography.jpg",
      attendees: 24,
    },
    {
      id: 2,
      title: "Story Circle: My Journey to Belgium",
      date: "Dec 20, 2023",
      image: "/events/writing.jpg",
      attendees: 18,
    },
  ];

  const featuredHelp = [
    {
      id: 1,
      title: "Dutch Language Conversation Partner",
      helper: "Jan V.",
      type: "Weekly",
    },
    {
      id: 2,
      title: "School Enrollment Assistance",
      helper: "Marie D.",
      type: "As needed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center"> Community Hub</h1>
      </div>
      <SectionNav />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <UserProfileSummary />
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#553a5c]">
                Featured Events
              </h2>
              <Link
                href="/community-hub/events"
                className="text-sm text-[#886f80] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {featuredEvents.map((event) => (
                <div
                  key={event.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <h3 className="font-medium text-gray-700">{event.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {event.date} • {event.attendees} attending
                  </p>
                  <button className="mt-2 text-[#553a5c] text-sm font-medium hover:underline">
                    Learn more
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-[#553a5c]">
                Help & Be Helped
              </h2>
              <Link
                href="/community-hub/help"
                className="text-sm text-[#886f80] hover:underline"
              >
                View all
              </Link>
            </div>
            <div className="space-y-4">
              {featuredHelp.map((help) => (
                <div
                  key={help.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <h3 className="font-medium text-gray-700">{help.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {help.helper} • {help.type}
                  </p>
                  <button className="mt-2 text-[#553a5c] text-sm font-medium hover:underline">
                    Learn more
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200 text-center">
              <Link
                href="/community-hub/help"
                className="bg-[#886f80]/10 text-[#553a5c] px-4 py-2 rounded-md hover:bg-[#886f80]/20 transition-colors inline-block"
              >
                + Offer Help
              </Link>
            </div>
          </div>
        </div>

        <CommunitySections />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              15,000+
            </div>
            <div className="text-gray-600">Community Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              750+
            </div>
            <div className="text-gray-600">Monthly Events</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              3,200+
            </div>
            <div className="text-gray-600">Jobs Posted</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              48,000+
            </div>
            <div className="text-gray-600">Stories Shared</div>
          </div>
        </div>
      </div>

      <HubFooter />
    </div>
  );
};

export default CommunityHub;
