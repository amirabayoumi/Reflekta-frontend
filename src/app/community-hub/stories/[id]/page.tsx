export const dynamic = "force-dynamic";
import { fetchStoryById } from "@/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarIcon, MessageSquare, User } from "lucide-react";
import AddComment from "@/components/storiesComponents/AddComment";
import ShareButton from "@/components/storiesComponents/ShareButton";

import type { Story } from "@/types";

// Use StoryComment type from "@/types" for consistency
import type { StoryComment } from "@/types";

type PageParams = {
  id: string;
};

const page = async ({ params }: { params: Promise<PageParams> }) => {
  const { id } = await params;
  const story: Story | undefined = await fetchStoryById(id);

  // If story not found, show 404
  if (!story) {
    notFound();
  }

  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Safely handle comments with better type checking
  let comments: StoryComment[] = [];

  // Check if comments exist and properly validate each comment
  if (story.comments && Array.isArray(story.comments)) {
    comments = story.comments.filter(
      (comment) =>
        comment &&
        typeof comment === "object" &&
        "id" in comment &&
        "user_id" in comment &&
        "content" in comment &&
        "created_at" in comment
    ) as StoryComment[];
  }

  // Get story author name
  const storyAuthor =
    story.user_name || (story.user && story.user.name) || "Unknown";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Back to stories navigation */}
      <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
        <Link
          href="/community-hub/stories"
          className="flex items-center text-[#553a5c] hover:text-[#886f80] transition-colors gap-2 w-fit"
        >
          <ArrowLeft size={16} />
          <span className="font-medium">Back to Stories</span>
        </Link>
      </div>

      {/* Story header with enhanced gradient and style */}
      <div className="w-full bg-gradient-to-r from-[#553a5c] via-[#886f80] to-[#937195] p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6 tracking-tight">
          {story.title}
        </h1>
        <div className="flex justify-center items-center space-x-3">
          <div className="bg-white/20 p-2 rounded-full">
            <User size={18} />
          </div>
          <span className="font-medium">{storyAuthor}</span>
        </div>
      </div>

      {/* Story content with improved spacing and styling */}
      <div className="p-6 md:p-8">
        {/* Meta info with enhanced styling */}
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-5 border-b border-gray-100 pb-5">
          <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
            <CalendarIcon size={16} className="mr-1.5 text-[#553a5c]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Story content with better typography */}
        <div className="prose prose-lg max-w-none mb-10 prose-headings:text-[#553a5c] prose-p:text-gray-700 prose-a:text-[#886f80]">
          {story.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-5 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Engagement with enhanced styling */}
        <div className="flex justify-between items-center pt-6 border-t border-gray-200">
          <div className="flex space-x-6">
            <button className="flex items-center text-gray-600 hover:text-[#553a5c] transition-colors">
              <MessageSquare size={20} className="mr-1.5" />
              <span className="font-medium">{comments.length || 0}</span>
            </button>
            <ShareButton />
          </div>
        </div>
      </div>

      {/* Comments section with enhanced styling */}
      {comments.length > 0 ? (
        <div className="p-6 md:p-8 bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
          <h3 className="text-xl font-semibold text-[#553a5c] mb-6 flex items-center">
            <MessageSquare className="mr-2" size={22} />
            Comments ({comments.length})
          </h3>
          <div className="space-y-5">
            {comments.map((comment) => {
              const commentAuthor =
                comment.user_name ||
                (comment.user && comment.user.name) ||
                "Unknown";
              return (
                <div
                  key={comment.id}
                  className="bg-white p-5 rounded-lg shadow-sm border border-gray-100 hover:border-[#886f80]/30 transition-colors"
                >
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-[#553a5c]/20 rounded-full flex items-center justify-center mr-3">
                        <User size={14} className="text-[#553a5c]" />
                      </div>
                      <div className="font-medium text-[#553a5c]">
                        {commentAuthor}
                      </div>
                    </div>
                    <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="p-10 bg-gray-50 border-t border-gray-200 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 bg-gray-100 rounded-full mb-4">
            <MessageSquare size={24} className="text-[#886f80]" />
          </div>
          <p className="text-gray-500 font-medium">
            No comments yet. Be the first to comment!
          </p>
        </div>
      )}

      {/* Add comment section with theme styling */}
      <div className="bg-gradient-to-t from-[#553a5c]/5 to-transparent">
        <AddComment storyId={story.id} />
      </div>
    </div>
  );
};

export default page;
