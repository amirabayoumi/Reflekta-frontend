import {
  registerData,
  userData,
  LoginResponse,
  RegisterResponse,
  UserData,
  Story
} from "./types";
import https from 'https';
import axios, { AxiosResponse } from 'axios';


const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
});



const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});





export const registerUser = async (registerData: registerData): Promise<RegisterResponse> => {
  try {
    const response: AxiosResponse<RegisterResponse> = await axios.post(
      "https://inputoutput.be/api/register",
      registerData,
      {
        headers: {
          "Content-Type": "application/json",
          // No Authorization header for registration
        },
        httpsAgent: httpsAgent,
      }
    );

    if (response.status !== 200) {
      const message = response.data ? JSON.stringify(response.data) : `Registration failed with status ${response.status}`;
      return { success: false, message };
    }

    return response.data;
  } catch (error: unknown) {
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
    const response: AxiosResponse<LoginResponse> = await axios.post(
      "https://inputoutput.be/api/login",
      userData,
      {
        headers: {
          "Content-Type": "application/json",
          // No Authorization header for login
        },
        httpsAgent: httpsAgent,
      }
    );

    if (response.status !== 200) {
      const message = response.data ? JSON.stringify(response.data) : `Login failed with status ${response.status}`;
      return { success: false, message };
    }

    // Check for error response with "Invalid credentials" even if status is 200
    if (
      !response.data.success &&
      response.data.message === "Unauthorized" &&
      response.data.data &&
      typeof response.data.data === "object" &&
      "error" in response.data.data &&
      (response.data.data as { error?: string }).error === "Invalid credentials"
    ) {
      return response.data; // Return the exact error structure from the API
    }

    return response.data;
  } catch (error: unknown) {
    let message = "Login failed";

    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      (error as { response?: unknown }).response &&
      typeof (error as { response: unknown }).response === "object" &&
      "data" in (error as { response: { data?: unknown } }).response
    ) {
      const responseData = (error as { response: { data?: unknown } }).response.data;
      
      // If responseData is the exact format we're looking for, return it directly
      if (typeof responseData === "object" && responseData !== null &&
          "success" in responseData && "message" in responseData && "data" in responseData &&
          !responseData.success && 
          responseData.message === "Unauthorized" && 
          typeof responseData.data === "object" && responseData.data !== null &&
          "error" in responseData.data && 
          responseData.data.error === "Invalid credentials") {
        return responseData as LoginResponse;
      }
      
      message = JSON.stringify(responseData);
    } else if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }

    return { success: false, message };
  }
};



// Use fetch instead of axios and add a Next.js cache tag for revalidation
export const fetchUserData = async (token?: string): Promise<UserData | null> => {
  try {
    if (!token) {
      return null;
    }
    const res = await fetch("https://inputoutput.be/api/user", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      next: { tags: ["user-data"] },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data;
  } catch {
    return null;
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
    console.error(" Error generating ticket PDF:", error);
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
  } else {
    // Do nothing in non-browser environment
  }
}





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
    // Throw the error instead of returning null
    throw error;
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


export const addCommentToStory = async (
  storyId: number, 
  commentData: StoryComment,
  token: string 
): Promise<StoryCommentResponse | null> => {
  try {
    // No fallback to cookies, only use the provided token
    if (!token) {
      throw new Error("No authentication token provided");
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
    
    return response.data;
  } catch (error) {
    // Throw the error instead of returning null
    throw error;
  }
};


// userDashboard fetch async functions

export const fetchUserStories = async (id: number, token: string): Promise<Story[] | null> => {
  try {
    const res = await fetch(
      `https://inputoutput.be/api/users/${id}/stories`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        // Add a tag for Next.js cache revalidation
        next: { tags: ["user-stories"] },
      }
    );
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
};

export const fetchUserComments = async (id: number, token: string): Promise<StoryCommentResponse[] | null> => {
  try {
    const res = await fetch(
      `https://inputoutput.be/api/users/${id}/comments`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        next: { tags: ["user-comments"] },
      }
    );
    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
};


interface editStoryData {
  title: string;
  content: string;
}
//edit story
export const editStory = async (id: number, storyData: editStoryData, token: string): Promise<Story | null> => {
  try {
    const response = await axios.put(`https://inputoutput.be/api/stories/${id}`, storyData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    return response.data;
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
}

// delete story
export const deleteStory = async (id: number, token: string): Promise<boolean> => {
  try {
    const response = await axios.delete(`https://inputoutput.be/api/stories/${id}`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    return true;
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
}

// Edit comment
export const editComment = async (
  commentId: number,
  commentData: { content: string },
  token: string
): Promise<StoryCommentResponse | null> => {
  try {
    const response = await axios.put(
      `https://inputoutput.be/api/comments/${commentId}`,
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
    // Throw the error instead of just logging it
    throw error;
  }
};

// Delete comment
export const deleteComment = async (
  commentId: number,
  token: string
): Promise<boolean> => {
  try {
    const response = await axios.delete(
      `https://inputoutput.be/api/comments/${commentId}`,
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
    return true;
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
};









//post user profile photo post to https://inputoutput.be/api/update-profile-photo
export const uploadProfilePhoto = async (file: File, token: string): Promise<{ url: string; message: string } | null> => {
  try {
    const formData = new FormData();
    formData.append("profile_photo", file);

    const response = await axios.post("https://inputoutput.be/api/update-profile-photo", formData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

   return {
  url: response.data.profile_photo_url,
  message: response.data.message
};
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
};


// delete user profile 
export const deleteProfile = async (token: string , id: number): Promise<{ message: string } | null> => {
  try {
    const response = await axios.delete(`https://inputoutput.be/api/users/${id}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    return { message: response.data.message };
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
};

type UpdateUserData = {
  name?: string;


};

//edit user profile
export const editUserProfile = async (token: string , id: number, updatedUserData: UpdateUserData): Promise<{ message: string } | null> => {
  try {
    const response = await axios.patch(`https://inputoutput.be/api/users/${id}`, updatedUserData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      httpsAgent: httpsAgent,
    });
    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }
    return { message: response.data.message };
  } catch (error) {
    // Throw the error instead of just logging it
    throw error;
  }
}