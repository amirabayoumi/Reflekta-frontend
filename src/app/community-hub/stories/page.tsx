"use client";
import { useState, useEffect } from "react";
import HubHeader from "@/components/HubHeader";
import HubFooter from "@/components/HubFooter";
import SectionNav from "@/components/SectionNav";
import FloatingCircles from "@/components/FloatingCircles";
import {  MessageCircle, Share2, X } from "lucide-react";
import { fetchAllStories } from "@/queries";
import { Story } from "@/types";

// Define a type for the transformed story data that matches what we use in UI
type TransformedStory = {
  id: number;
  title: string;
  content: string;
  date: string;
  comments: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  is_published: number;
  // Fields not in API but needed for UI
  authorInitial: string;
};

// Transform the API story data to UI format
const transformStoryData = (story: Story): TransformedStory => {
  return {
    id: story.id,
    title: story.title || "Untitled Story",
    content: story.content || "",
    date: formatDate(story.created_at),
    comments: story.comments?.length || 0,
    user_id: story.user_id,
    created_at: story.created_at,
    updated_at: story.updated_at,
    is_published: story.is_published,
    // Derived fields
    authorInitial: "U", // User initial (could be derived from user_id in the future)
  };
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

const StoriesPage = () => {
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [stories, setStories] = useState<TransformedStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchAllStories()
      .then((data) => {
        // Transform API data to the expected UI format
        const transformedStories = data.map(transformStoryData);
        setStories(transformedStories);
        console.log("Fetched stories:", data);
        console.log("Transformed stories:", transformedStories);
      })
      .catch((err) => {
        console.error("Error fetching stories:", err);
        setError("Failed to load stories. Please try again later.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleCircleClick = (storyId: number) => {
    setSelectedStory(storyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center"> Listen to the others </h1>
      </div>
      <SectionNav />

      <div className="container mx-auto px-4 py-6">
        {/* Share Story Button placed above the floating circles */}
        {!isAddingStory && selectedStory === null && (
          <div className="mb-4 text-center">
            <button
              className="inline-block bg-[#553a5c] hover:bg-[#937195] text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
              onClick={() => setIsAddingStory(true)}
            >
              Share Your Story
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#553a5c]"></div>
          </div>
        )}

        {/* Error state */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && stories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">No stories found</p>
            <p className="text-gray-500">Be the first to share your story!</p>
          </div>
        )}

        {/* Floating Circles Container - visible only on medium screens and up */}
        {!loading &&
          !error &&
          !isAddingStory &&
          selectedStory === null &&
          stories.length > 0 && (
            <div className="relative w-full h-[60vh] mb-8 hidden md:block">
              <FloatingCircles
                stories={stories}
                onCircleClick={handleCircleClick}
                onAddStoryClick={() => setIsAddingStory(true)}
              />
            </div>
          )}

        {/* Grid View for Mobile Screens - visible only on small screens */}
        {!loading &&
          !error &&
          !isAddingStory &&
          selectedStory === null &&
          stories.length > 0 && (
            <div className="md:hidden">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
                    onClick={() => setSelectedStory(story.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-[#553a5c]">
                            <span className="text-white font-medium">
                              {story.authorInitial}
                            </span>
                          </div>
                        </div>
                        <div className="ml-3">
                          <p className="font-medium text-sm">
                            User #{story.user_id}
                          </p>
                          <p className="text-xs text-gray-500">{story.date}</p>
                        </div>
                      </div>

                      <h3 className="font-semibold text-lg mb-2 text-[#553a5c]">
                        {story.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {story.content}
                      </p>

                      <div className="flex justify-between items-center">
                        <div className="flex space-x-3 text-sm">
                          <span className="flex items-center text-gray-500">
                            <MessageCircle size={16} />
                            <span className="ml-1">{story.comments}</span>
                          </span>
                          <span className="flex items-center text-gray-500">
                            {story.is_published === 1 ? "Published" : "Draft"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Add story form */}
        {isAddingStory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setIsAddingStory(false)}
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-medium text-[#553a5c] mb-4">
              Share Your Story
            </h2>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="Give your story a title"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Story</label>
              <textarea
                value={storyContent}
                onChange={(e) => setStoryContent(e.target.value)}
                placeholder="Share your experience, journey, or advice..."
                className="w-full p-3 border border-gray-300 rounded-lg h-40 focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                onClick={() => setIsAddingStory(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[#553a5c] text-white rounded hover:bg-[#937195]"
                onClick={() => {
                  console.log("Story submitted:", {
                    title: storyTitle,
                    content: storyContent,
                  });
                  setIsAddingStory(false);
                  setStoryTitle("");
                  setStoryContent("");
                }}
                disabled={!storyTitle || !storyContent}
              >
                Publish Story
              </button>
            </div>
          </div>
        )}

        {/* Selected story detail view */}
        {selectedStory !== null && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10"
              onClick={() => setSelectedStory(null)}
            >
              <X size={24} />
            </button>

            {stories
              .filter((story) => story.id === selectedStory)
              .map((story) => (
                <div key={story.id} className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#553a5c]">
                        <span className="text-white font-medium">
                          {story.authorInitial}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">User #{story.user_id}</p>
                      <p className="text-sm text-gray-500">{story.date}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-2xl mb-3 text-[#553a5c]">
                    {story.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {story.content}
                  </p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <span className="flex items-center text-gray-500">
                        <MessageCircle size={18} />
                        <span className="ml-1">{story.comments}</span>
                      </span>
                      <span className="flex items-center text-gray-500">
                        <Share2 size={18} />
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {story.is_published === 1 ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      <HubFooter />
    </div>
  );
};

export default StoriesPage;
