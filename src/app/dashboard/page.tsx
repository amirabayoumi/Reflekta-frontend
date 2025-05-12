"use client";
import { useState } from "react";
import Image from "next/image";

const UserDashboard = () => {
  // Sample user data - would come from API in real application
  const user = {
    name: "Alex Johnson",
    username: "@alexj",
    joined: "January 2023",
    profileImage: "/R (4).png",
    bio: "Digital creator and community enthusiast. Love photography, writing and connecting with like-minded people.",
    posts: 24,
    followers: 152,
    following: 97,
  };

  // Sample activity feed
  const activities = [
    {
      id: 1,
      type: "post",
      title: "Sunset Reflections",
      date: "2 days ago",
      likes: 28,
      comments: 5,
    },
    {
      id: 2,
      type: "comment",
      title: "On 'Morning Routine'",
      date: "5 days ago",
      likes: 3,
    },
    {
      id: 3,
      type: "like",
      title: "'Creative Writing Tips'",
      date: "1 week ago",
    },
    {
      id: 4,
      type: "post",
      title: "Urban Photography",
      date: "2 weeks ago",
      likes: 46,
      comments: 12,
    },
  ];

  // Active tab state management
  const [activeTab, setActiveTab] = useState("activity");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#121212] via-[#281e2a] to-[#121212] text-white font-alef ">
      <div className="container mx-auto py-12 px-4 md:px-6">
        <h1 className="text-4xl md:text-5xl font-light mb-8 text-center mt-20">
        Profile Dashboard
        </h1>

        {/* Dashboard Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - User Profile */}
          <div className="bg-[#1d1a20]/80 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/30">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={user.profileImage}
                  alt="Profile"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-medium mb-1">{user.name}</h2>
              <p className="text-gray-300 mb-2">{user.username}</p>
              <p className="text-gray-400 text-sm mb-4">Joined {user.joined}</p>

              <div className="flex justify-around w-full mb-6">
                <div className="text-center">
                  <p className="text-2xl font-medium">{user.posts}</p>
                  <p className="text-gray-400 text-sm">Posts</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-medium">{user.followers}</p>
                  <p className="text-gray-400 text-sm">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-medium">{user.following}</p>
                  <p className="text-gray-400 text-sm">Following</p>
                </div>
              </div>

              <p className="text-gray-300 text-center mb-6">{user.bio}</p>

              <button className="w-full bg-[#886f80] text-white py-2 rounded-md hover:bg-[#9a8090] transition-colors">
                Edit Profile
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 bg-[#1d1a20]/80 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/30">
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                onClick={() => setActiveTab("activity")}
                className={`flex-1 py-4 text-center transition-colors ${
                  activeTab === "activity"
                    ? "border-b-2 border-[#886f80] text-[#e0d9df]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Activity
              </button>
              <button
                onClick={() => setActiveTab("content")}
                className={`flex-1 py-4 text-center transition-colors ${
                  activeTab === "content"
                    ? "border-b-2 border-[#886f80] text-[#e0d9df]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                My Content
              </button>
              <button
                onClick={() => setActiveTab("saved")}
                className={`flex-1 py-4 text-center transition-colors ${
                  activeTab === "saved"
                    ? "border-b-2 border-[#886f80] text-[#e0d9df]"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                Saved
              </button>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "activity" && (
                <div>
                  <h3 className="text-xl mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div
                        key={activity.id}
                        className="border-b border-gray-700/50 pb-4"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              {activity.type === "post" &&
                                "You created a post:"}
                              {activity.type === "comment" && "You commented:"}
                              {activity.type === "like" && "You liked:"}{" "}
                              <span className="text-[#cbbfd1]">
                                {activity.title}
                              </span>
                            </p>
                            <p className="text-gray-400 text-sm mt-1">
                              {activity.date}
                            </p>
                          </div>
                          {activity.type === "post" && (
                            <div className="text-sm text-gray-400">
                              {activity.likes} likes • {activity.comments}{" "}
                              comments
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-[#cbbfd1] mt-4 text-sm hover:text-white transition-colors">
                    View More Activity
                  </button>
                </div>
              )}

              {activeTab === "content" && (
                <div>
                  <h3 className="text-xl mb-4">My Content</h3>
                  <p className="text-gray-300">
                    Your posts, comments, and contributions will appear here.
                  </p>
                  {/* Content would be loaded here */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="bg-[#2a242c] p-4 rounded-md">
                        <h4 className="font-medium mb-2">Post Title #{item}</h4>
                        <p className="text-sm text-gray-300 mb-3">
                          Preview of your post content goes here...
                        </p>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span>Posted 2 weeks ago</span>
                          <span>12 likes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "saved" && (
                <div>
                  <h3 className="text-xl mb-4">Saved Items</h3>
                  <p className="text-gray-300">
                    Content you&#39;ve saved for later will appear here.
                  </p>
                  {/* Placeholder for saved content */}
                  <div className="mt-8 text-center py-6">
                    <p className="text-gray-400">
                      You haven&#39;t saved any items yet
                    </p>
                    <button className="mt-4 bg-[#886f80]/70 text-white py-2 px-4 rounded-md hover:bg-[#886f80] transition-colors">
                      Browse Community
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Community Recommendations */}
        <div className="mt-10 bg-[#1d1a20]/80 p-6 rounded-lg shadow-lg backdrop-blur-sm border border-gray-700/30">
          <h3 className="text-xl mb-6">Recommended Communities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Photography",
              "Creative Writing",
              "Digital Art",
              "Travel Stories",
            ].map((community) => (
              <div
                key={community}
                className="bg-[#2a242c] p-4 rounded-md text-center hover:bg-[#33293a] transition-colors cursor-pointer"
              >
                <h4 className="font-medium mb-2">{community}</h4>
                <p className="text-sm text-gray-400">
                  Join {Math.floor(Math.random() * 1000) + 100} members
                </p>
                <button className="mt-3 text-[#cbbfd1] text-sm hover:underline">
                  Explore
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
