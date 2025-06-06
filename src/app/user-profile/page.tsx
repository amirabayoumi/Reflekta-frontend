import axios from "axios";
import https from "https";

type UserData = {
  email: string;
  // Add other fields as needed
};

const httpsAgent = new https.Agent({
  rejectUnauthorized: false, // Only use this for testing/self-signed certs
});

const getTokenFromCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const token = getTokenFromCookie();
    if (!token) {
      console.warn("No token found in cookies");
      return null;
    }

    const response = await axios.get("https://3.75.235.214/api/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) return null;

    console.log("User data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    if (axios.isAxiosError(error)) {
      console.error("Axios error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        responseData: error.response?.data,
      });
    }
    return null;
  }
};

export default async function UserProfile() {
  let userData = null;

  try {
    userData = await fetchUserData();
    console.log("Fetched user data:", userData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  if (!userData) {
    return <h1>No user data available</h1>;
  }

  return <>{userData && <h1>{userData.email}</h1>}</>;
}
