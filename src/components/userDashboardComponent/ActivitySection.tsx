"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { slugit } from "@/helper";
import { StoryComment } from "@/types";

const ActivitySection = () => {
  const { userStories, user } = useAuth();
  console.log("User Stories:", userStories);

  // Extract all comments from user stories and flatten into a single array
  const allCommentsOnUserStories = userStories
    ? userStories.flatMap((story) =>
        story.comments.map((comment) => ({
          ...comment,
          story_id: story.id,
          story_title: story.title,
        }))
      )
    : [];

  // Sort comments to show most recent first
  const sortedComments = [...allCommentsOnUserStories].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Function to determine if comment is from current user
  const getDisplayName = (comment: StoryComment) => {
    if (user && comment.user_id === user.id) {
      return "You";
    }
    return comment.user_name;
  };

  return (
    <>
      <h2 className="text-xl font-semibold text-[#553a5c] mb-4">
        Last Activity on Your Stories
      </h2>
      {sortedComments.length > 0 ? (
        <ul className="space-y-4">
          {sortedComments.map((comment) => (
            <li key={comment.id} className="border-b pb-3">
              <Link
                href={`/community-hub/stories/${comment.story_id}/${slugit(
                  comment.story_title
                )}`}
                className="block hover:bg-gray-50 rounded-md p-2 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="text-gray-800">
                    <span className="font-medium">
                      {getDisplayName(comment)}
                    </span>{" "}
                    commented on your story &quot;
                    <span className="font-medium">
                      {comment.story_title || "Untitled Story"}
                    </span>
                    &quot;
                    <p className="text-sm text-gray-600 mt-1">
                      {comment.content}
                    </p>
                  </div>
                  <div className="text-xs text-gray-400 shrink-0 ml-2">
                    {new Date(comment.created_at).toLocaleString()}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">No comments on your stories yet.</div>
      )}
    </>
  );
};

export default ActivitySection;
