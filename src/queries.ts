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
    // if (response.data.success && response.data.data?.token) {

    //   console.log("Login successful, returning token");
    // }

    return response.data;
  } catch (error: unknown) {
    // console.error("Error logging in user:", error);
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



// Use fetch instead of axios and add a Next.js cache tag for revalidation
export const fetchUserData = async (token?: string): Promise<UserData | null> => {
  try {
    if (!token) {
      console.warn("No token provided to fetchUserData");
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
    console.log("User data fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
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
    
   
    return response.data;
  } catch (error) {
    console.error("Error adding comment to story:", error);
    return null;
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
    if (!res.ok) return null;
    // Optionally revalidate after mutation elsewhere:
    // revalidateTag("user-stories");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user stories:", error);
    return null;
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
    if (!res.ok) return null;
    // Optionally revalidate after mutation elsewhere:
    // revalidateTag("user-comments");
    return await res.json();
  } catch (error) {
    console.error("Error fetching user comments:", error);
    return null;
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
    console.error("Error editing story:", error);
    return null;
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
    console.error("Error deleting story:", error);
    return false;
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
    console.error("Error editing comment:", error);
    return null;
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
    console.error("Error deleting comment:", error);
    return false;
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
    console.error("Error uploading profile photo:", error);
    return null;
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
    console.error("Error deleting profile photo:", error);
    return null;
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
    console.error("Error editing user profile:", error);
    return null;
  }
}