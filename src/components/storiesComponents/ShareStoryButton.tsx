"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ShareStoryButton() {
  const [isAddingStory, setIsAddingStory] = useState(false);
  const [storyContent, setStoryContent] = useState("");
  const [storyTitle, setStoryTitle] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: storyTitle,
          content: storyContent,
          is_published: 1,
        }),
      });

      if (response.ok) {
        setIsAddingStory(false);
        setStoryTitle("");
        setStoryContent("");
        router.refresh(); // Refresh the page to show new story
      } else {
        console.error("Failed to submit story");
      }
    } catch (error) {
      console.error("Error submitting story:", error);
    }
  };

  if (!isAddingStory) {
    return (
      <button
        className="inline-block bg-[#553a5c] hover:bg-[#937195] text-white px-6 py-3 rounded-lg shadow-lg transition-colors"
        onClick={() => setIsAddingStory(true)}
      >
        Share Your Story
      </button>
    );
  }

  return (
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
          onClick={handleSubmit}
          disabled={!storyTitle || !storyContent}
        >
          Publish Story
        </button>
      </div>
    </div>
  );
}
