import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, CalendarIcon, MessageSquare, User } from "lucide-react";
import AddComment from "@/components/storiesComponents/AddComment";
import ShareButton from "@/components/storiesComponents/ShareButton";
import type { Story, StoryComment } from "@/types";
import type { Metadata } from "next";
import { slugit } from "@/helper";
import EditStory from "@/components/userDashboardComponent/EditStory";
import DeleteStory from "@/components/userDashboardComponent/DeleteStory";
import DeleteComment from "@/components/userDashboardComponent/DeleteComment";
import EditComment from "@/components/userDashboardComponent/EditComment";
import Image from "next/image";
import type { DetailPageParams } from "@/types";

const authToken = process.env.NEXT_PUBLIC_AUTH_TOKEN;
export const generateMetadata = async ({
  params,
}: {
  params: Promise<DetailPageParams>;
}): Promise<Metadata> => {
  const { id } = await params;
  if (!id) {
    return {
      title: "Story Details",
      description: "reflekta - Community Hub - Story Details",
      openGraph: {
        title: "Story Details",
        description: "reflekta - Community Hub - Story Details",
        siteName: "Reflekta",
        images: [
          {
            url: "https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png",
            width: 1200,
            height: 630,
            alt: "Story Details",
          },
        ],
      },
    };
  }

  const resp = await fetch(`https://inputoutput.be/api/stories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!resp.ok) {
    return {
      title: "Story Not Found",
      description: "The story you're looking for does not exist.",
    };
  }

  const story = await resp.json();

  return {
    title: `${story.title}`,
    description:
      story.content?.slice(0, 150) ||
      "reflekta - Community Hub - Story Details",
    openGraph: {
      title: `Reflekta - Community Hub - Story - ${story.title}`,
      description:
        story.content?.slice(0, 150) ||
        "reflekta - Community Hub - Story Details",
      siteName: "Reflekta",
      images: [
        {
          url: "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png",
          width: 1200,
          height: 630,
          alt: "Story Details",
        },
      ],
      type: "website",
    },
  };
};

const page = async ({ params }: { params: Promise<DetailPageParams> }) => {
  const { id } = await params;

  const resp = await fetch(`https://inputoutput.be/api/stories/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    next: { tags: ["story"], revalidate: 60 }, // Revalidate every 60 seconds
  });

  if (!resp.ok) {
    redirect("/community-hub/stories"); // Redirect to stories if not found
  }

  const story: Story = await resp.json();

  if (!story) {
    notFound();
  }

  const formattedDate = new Date(story.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  let comments: StoryComment[] = [];
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

      {/* Story header */}
      <div className="w-full bg-gradient-to-r from-[#553a5c] via-[#886f80] to-[#937195] p-8 text-white">
        <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6 tracking-tight">
          {story.title}
        </h1>
        <div className="flex justify-center items-center space-x-4">
          {story.user && story.user.profile_photo_path ? (
            <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-white/40 flex-shrink-0">
              <Image
                src={`https://inputoutput.be/storage/${story.user.profile_photo_path}`}
                alt={` profile photo`}
                width={56}
                height={56}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="h-14 w-14 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <User size={30} />
            </div>
          )}
          <span className="font-medium text-lg">{storyAuthor}</span>
        </div>
      </div>
      <div className="flex justify-end space-x-2 p-4 bg-gray-50 border-b border-gray-200">
        <EditStory story={story} />
        <DeleteStory story={story} />
      </div>
      {/* Story content */}
      <div className="p-6 md:p-8">
        <div className="flex flex-wrap items-center text-sm text-gray-600 mb-8 gap-5 border-b border-gray-100 pb-5">
          <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-full">
            <CalendarIcon size={16} className="mr-1.5 text-[#553a5c]" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="prose prose-lg max-w-none mb-10 prose-headings:text-[#553a5c] prose-p:text-gray-700 prose-a:text-[#886f80]">
          {story.content.split("\n").map((paragraph, index) => (
            <p key={index} className="mb-5 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>

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
                      {comment.user && comment.user.profile_photo_path ? (
                        <div className="h-10 w-10 rounded-full overflow-hidden border border-[#553a5c]/20 flex-shrink-0 mr-3">
                          <Image
                            src={`https://inputoutput.be/storage/${comment.user.profile_photo_path}`}
                            alt={`profile photo`}
                            width={40}
                            height={40}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 bg-[#553a5c]/20 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
                          <User size={22} className="text-[#553a5c]" />
                        </div>
                      )}
                      <div className="font-medium text-[#553a5c]">
                        {commentAuthor}
                      </div>
                    </div>
                    <div className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {new Date(comment.created_at).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                  <div className="mt-4 flex justify-end space-x-2">
                    <DeleteComment comment={comment} />
                    <EditComment comment={comment} />
                  </div>
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

      <div className="bg-gradient-to-t from-[#553a5c]/5 to-transparent">
        <AddComment storyId={story.id} />
      </div>
    </div>
  );
};

export async function generateStaticParams(): Promise<DetailPageParams[]> {
  const response = await fetch("https://inputoutput.be/api/stories", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();

  return data.map((story: { id: string; title: string }) => ({
    id: String(story.id),
    slug: slugit(story.title),
  }));
}

export default page;
