

import CommunitySections from "../../components/communityComponents/CommunitySections";
import UserProfileSummary from "../../components/communityComponents/UserProfileSummary";
import FeaturedEventsBox from "@/components/communityComponents/FeaturedEventsBox";
import FeaturedStoriesBox from "@/components/communityComponents/FeaturedStoriesBox";


export default function CommunityHub() {
 
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <UserProfileSummary />
          <FeaturedEventsBox  />
          <FeaturedStoriesBox  />
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
    </div>
  );
}
