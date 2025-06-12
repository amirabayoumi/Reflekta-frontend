import Link from "next/link";
import Image from "next/image";
const sections = [
  {
    imageUrl:
      "https://res.cloudinary.com/djuqnuesr/image/upload/v1746638739/mike-erskine-S_VbdMTsdiA-unsplash_iqgjlg.jpg",
    title: "Cultural Exchange Events",
    link: "/community-hub/events",
    description:
      "Join us for cultural events, workshops, and meetups to celebrate diversity and foster connections.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/djuqnuesr/image/upload/v1746640099/austin-kehmeier-lyiKExA4zQA-unsplash_zqwlm0.jpg",
    title: "Give & Get Help",
    link: "/community-hub/help",
    description:
      "Access language assistance, educational guidance, and professional mentorship from community volunteers.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/djuqnuesr/image/upload/v1746628369/maegan-martin-6nsGg3Iw37c-unsplash_rmkejz.jpg",
    title: "The Power of Story ",
    link: "/community-hub/stories",
    description:
      "Read inspiring stories from community members and share your own journey.",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/djuqnuesr/image/upload/v1746638924/sasun-bughdaryan-oA1aVtEcWaE-unsplash_bmf4ce.jpg",
    title: "Legal FAQ",
    link: "/community-hub/legal",
    description:
      "Find information on residence permits, family reunification, employment rights, and connect with pro bono legal advisors.",
  },
];

const CommunitySections = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 justify-center">
        {sections.map((section) => (
          <Link
            href={section.link}
            className="group flex justify-center"
            key={section.title}
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg h-full w-full max-w-[400px] flex flex-col">
              <div className={`h-56 relative flex items-center justify-center`}>
                <Image
                  src={section.imageUrl}
                  alt={section.title}
                  width={400}
                  height={224}
                  className="object-cover w-full h-full opacity-80"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-[#553a5c] mb-2">
                  {section.title}
                </h3>
                <p className="text-gray-600 flex-1">{section.description}</p>
                <div className="flex justify-end mt-6">
                  <span className="text-[#553a5c] group-hover:underline">
                    Explore →
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};
export default CommunitySections;
