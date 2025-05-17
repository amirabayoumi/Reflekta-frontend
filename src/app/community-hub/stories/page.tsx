"use client";
import { useState } from "react";
import HubHeader from "@/app/components/HubHeader";
import HubFooter from "@/app/components/HubFooter";
import SectionNav from "@/app/components/SectionNav";
import {
  Heart,
  MessageCircle,
  Share2,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

const StoriesPage = () => {
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("recent"); // 'recent', 'likes', 'comments'
  const [selectedCategory, setSelectedCategory] = useState("all");

  const stories = [
    {
      id: 1,
      title: "Finding My Way in Belgium",
      author: "Maria K.",
      authorImage: "/profiles/person1.jpg",
      date: "2 weeks ago",
      category: "personal",
      content:
        "When I first arrived in Brussels, everything was overwhelming. The language, the culture, the transportation system. But slowly, I found my community and began to feel at home...",
      likes: 45,
      comments: 8,
      isLiked: false,
    },
    {
      id: 2,
      title: "From Refugee to Entrepreneur",
      author: "Ahmed L.",
      authorImage: "/profiles/person2.jpg",
      date: "1 month ago",
      category: "success",
      content:
        "Five years ago, I arrived with nothing but hope. Today, I run a small business that employs 7 people. This is how community support made it possible...",
      likes: 87,
      comments: 12,
      isLiked: true,
    },
    {
      id: 3,
      title: "Language Learning Journey",
      author: "Sophia J.",
      authorImage: "/profiles/person3.jpg",
      date: "3 days ago",
      category: "education",
      content:
        "Learning Dutch seemed impossible at first, but with these methods and resources, I was able to become conversational in just 6 months...",
      likes: 32,
      comments: 15,
      isLiked: false,
    },
    {
      id: 4,
      title: "Navigating Healthcare as a Newcomer",
      author: "Carlos M.",
      authorImage: "/profiles/person4.jpg",
      date: "2 months ago",
      category: "resources",
      content:
        "Understanding the Belgian healthcare system was one of my biggest challenges. Here's what I wish someone had told me when I arrived...",
      likes: 56,
      comments: 9,
      isLiked: false,
    },
  ];

  const storyCategories = [
    "all",
    "personal",
    "success",
    "education",
    "resources",
    "culture",
    "work",
  ];

  const filteredStories = stories.filter((story) => {
    return (
      (selectedCategory === "all" || story.category === selectedCategory) &&
      (searchQuery === "" ||
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  switch (sortOrder) {
    case "likes":
      filteredStories.sort((a, b) => b.likes - a.likes);
      break;
    case "comments":
      filteredStories.sort((a, b) => b.comments - a.comments);
      break;
    default:
      break;
  }

  const toggleLike = (storyId: number) => {
    console.log(`Toggle like for story ${storyId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center"> Listen to the others </h1>
      </div>
      <SectionNav />
      <div className="container mx-auto px-4 py-12">
        {!isAddingStory && (
          <div className="mb-8 text-center">
            <button
              className="bg-[#553a5c] text-white px-8 py-3 rounded-lg hover:bg-[#937195] transition-colors"
              onClick={() => setIsAddingStory(true)}
            >
              Share Your Story
            </button>
          </div>
        )}

        {isAddingStory && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]">
                {storyCategories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
              </select>
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

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search stories..."
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
                {storyCategories
                  .filter((cat) => cat !== "all")
                  .map((category) => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
              </select>
            </div>

            <div className="flex items-center">
              {sortOrder === "recent" ? (
                <ArrowDown size={20} className="text-gray-500 mr-2" />
              ) : (
                <ArrowUp size={20} className="text-gray-500 mr-2" />
              )}
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#553a5c]"
              >
                <option value="recent">Most Recent</option>
                <option value="likes">Most Liked</option>
                <option value="comments">Most Discussed</option>
              </select>
            </div>
          </div>
        </div>

        {filteredStories.length > 0 ? (
          <div className="space-y-8">
            {filteredStories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center bg-[#553a5c]">
                        <span className="text-white font-medium">
                          {story.author.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="font-medium">{story.author}</p>
                      <p className="text-sm text-gray-500">{story.date}</p>
                    </div>
                  </div>

                  <h3 className="font-semibold text-xl mb-2 text-[#553a5c]">
                    {story.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{story.content}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex space-x-4">
                      <button
                        className={`flex items-center ${
                          story.isLiked ? "text-pink-500" : "text-gray-500"
                        } hover:text-pink-500`}
                        onClick={() => toggleLike(story.id)}
                      >
                        <Heart
                          size={18}
                          className={story.isLiked ? "fill-current" : ""}
                        />
                        <span className="ml-1">{story.likes}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <MessageCircle size={18} />
                        <span className="ml-1">{story.comments}</span>
                      </button>
                      <button className="flex items-center text-gray-500 hover:text-gray-700">
                        <Share2 size={18} />
                      </button>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded">
                      {story.category.charAt(0).toUpperCase() +
                        story.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <p className="text-gray-500 text-lg">
              No stories match your current filters
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

      <HubFooter />
    </div>
  );
};

export default StoriesPage;
