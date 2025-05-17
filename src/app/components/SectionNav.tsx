"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Calendar,
  HandHelping,
  BookOpen,
  Scale,
  ChevronLeft,
  Users,
} from "lucide-react";

const SectionNav = () => {
  const pathname = usePathname();

  const sections = [
    {
      name: "Events",
      path: "/community-hub/events",
      icon: <Calendar size={20} />,
    },
    {
      name: "Help & Be Helped",
      path: "/community-hub/help",
      icon: <HandHelping size={20} />,
    },
    {
      name: "Stories",
      path: "/community-hub/stories",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Legal FAQ",
      path: "/community-hub/legal",
      icon: <Scale size={20} />,
    },
  ];

  const isActive = (path: string) => {
    if (pathname === "/community-hub") {
      return false;
    }
    return pathname === path;
  };

  return (
    <div className="bg-white shadow-md mb-8 overflow-hidden sticky top-0 z-30">
      <div className="flex flex-nowrap w-full">
        {pathname !== "/community-hub" ? (
          <Link
            href="/community-hub"
            className="flex items-center px-4 py-3 text-[#553a5c] hover:bg-[#553a5c]/5 transition-colors w-1/5 justify-center"
          >
            <ChevronLeft size={18} className="lg:mr-1" />
            <span className="lg:inline hidden">Back to Hub</span>
          </Link>
        ) : (
          <div className="flex items-center px-4 py-3 bg-[#553a5c] text-white w-1/5 justify-center">
            <Users size={20} className="lg:mr-2" />
            <span className="lg:inline hidden">Community Hub</span>
          </div>
        )}

        {sections.map((section) => (
          <Link
            key={section.name}
            href={section.path}
            className={`flex items-center px-4 py-3 transition-colors flex-1 justify-center ${
              isActive(section.path)
                ? "bg-[#553a5c] text-white"
                : "text-gray-700 hover:bg-[#553a5c]/5"
            }`}
          >
            <span className={section.name && "lg:mr-2"}>{section.icon}</span>
            <span className="lg:inline hidden">{section.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SectionNav;
