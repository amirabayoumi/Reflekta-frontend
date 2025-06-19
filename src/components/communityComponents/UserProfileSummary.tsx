"use client";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const UserProfileSummary: React.FC = () => {
  // Use the auth context instead of direct API calls
  const { user, isLoading } = useAuth();

  const getInitials = (name: string) =>
    name
      ? name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .substring(0, 2)
      : "";

  if (isLoading) {
    return (
      <div className="bg-gradient-to-br from-[#553a5c]/90 to-[#937195]/90 rounded-lg shadow-md p-6 text-white flex items-center justify-center min-h-[350px]">
        <p className="text-center">Loading profile...</p>
      </div>
    );
  }

  const isLoggedIn = !!user;

  return (
    <div className="bg-gradient-to-br from-[#553a5c]/90 to-[#937195]/90 rounded-lg shadow-md p-6 text-white flex items-center justify-center min-h-[350px]">
      {isLoggedIn ? (
        <div className="w-full flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className="w-40 h-40 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center">
              {user.profile_photo_path ? (
                <Image
                  src={
                    "https://inputoutput.be/storage/" + user.profile_photo_path
                  }
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  width={200}
                  height={200}
                />
              ) : (
                <div className="text-2xl font-bold">
                  {getInitials(user.name)}
                </div>
              )}
            </div>
            <h3 className="font-medium text-lg">Welcome, {user.name}!</h3>
          </div>
          <Link
            href="/dashboard"
            className="w-3/4 max-w-xs mx-auto block text-center bg-white text-[#553a5c] font-medium py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-full flex-1">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Join Our Community
          </h3>
          <p className="mb-6 text-white/90 text-center">
            Sign in to access all features, save content, and connect with other
            members.
          </p>
        </div>
      )}
    </div>
  );
};

export default UserProfileSummary;
