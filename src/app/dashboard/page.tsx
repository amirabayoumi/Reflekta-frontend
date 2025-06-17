import HubHeader from "@/components/communityComponents/HubHeader";
import HubFooter from "@/components/communityComponents/HubFooter";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProfileSection from "@/components/userDashboardComponent/ProfileSection";
import ActivitySection from "@/components/userDashboardComponent/ActivitySection";
import ContentSection from "@/components/userDashboardComponent/ContentSection";

export default function DashboardPage() {
  return (
    <>
      <HubHeader />
      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center">Profile Dashboard</h1>
      </div>
      <div className="min-h-screen flex flex-col bg-[#f5f5f5] text-[#333] font-sans">
        <div>
          <Link
            href="/community-hub"
            className="m-5 inline-flex items-center gap-2 bg-gradient-to-r from-[#886f80] to-[#553a5c] text-white px-5 py-2.5 rounded-full shadow-lg hover:from-[#553a5c] hover:to-[#886f80] transition-all font-semibold text-base"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Community Hub
          </Link>
        </div>

        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-full max-w-5xl mx-auto px-4 pb-20 flex flex-col justify-center items-center">
            <div className="w-full bg-white rounded-xl shadow-md overflow-hidden">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="flex w-full p-0 bg-transparent border-b border-gray-200">
                  <TabsTrigger
                    value="profile"
                    className="flex-1 py-4 text-sm font-medium text-gray-600 data-[state=active]:bg-[#553a5c]  rounded-none border-b-2 border-transparent  data-[state=active]:text-[#ffffff]  transition-all"
                  >
                    Profile
                  </TabsTrigger>
                  <TabsTrigger
                    value="activity"
                    className="flex-1 py-4 text-sm font-medium text-gray-600 data-[state=active]:bg-[#553a5c]  rounded-none border-b-2 border-transparent  data-[state=active]:text-[#ffffff]  transition-all"
                  >
                    Activity
                  </TabsTrigger>
                  <TabsTrigger
                    value="content"
                    className="flex-1 py-4 text-sm font-medium text-gray-600 data-[state=active]:bg-[#553a5c]  rounded-none border-b-2 border-transparent  data-[state=active]:text-[#ffffff]  transition-all"
                  >
                    My Content
                  </TabsTrigger>
                </TabsList>
                <div className="h-[600px]">
                  <TabsContent
                    value="profile"
                    className="mt-0 focus:outline-none w-full h-full p-6 overflow-y-auto"
                  >
                    <ProfileSection />
                  </TabsContent>

                  <TabsContent
                    value="activity"
                    className="mt-0 focus:outline-none w-full h-full p-6 overflow-y-auto"
                  >
                    <ActivitySection />
                  </TabsContent>

                  <TabsContent
                    value="content"
                    className="mt-0 focus:outline-none w-full h-full p-6 overflow-y-auto"
                  >
                    <ContentSection />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <HubFooter />
    </>
  );
}
