"use client";

import { useAuth } from "@/hooks/useAuth";
import EditStory from "./EditStory";
import DeleteStory from "./DeleteStory";
import Link from "next/link";
import { slugit } from "@/helper";
import { ExternalLink } from "lucide-react";

const ContentSection = () => {
  const { userStories } = useAuth();

  return (
    <div className="flex flex-col justify-start min-h-[60vh] w-full">
      <h2 className="text-2xl font-bold mb-6 text-[#553a5c]">Your Stories</h2>
      {userStories && userStories.length > 0 ? (
        <ul className="w-full space-y-6">
          {userStories.map((story) => (
            <li
              key={story.id}
              className="bg-white/80 shadow rounded-lg p-5 border border-gray-200 flex flex-col gap-2"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-[#553a5c]">
                      {story.title}
                    </span>
                    {/* Show published status using is_published */}
                    {story.is_published ? (
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-green-100 text-green-700 border border-green-200">
                        Published
                      </span>
                    ) : (
                      <span className="inline-block px-2 py-0.5 text-xs rounded bg-yellow-100 text-yellow-700 border border-yellow-200">
                        still in review by admin
                      </span>
                    )}
                  </div>
                  <div className="text-gray-700 mt-1">{story.content}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <Link
                  href={`/community-hub/stories/${story.id}/${slugit(
                    story.title
                  )}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded bg-[#553a5c] text-white hover:bg-[#6c4b73] transition-colors"
                >
                  <ExternalLink size={14} />
                  View Story
                </Link>
                <EditStory story={story} />
                <DeleteStory story={story} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="bg-white/80 rounded-lg shadow p-8 text-gray-500 mt-10">
          <p>No stories found.</p>
        </div>
      )}
    </div>
  );
};

export default ContentSection;
