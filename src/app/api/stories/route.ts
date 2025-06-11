import axios from "axios";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${AUTH_TOKEN}`,
});

export const GET = async () => {
  try {
    const response = await axios.get("inputoutput.be/api/stories", {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    const storiesDataData = response.data;
    return new Response(JSON.stringify(storiesDataData))
  } catch (error) {
    console.error("Error fetching events:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
