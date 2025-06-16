import FloatingCircles from "@/components/storiesComponents/FloatingCircles";
import Link from "next/link";
import { Story } from "@/types";
import AddStory from "@/components/storiesComponents/AddStory";
import { slugit } from "@/helper";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Stories - Community Hub ",
  description: "Community Hub - Stories",
  openGraph: {
    title: "Reflekta - Community Hub - Stories",
    description: "Explore stories in the community hub",
    siteName: "Reflekta",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1749149982/Untitled_design_vrodpv.png",
        width: 1000,
        height: 1000,
        alt: "Community Hub Stories",
      },
    ],
  },
};

// Helper to format dates
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);
  // Check if date is valid
  if (isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
};

// Transform the API story data to UI format
const transformStoryData = (story: Story) => {
  return {
    ...story,
    date: formatDate(story.created_at),
  };
};
// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function StoriesPage() {
  let storiesResponse: Story[] = [];
  try {
    const response: Response = await fetch(
      "https://inputoutput.be/api/stories",
      {
        next: { tags: ["stories"] },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
        },
      }
    );
    const data = await response.json();
    if (Array.isArray(data)) {
      storiesResponse = data;
    } else if (data && Array.isArray(data.data)) {
      storiesResponse = data.data;
    } else {
      throw new Error("Invalid stories data format");
    }
  } catch (error) {
    console.error("Error fetching stories:", error);
  }

  // Transform stories data
  const transformedStories = storiesResponse.map(transformStoryData);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-6">
        {transformedStories.length > 0 ? (
          <>
            <div className="text-center mb-8 text-2xl font-bold text-[#553a5c]">
              Stories float around us, arriving without our choosing just like
              the people we meet by chance in life.
            </div>
            <div className="mb-4 text-center">
              <AddStory />
            </div>

            <div className="relative w-full h-[60vh] mb-8 hidden md:block">
              <FloatingCircles stories={transformedStories} />
            </div>

            <div className="md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {transformedStories.map((story) => (
                  <Link
                    key={story.id}
                    href={`/community-hub/stories/${story.id}/${slugit(
                      story.title
                    )}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-[#553a5c]"></div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">
                            {story.user_name ||
                              (story.user && story.user.name) ||
                              "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">{story.date}</p>
                        </div>
                      </div>
                      <h3 className="font-semibold text-lg mb-2 text-[#553a5c]">
                        {story.title || "Untitled Story"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {story.content || "No content available"}
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3 text-sm">
                          <span className="flex items-center text-gray-500">
                            <span className="ml-1">
                              {story.comments?.length || 0} comments
                            </span>
                          </span>
                          <span className="flex items-center text-gray-500">
                            {story.is_published === 1 ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No stories found</p>
            <p className="text-gray-500">Be the first to share your story!</p>
          </div>
        )}
      </div>
    </div>
  );
}
