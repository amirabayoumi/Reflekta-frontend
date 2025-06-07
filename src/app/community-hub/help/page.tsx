"use client";
import { useState } from "react";

import {
  HandHelping,
  MapPin,
  Clock,
  Filter,
  Search,
  Users,
} from "lucide-react";

const HelpExchangePage = () => {
  const [activeTab, setActiveTab] = useState("offers");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showPostForm, setShowPostForm] = useState(false);

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
    {
      id: 3,
      title: "Document Translation Assistance",
      helper: "Amina K.",
      location: "Ghent",
      type: "As needed",
      category: "translation",
      posted: "3 days ago",
      commitment: "Depends on document length",
      description:
        "Can help translate documents from Arabic to Dutch or French for official purposes.",
    },
    {
      id: 4,
      title: "Local Culture Orientation",
      helper: "Jan V.",
      location: "Brussels",
      type: "Weekend",
      category: "social",
      posted: "5 days ago",
      commitment: "Half day",
      description:
        "Long-time local offering to show newcomers around the city, explain customs, and answer questions about Belgian life.",
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
    {
      id: 102,
      title: "Dutch Language Practice Partner",
      requester: "Maria S.",
      location: "Antwerp",
      category: "language",
      posted: "4 days ago",
      urgency: "Low",
      description:
        "Seeking a native Dutch speaker for weekly conversations to improve my language skills.",
    },
    {
      id: 103,
      title: "Help Understanding School Enrollment",
      requester: "Fatima H.",
      location: "Online",
      category: "education",
      posted: "2 days ago",
      urgency: "High",
      description:
        "Need help understanding how to enroll my children in local schools and what documents I need to prepare.",
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
  const currentList = activeTab === "offers" ? helpOffers : helpRequests;

  const filteredHelp = currentList.filter((item) => {
    return (
      (selectedCategory === "all" || item.category === selectedCategory) &&
      (searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ("helper" in item &&
          item.helper.toLowerCase().includes(searchQuery.toLowerCase())) ||
        ("requester" in item &&
          item.requester.toLowerCase().includes(searchQuery.toLowerCase())))
    );
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex">
          <button
            className={`flex-1 py-4 px-6 font-medium text-center rounded-tl-lg transition-colors ${
              activeTab === "offers"
                ? "bg-white text-[#553a5c] shadow-md"
                : "bg-[#553a5c]/20 text-gray-700 hover:bg-[#553a5c]/30"
            }`}
            onClick={() => setActiveTab("offers")}
          >
            <Users className="inline-block mr-2" size={20} />
            Help Offers
          </button>
          <button
            className={`flex-1 py-4 px-6 font-medium text-center rounded-tr-lg transition-colors ${
              activeTab === "requests"
                ? "bg-white text-[#553a5c] shadow-md"
                : "bg-[#553a5c]/20 text-gray-700 hover:bg-[#553a5c]/30"
            }`}
            onClick={() => setActiveTab("requests")}
          >
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
                placeholder={
                  activeTab === "offers"
                    ? "Search help offers..."
                    : "Search help requests..."
                }
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center">
              <Filter size={20} className="text-gray-500 mr-2" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
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
              onClick={() => setShowPostForm(true)}
            >
              {activeTab === "offers" ? "Offer Help" : "Request Help"}
            </button>
          </div>
        </div>

        {filteredHelp.length > 0 ? (
          <div className="space-y-6">
            {filteredHelp.map((item) => (
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
                        {"helper" in item
                          ? `Offered by: ${item.helper}`
                          : "requester" in item
                          ? `Posted by: ${item.requester}`
                          : ""}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        activeTab === "offers"
                          ? "bg-[#553a5c]/10 text-[#553a5c]"
                          : "urgency" in item && item.urgency === "High"
                          ? "bg-red-100 text-red-700"
                          : "urgency" in item && item.urgency === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {activeTab === "offers"
                        ? "type" in item
                          ? item.type
                          : ""
                        : "urgency" in item
                        ? `${item.urgency} priority`
                        : ""}
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
                    {activeTab === "offers" &&
                      "commitment" in item &&
                      item.commitment && (
                        <div className="flex items-center">
                          <span>⏱️ {item.commitment}</span>
                        </div>
                      )}
                  </div>

                  <p className="text-gray-600 mb-4">{item.description}</p>

                  <div className="flex justify-between items-center">
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </span>
                    <button className="text-sm bg-[#886f80] text-white px-5 py-2 rounded hover:bg-[#553a5c] transition-colors">
                      {activeTab === "offers" ? "Get Help" : "Offer Support"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No {activeTab === "offers" ? "help offers" : "help requests"}{" "}
              match your current filters
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 text-[#553a5c] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {showPostForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-xl p-6">
            <h2 className="text-2xl font-medium text-[#553a5c] mb-6">
              {activeTab === "offers"
                ? "Offer to Help Others"
                : "Request Help From Community"}
            </h2>
            <p className="text-gray-600 mb-6">
              Form would go here with fields for help details, availability, and
              contact preferences
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setShowPostForm(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#553a5c] text-white rounded hover:bg-[#937195]"
                onClick={() => setShowPostForm(false)}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpExchangePage;
