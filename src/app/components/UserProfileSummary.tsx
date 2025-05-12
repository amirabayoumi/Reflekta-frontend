import Link from "next/link";
const UserProfileSummary = () => {
  const isLoggedIn = true; // Replace with actual authentication logic
  return (
    <div className="bg-gradient-to-br from-[#553a5c]/90 to-[#937195]/90 rounded-lg shadow-md p-6 text-white">
      {isLoggedIn ? (
        <>
          <div className="text-center mb-6">
            <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl">AJ</span>
            </div>
            <h3 className="font-medium text-lg">Alex Johnson</h3>
            <p className="text-white/70">@alexj</p>
          </div>
          <div className="flex justify-around text-center mb-6">
            <div>
              <p className="text-xl font-medium">24</p>
              <p className="text-white/70 text-sm">Posts</p>
            </div>
            <div>
              <p className="text-xl font-medium">152</p>
              <p className="text-white/70 text-sm">Followers</p>
            </div>
            <div>
              <p className="text-xl font-medium">97</p>
              <p className="text-white/70 text-sm">Following</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="block text-center bg-white text-[#553a5c] font-medium py-2 rounded-md hover:bg-white/90 transition-colors"
          >
            View Dashboard
          </Link>
        </>
      ) : (
        <>
          <h3 className="text-xl font-semibold mb-4 text-center">
            Join Our Community
          </h3>
          <p className="mb-6 text-white/90 text-center">
            Sign in to access all features, save content, and connect with other
            members.
          </p>
          <div className="space-y-3">
            <button
              // onClick={() => setShowSignUp(false)}
              className="block w-full bg-white text-[#553a5c] font-medium py-2 rounded-md hover:bg-white/90 transition-colors"
            >
              Sign In
            </button>
            <button
              // onClick={() => setShowSignUp(true)}
              className="block w-full bg-white/20 text-white font-medium py-2 rounded-md hover:bg-white/30 transition-colors"
            >
              Create Account
            </button>
          </div>
        </>
      )}
    </div>
  );
};
export default UserProfileSummary;
