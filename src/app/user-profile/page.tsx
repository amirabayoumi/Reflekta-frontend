"use client";

import { useAuth } from "@/hooks/useAuth";
import { Loader2, User, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  // If not authenticated, redirect to home

  if (!isLoading && !user) {
    router.push("/");
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#553a5c] mx-auto mb-4" />
          <p className="text-lg text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Profile header */}
            <div className="bg-gradient-to-r from-[#553a5c] to-[#937195] p-8 text-white text-center">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={40} />
              </div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="opacity-90">{user.email}</p>
            </div>

            {/* Profile content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#553a5c]">
                    Account Information
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <User className="mr-3 text-[#553a5c] mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{user.name}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Mail className="mr-3 text-[#553a5c] mt-1" size={18} />
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>

                    {user.created_at && (
                      <div className="flex items-start">
                        <Calendar
                          className="mr-3 text-[#553a5c] mt-1"
                          size={18}
                        />
                        <div>
                          <p className="text-sm text-gray-500">Member Since</p>
                          <p className="font-medium">
                            {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-[#553a5c]">
                    Actions
                  </h2>
                  <div className="space-y-3">
                    <Button
                      className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-800"
                      variant="outline"
                      onClick={() => router.push("/community-hub/my-stories")}
                    >
                      My Stories
                    </Button>

                    <Button
                      className="w-full justify-start bg-gray-100 hover:bg-gray-200 text-gray-800"
                      variant="outline"
                      onClick={() => router.push("/community-hub/events")}
                    >
                      Upcoming Events
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
