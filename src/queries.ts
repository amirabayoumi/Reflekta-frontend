import {
  EventData,

  registerData,
  userData,
  LoginResponse,
  RegisterResponse,
  UserData,
  Story
} from "./types";
import https from 'https';
import axios, { AxiosResponse } from 'axios';
// import { Buffer } from 'buffer';
// import 'dotenv/config';


// Change the environment variable reference
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
});

console.log("Using AUTH_TOKEN:", AUTH_TOKEN); 

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

// export const fetchAllEvents = async (): Promise<EventData[]> => {
//   try {
//     const response = await axios.get("https://3.75.235.214/api/events", {
//       headers: getHeaders(),
//       httpsAgent: httpsAgent,
      
      

//     });
// console.log("David");
//     if (response.status !== 200) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     let eventsData: EventData[] = [];

//     if (response.data && response.data.data && Array.isArray(response.data.data)) {
//       eventsData = response.data.data;
//     }

//     if (eventsData.length === 0) {
//       console.warn("Could not extract events from API response:", response.data);
//       return [];
//     }

//     return eventsData;
//   } catch (error: unknown) {
//     console.error("Error fetching events:", error);
//     return [];
//   }
// };

export const fetchEventById = async (id: string): Promise<EventData | undefined> => {
  try {
    const response = await axios.get(`https://inputoutput.be/api/events/${id}`, {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return undefined;
  }
};



//instead of route 
// export const fetchAllEvents = async (): Promise<EventData[]> => {
//   try {
//     const response: AxiosResponse<{ data: EventData[] }> = await axios.get("https://inputoutput.be/api/events", {
//       headers: getHeaders(),
//       httpsAgent: httpsAgent,
//     });

//     if (response.status !== 200) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     const eventsData = response.data.data || [];
//     return eventsData;
//   } catch (error) {
//     console.error("Error fetching events:", error);
//     return [];
//   }
// };

// export const fetchAllCategories = async (): Promise<string[]> => {
//   try {
//     const response: AxiosResponse<{ data: string[] }> = await axios.get("https://inputoutput.be/api/categories", {
//       headers: getHeaders(),
//       httpsAgent: httpsAgent,
//     });
//     if (response.status !== 200) {
//       throw new Error(`API Error: ${response.status}`);
//     }
//     const categoriesData = response.data.data || [];
//     return categoriesData;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }}

//   export const fetchAllStories = async (): Promise<Story[]> => {
//   try {
//     const response: AxiosResponse<{ data: Story[] }> = await axios.get("https://inputoutput.be/api/stories", {
//       headers: getHeaders(),
//       httpsAgent: httpsAgent,
//     });

//     if (response.status !== 200) {
//       throw new Error(`API Error: ${response.status}`);
//     }

//     const storiesData = response.data.data || [];
//     return storiesData;
//   } catch (error) {
//     console.error("Error fetching stories:", error);
//     return [];
//   }
// };

export const registerUser = async (registerData: registerData): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      "https://inputoutput.be/api/register",
      registerData,
   
    );

    if (response.status !== 200) {
      const message = response.data ? JSON.stringify(response.data) : `Registration failed with status ${response.status}`;
      console.error(`Registration failed: ${response.status} - ${message}`);
      return { success: false, message };
    }

    console.log("Registration response:", response.data);
    return response.data;
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    let message = "Registration failed";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      error.response &&
      typeof (error as { response: unknown }).response === "object" &&
      "data" in ((error as { response: unknown }).response as object)
    ) {
      message = JSON.stringify((error as { response: { data: unknown } }).response.data);
    } else if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }

    return { success: false, message };
  }
};

export const loginUser = async (userData: userData): Promise<LoginResponse> => {
  try {
    // console.log("Logging in user with data:", userData);
    // console.log("Using AUTH_TOKEN:", AUTH_TOKEN); // Should now show the value
    console.log("Headers being sent:", getHeaders());
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "https://inputoutput.be/api/login",
      userData,
    
    );

    if (response.status !== 200) {
      const message = response.data ? JSON.stringify(response.data) : `Login failed with status ${response.status}`;
      console.error(`Login failed: ${response.status} - ${message}`);
      return { success: false, message };
    }

    // Remove the cookie handling part since we're using pure token auth
    if (response.data.success && response.data.data?.token) {
      // Return the original token for auth context to use
      // No encoding needed as we're not using cookies anymore
      console.log("Login successful, returning token");
    }

    return response.data;
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    let message = "Login failed";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: unknown }).response &&
      typeof (error as { response: unknown }).response === "object" &&
      "data" in (error as { response: { data?: unknown } }).response
    ) {
      message = JSON.stringify((error as { response: { data?: unknown } }).response.data);
    } else if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }

    return { success: false, message };
  }
};

// Helper function to get token from cookie (non-HttpOnly)
// const getTokenFromCookie = (): string | null => {
//   if (typeof document === 'undefined') return null;
//   const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
//   return match ? decodeURIComponent(match[1]) : null;
// };

export const fetchUserData = async (token?: string): Promise<UserData | null> => {
  try {
    if (!token) {
      // Do not throw error, just log and return null
      console.warn("No token provided to fetchUserData");
      return null;
    }
    const response = await axios.get("https://inputoutput.be/api/user", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
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

// Update the test function to pass a token
export const testAuthAndUserData = async (token?: string): Promise<{userData: UserData | null}> => {
  console.log("=== Testing User Data ===");
  
  // Test user data fetching with provided token
  const userData = await fetchUserData(token);
  console.log("User data fetch result:", userData ? "Success" : "Failed");
  if (userData) {
    console.log("User name:", userData.name);
    console.log("User email:", userData.email);
  }
  
  return { userData };
};


type Ticketdata = {
  eventName: string;
  numberOfAdults: number;
}

export async function getTicketPdf(ticketData: Ticketdata): Promise<Blob> {
  try {
    const response = await fetch(
      "https://pnfpkvxzqvzbybtwuzhf.supabase.co/functions/v1/direct-download-pdf-ticket",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + process.env.SUPABASE_KEY, 
        },
        body: JSON.stringify(ticketData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || "Failed to generate ticket");
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("❌ Error generating ticket PDF:", error);
    throw error;
  }
}

// Client-side only function to trigger download
export function downloadPdfBlob(blob: Blob, filename = "ticket.pdf"): void {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined' && window.URL && document) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
    console.log("✅ PDF downloaded successfully.");
  } else {
    console.warn("Cannot download in non-browser environment");
  }
}




export const fetchStoryById = async (id: string): Promise<Story | undefined> => {
  try {
    const response = await axios.get(`https://inputoutput.be/api/stories/${id}`, {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching story by ID:", error);
    return undefined;
  }
};
type NewStoryData = {
  title: string;
  content: string;
  user_id: number;
};


export const addNewStory = async (storyData: NewStoryData): Promise<Story | null> => {
  try {
    const response = await axios.post("https://inputoutput.be/api/stories", storyData, {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error adding new story:", error);
    return null;
  }
};

type StoryComment = {
  content: string;
};

export type StoryCommentResponse = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  story_id: number;
};

// story_id: parseInt(storyId),
// content: content,
export const addCommentToStory = async (
  storyId: number, 
  commentData: StoryComment,
  token: string 
): Promise<StoryCommentResponse | null> => {
  try {
    // No fallback to cookies, only use the provided token
    if (!token) {
      console.warn("No token provided, cannot add comment");
      return null;
    }
    
    const response = await axios.post(
      `https://inputoutput.be/api/stories/${storyId}/comments`, 
      commentData, 
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        httpsAgent: httpsAgent,
      }
    );
    
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.data;
  } catch (error) {
    console.error("Error adding comment to story:", error);
    return null;
  }
};