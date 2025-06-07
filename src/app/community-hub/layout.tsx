"use client";

import HubHeader from "@/components/communityComponents/HubHeader";
import HubFooter from "@/components/communityComponents/HubFooter";
import SectionNav from "../../components/communityComponents/SectionNav";

export default function CommunityHubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8f5fa] to-[#e6e0eb] text-gray-700 font-alef">
      <HubHeader />

      <div className="bg-gradient-to-br from-black to-[#937195]/90 text-white py-6">
        <h1 className="text-4xl text-center">Community Hub</h1>
      </div>

      <SectionNav />

      <div className="container mx-auto px-4 py-12">{children}</div>

      <HubFooter />
    </div>
  );
}
