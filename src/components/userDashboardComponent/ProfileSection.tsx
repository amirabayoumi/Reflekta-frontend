"use client";
import { useAuth } from "@/hooks/useAuth";

const ProfileSection = () => {
  const { user } = useAuth();

  const getInitials = (name: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "";

  return (
    <>
      {!user && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-[#242424] w-full">
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            Please sign in to view your profile.
          </p>
          <button className="w-full bg-[#553a5c] hover:bg-[#6b4b72] text-white py-2 rounded-md transition-colors text-sm font-medium">
            Sign In
          </button>
        </div>
      )}
      {user && (
        <div className="flex-1 flex flex-col items-center p-6 bg-gray-50 dark:bg-[#242424] w-full  ">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#553a5c] to-[#886f80] flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">
              {getInitials(user.name)}
            </span>
          </div>
          <h2 className="text-xl font-medium mb-1">{user.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
            {user.email}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mb-6">
            Joined{" "}
            {user.created_at
              ? new Date(user.created_at).toLocaleDateString()
              : ""}
          </p>
          <button className="w-full bg-[#553a5c] hover:bg-[#6b4b72] text-white py-2 rounded-md transition-colors text-sm font-medium">
            Edit Profile
          </button>
        </div>
      )}
    </>
  );
};
export default ProfileSection;
