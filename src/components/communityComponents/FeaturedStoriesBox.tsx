import Link from "next/link";
import type { Story } from "@/types";

async function fetchStories(): Promise<Story[]> {
  try {
    const res = await fetch("https://inputoutput.be/api/stories", {
      next: { revalidate: 60 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AUTH_TOKEN}`,
      },
    });
    const data = await res.json();
    if (Array.isArray(data)) return data;
    if (data && Array.isArray(data.data)) return data.data;
    return [];
  } catch {
    return [];
  }
}

export default async function FeaturedStoriesBox() {
  const stories = await fetchStories();

  // Sort by comments count descending and pick top 2
  const topStories = [...stories]
    .sort((a, b) => (b.comments?.length || 0) - (a.comments?.length || 0))
    .slice(0, 2);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-[#553a5c]">
          Top Commented Stories
        </h2>
        <Link
          href="/community-hub/stories"
          className="text-sm text-[#886f80] hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="space-y-4">
        {topStories.length === 0 ? (
          <div className="text-gray-500 text-center">No stories found</div>
        ) : (
          topStories.map((story) => (
            <div
              key={story.id}
              className="border-b border-gray-200 pb-4 last:border-b-0"
            >
              <h3 className="font-medium text-gray-700">{story.title}</h3>
              <p className="text-gray-500 text-sm">
                by{" "}
                {story.user_name ||
                  (story.user && story.user.name) ||
                  "Unknown"}{" "}
                • {story.comments?.length || 0} comments
              </p>
              <Link
                href={`/community-hub/stories/${story.id}`}
                className="mt-2 text-[#553a5c] text-sm font-medium hover:underline inline-block"
              >
                Read story
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
