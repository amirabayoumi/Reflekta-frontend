import Link from "next/link";
import Image from "next/image";
const CommunitySections = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Link href="/community-hub/events" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#bca6c9] relative flex items-center justify-center">
              <Image
                src="/icons/events-icon.png"
                alt="Events"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Cultural Events & Meetups
              </h3>
              <p className="text-gray-600">
                Join us for cultural events, workshops, and meetups to celebrate
                diversity and foster connections.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">
                  42 upcoming events
                </span>
                <span className="text-[#553a5c] group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Updated Help section with corrected link and better content */}
        <Link href="/community-hub/help" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#f7d2d2] relative flex items-center justify-center">
              <Image
                src="/icons/jobs-icon.png"
                alt="Help & Support"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Help & Support Services
              </h3>
              <p className="text-gray-600">
                Access language assistance, educational guidance, and
                professional mentorship from community volunteers.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">
                  40+ support services
                </span>
                <span className="text-[#553a5c] group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        </Link>

        <Link href="/community-hub/stories" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#dad5c7] relative flex items-center justify-center">
              <Image
                src="/icons/stories-icon.png"
                alt="Stories"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Voices of the Community
              </h3>
              <p className="text-gray-600">
                Read inspiring stories from community members and share your own
                journey.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">108 stories</span>
                <span className="text-[#553a5c] group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Updated Legal section with corrected link and better content */}
        <Link href="/community-hub/legal" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#937195]/25 relative flex items-center justify-center">
              <Image
                src="/icons/legal-icon.png"
                alt="Legal Resources"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Legal Resources
              </h3>
              <p className="text-gray-600">
                Find information on residence permits, family reunification,
                employment rights, and connect with pro bono legal advisors.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">45+ resources</span>
                <span className="text-[#553a5c] group-hover:underline">
                  Explore →
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};
export default CommunitySections;
