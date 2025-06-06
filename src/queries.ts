import {
  EventData,
  CategoryData,
  registerData,
  userData,
  LoginResponse,
  RegisterResponse,
  UserData,
  Story
} from "./types";
import https from 'https';
import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';
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
    const response = await axios.get(`https://3.75.235.214/api/events/${id}`, {
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

export const fetchAllCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await axios.get("https://3.75.235.214/api/categories", {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const registerUser = async (registerData: registerData): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      "https://3.75.235.214/api/register",
      registerData,
      {
        headers: getHeaders(),
        httpsAgent: httpsAgent,
      }
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
    console.log("Logging in user with data:", userData);
    console.log("Using AUTH_TOKEN:", AUTH_TOKEN); // Should now show the value
    console.log("Headers being sent:", getHeaders());
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "https://3.75.235.214/api/login",
      userData,
      {
        headers: getHeaders(),
        httpsAgent: httpsAgent,
      }
    );

    if (response.status !== 200) {
      const message = response.data ? JSON.stringify(response.data) : `Login failed with status ${response.status}`;
      console.error(`Login failed: ${response.status} - ${message}`);
      return { success: false, message };
    }

    // Store token in cookies via API endpoint if login was successful
    if (response.data.success && response.data.data?.token) {
      try {
        console.log(response.data.data.token);
        // Encode token to base64 before sending it to the endpoint
        const encodedToken = Buffer.from(response.data.data.token).toString('base64');
        
        // Call the set-token API endpoint
        await axios.post('/api/auth/set-token', { 
          token: encodedToken 
        });
        
        console.log("Token stored in cookies successfully");
      } catch (tokenError) {
        console.error("Failed to set token cookie:", tokenError);
        // Continue despite cookie setting error
      }
    }

    console.log("Login response:", response.data);
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
const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/);
  return match ? decodeURIComponent(match[1]) : null;
};

export const fetchUserData = async (): Promise<UserData | null> => {
  try {
    const token = getTokenFromCookie();
    if (!token) {
      // Do not throw error, just log and return null
      console.warn("No token found in cookies");
      return null;
    }
    const response = await axios.get("https://3.75.235.214/api/user", {
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

// Update the test function since we can't directly check for token existence
export const testAuthAndUserData = async (): Promise<{userData: UserData | null}> => {
  console.log("=== Testing User Data ===");
  
  // We can't check for token directly since it's HttpOnly
  console.log("Note: Token is in HttpOnly cookie and cannot be accessed via JavaScript");
  
  // Test user data fetching
  const userData = await fetchUserData();
  console.log("User data fetch result:", userData ? "Success" : "Failed");
  if (userData) {
    console.log("User name:", userData.name);
    console.log("User email:", userData.email);
  }
  
  return { userData };
};

export const fetchAllStories = async(): Promise<Story[]> => {
  try {
    // Log the headers being used - helpful for debugging
    console.log("Headers being sent:", getHeaders());
    
    // In Thunder Client, you might be using a different token
    // or have manually added an Authorization header
    const response = await axios.get("https://3.75.235.214/api/stories", {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });
    
    
    // Log the full response for debugging
    console.log("Raw API response:", response);
    
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    // Check if the response is a direct array (not wrapped in a data property)
    if (Array.isArray(response.data)) {
      console.log("Response is array:", response.data);
      return response.data;
    }
    
    // Fallback to checking for data property if not a direct array
    const storiesData = response.data.data || [];
    
    // Log the stories data for debugging
    console.log(`Found ${storiesData.length} stories`);
    
    return storiesData;
    
  } catch (error) {
    console.error("Error fetching stories:", error);
    // Add more detailed error information
    if (axios.isAxiosError(error)) {
      console.error("Request details:", {
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        },
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    return [];
  }
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
