import {
  HandHelping,
  MapPin,
  Clock,
  Filter,
  Search,
  Users,
} from "lucide-react";

// Hardcoded sample data for display only
const helpOffers = [
  {
    id: 1,
    title: "French Language Conversation Partner",
    helper: "Sophie D.",
    location: "Brussels",
    type: "Weekly",
    category: "language",
    posted: "2 days ago",
    commitment: "1 hour per week",
    description:
      "Native French speaker offering conversation practice for newcomers looking to improve their language skills.",
  },
  {
    id: 2,
    title: "Computer Skills Mentoring",
    helper: "Marco B.",
    location: "Antwerp",
    type: "Flexible",
    category: "education",
    posted: "1 week ago",
    commitment: "2 hours per session",
    description:
      "IT professional offering help with basic computer skills - email, internet, word processing, etc.",
  },
];

const helpRequests = [
  {
    id: 101,
    title: "CV Review and Job Application Help",
    requester: "Ahmed M.",
    location: "Brussels",
    category: "career",
    posted: "1 day ago",
    urgency: "Medium",
    description:
      "Looking for someone to review my CV and help me understand how to apply for jobs in Belgium.",
  },
];

const helpCategories = [
  "all",
  "language",
  "translation",
  "education",
  "career",
  "social",
  "transportation",
  "household",
  "childcare",
  "legal",
  "administrative",
];

export default function HelpExchangePage() {
  // No logic, just hardcoded UI with sample data
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12 relative">
        {/* The rest of the page is still visible underneath */}
        <div className="relative z-0">
          <div className="mb-8 flex">
            <button className="flex-1 py-4 px-6 font-medium text-center rounded-tl-lg transition-colors bg-white text-[#553a5c] shadow-md">
              <Users className="inline-block mr-2" size={20} />
              Help Offers
            </button>
            <button className="flex-1 py-4 px-6 font-medium text-center rounded-tr-lg transition-colors bg-[#553a5c]/20 text-gray-700 hover:bg-[#553a5c]/30">
              <HandHelping className="inline-block mr-2" size={20} />
              Help Requests
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search help offers..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
                  value=""
                  readOnly
                />
              </div>

              <div className="flex items-center">
                <Filter size={20} className="text-gray-500 mr-2" />
                <select
                  value="all"
                  className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
                  disabled
                >
                  <option value="all">All Categories</option>
                  {helpCategories
                    .filter((cat) => cat !== "all")
                    .map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                </select>
              </div>

              <button
                className="bg-[#553a5c] text-white px-6 py-3 rounded-lg hover:bg-[#937195] transition-colors"
                disabled
              >
                Offer Help
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {helpOffers.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-xl mb-1 text-[#553a5c]">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">Offered by: {item.helper}</p>
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#553a5c]/10 text-[#553a5c]">
                      {item.type}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 my-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>Posted {item.posted}</span>
                    </div>
                    <div className="flex items-center">
                      <span>⏱️ {item.commitment}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </span>
                    <button
                      className="text-sm bg-[#886f80] text-white px-5 py-2 rounded hover:bg-[#553a5c] transition-colors"
                      disabled
                    >
                      Get Help
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Example for Help Requests, not interactive */}
          <div className="mt-12 space-y-6">
            {helpRequests.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-xl mb-1 text-[#553a5c]">
                        {item.title}
                      </h3>
                      <p className="text-gray-700">
                        Posted by: {item.requester}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700`}
                    >
                      {item.urgency} priority
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-4 my-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>Posted {item.posted}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </span>
                    <button
                      className="text-sm bg-[#886f80] text-white px-5 py-2 rounded hover:bg-[#553a5c] transition-colors"
                      disabled
                    >
                      Offer Support
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Blur overlay only above the container, not the whole layout */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-full h-full bg-black/60 backdrop-blur-[4px] rounded-2xl flex items-center justify-center">
            <div className="text-center w-full">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
                Coming Soon
              </h2>
              <p className="text-lg text-white/80">
                This section will be available soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
