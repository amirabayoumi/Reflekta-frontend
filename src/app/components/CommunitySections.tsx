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

        <Link href="/community-hub/jobs" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#f7d2d2] relative flex items-center justify-center">
              <Image
                src="/icons/jobs-icon.png"
                alt="Jobs"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Jobs & Opportunities
              </h3>
              <p className="text-gray-600">
                Discover job opportunities and internships tailored for Belgians
                and immigrants.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">
                  25 open positions
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

        <Link href="/community-hub/legal-faq" className="group">
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full">
            <div className="h-40 bg-[#937195]/25 relative flex items-center justify-center">
              <Image
                src="/icons/legal-icon.png"
                alt="Legal FAQ"
                width={80}
                height={80}
                className="opacity-90"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                Legal Help & Rights
              </h3>
              <p className="text-gray-600">
                Access resources and information about your rights and legal
                matters in Belgium.
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-[#886f80]">30+ articles</span>
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
