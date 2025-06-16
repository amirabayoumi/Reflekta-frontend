import CommunitySections from "../../components/communityComponents/CommunitySections";
import UserProfileSummary from "../../components/communityComponents/UserProfileSummary";
import FeaturedEventsBox from "@/components/communityComponents/FeaturedEventsBox";
import FeaturedStoriesBox from "@/components/communityComponents/FeaturedStoriesBox";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community Hub | Reflekta",
  description: "Explore the community hub for events, stories, and more.",
  openGraph: {
    title: "Community Hub | Reflekta",
    description: "Explore the community hub for events, stories, and more.",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1749149982/Untitled_design_vrodpv.png",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function CommunityHub() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <UserProfileSummary />
          <FeaturedEventsBox />
          <FeaturedStoriesBox />
        </div>
        <CommunitySections />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              5,000+
            </div>
            <div className="text-gray-600">Community Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              20+
            </div>
            <div className="text-gray-600">Monthly Events</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              3,200+
            </div>
            <div className="text-gray-600">Help Requests</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="text-3xl font-semibold text-[#553a5c] mb-2">
              2,500+
            </div>
            <div className="text-gray-600">Stories Shared</div>
          </div>
        </div>
      </div>
    </div>
  );
}
