"use server";

import { revalidateTag } from "next/cache";
import { getTicketPdf, addNewStory, addCommentToStory, editStory, deleteStory, editComment, deleteComment } from "./queries";
import { uploadProfilePhoto, deleteProfile, editUserProfile } from "./queries";
import { loginUser, registerUser } from "./queries";

const badWords = (process.env.BAD_WORDS || "").split(",");

function containsBadWords(text: string): boolean {
  const lowercaseText = text.toLowerCase();
  return badWords.some(word => 
    lowercaseText.includes(word) || 
    lowercaseText.match(new RegExp(`\\b${word.split('').join('[^a-zA-Z0-9]*')}\\b`))
  );
}

type initialStateType = {
  type: string;
  message: string;
  pdfData: string;
};

export async function downloadTicket(initialState: initialStateType, formData: FormData) {
  try {
    if (formData.get("reset") === "true") {
      return { type: "", message: "", pdfData: "" };
    }

    const eventName = formData.get("eventname") as string;
    const numberOfAdults = Number(formData.get("numberOfAdults") || 1);
    
    // Generate the PDF blob on the server side
    const pdfBlob = await getTicketPdf({ 
      eventName, 
      numberOfAdults 
    });
    
    // Convert blob to base64 to pass to client
    const buffer = Buffer.from(await pdfBlob.arrayBuffer());
    const base64Data = buffer.toString('base64');
    
    return { 
      type: "success", 
      message: "Ticket generated successfully!", 
      pdfData: base64Data 
    };
  } catch (error: unknown) {
    console.error("Error in downloadTicket action:", error);
    return {
      type: "error",
      message: `Error generating ticket: ${typeof error === "object" && error !== null && "message" in error ? (error as { message: string }).message : String(error)}`,
      pdfData: ""
    };
  }
}

type initialStoryStateType = {
  type: string;
  message: string;
};

export async function addNewStoryAction(initialState: initialStoryStateType, formData: FormData) {
  try {
    if (formData.get("reset") === "true") {
      return { message: "", type: "" };
    }
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;

    // Validate inputs
    if (!title || !content || !userId) {
      return { type: "error", message: "All fields are required." };
    }

    // Check for bad words in title and content
    if (containsBadWords(title)) {
      return { type: "error", message: "Your story title contains inappropriate language. Please revise and try again." };
    }
    
    if (containsBadWords(content)) {
      return { type: "error", message: "Your story content contains inappropriate language. Please revise and try again." };
    }

    await addNewStory({
      title: title,
      content: content,
      user_id: parseInt(userId),
    });

    revalidateTag("story");
    revalidateTag("stories");
    revalidateTag("user-stories"); 
    revalidateTag("user-data");

    return { type: "success", message: "Story added successfully! Admin will review it first and shortly publish it." };
  } catch (error) {
    console.error("Error adding new story:", error);
    return { type: "error", message: "Failed to add story." };
  }
}

export async function addCommentToStoryAction(
  initialState: initialStoryStateType,
  formData: FormData
) {
  try {
    const storyId = formData.get("storyId") as string;
    const content = formData.get("content") as string;
    const token = formData.get("token") as string;

    // Validate inputs
    if (!storyId || !content ) {
      return { type: "error", message: "All fields are required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    // Check for bad words in comment content
    if (containsBadWords(content)) {
      return { type: "error", message: "Your comment contains inappropriate language. Please revise and try again." };
    }

    // Call the query to add the comment
    await addCommentToStory(
      parseInt(storyId),
      { content: content },
      token 
    );

    // Revalidate the path tags: ["story"]
    revalidateTag("stories");
    revalidateTag("user-data"); 
    return { type: "success", message: "Comment added successfully!" };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { type: "error", message: "Failed to add comment." };
  }
}

export async function editStoryAction(
  initialState: initialStoryStateType,
  formData: FormData
) {
  try {
    const storyId = formData.get("storyId") as string;
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const token = formData.get("token") as string;

    // Validate inputs
    if (!storyId || !title || !content) {
      return { type: "error", message: "All fields are required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    // Check for bad words in title and content
    if (containsBadWords(title)) {
      return { type: "error", message: "Your story title contains inappropriate language. Please revise and try again." };
    }
    
    if (containsBadWords(content)) {
      return { type: "error", message: "Your story content contains inappropriate language. Please revise and try again." };
    }

    const stroyData = {
      title: title,
      content: content,
    };
    
    // Call the query to edit the story
    await editStory(
      parseInt(storyId),
      stroyData,
      token
    );

    revalidateTag("story");
    revalidateTag("stories");
    revalidateTag("user-stories"); 
    revalidateTag("user-data");

    return { type: "success", message: "Story edited successfully!" };
  } catch (error) {
    console.error("Error editing story:", error);
    return { type: "error", message: "Failed to edit story." };
  }
}

export async function deleteStoryAction(
  initialState: initialStoryStateType,
  formData: FormData
) {
  try {
    const storyId = formData.get("storyId") as string;
    const token = formData.get("token") as string;

    // Validate inputs
    if (!storyId) {
      return { type: "error", message: "Story ID is required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    // Call the query to delete the story
    await deleteStory(parseInt(storyId), token);

    // Revalidate both tags
    revalidateTag("story");
    revalidateTag("stories");
    revalidateTag("user-stories"); 
    revalidateTag("user-data");
 
    return({ type: "success", message: "Story deleted successfully!" });
  } catch (error) {
    console.error("Error deleting story:", error);
    return { type: "error", message: "Failed to delete story." };
  }
}

export async function editCommentAction(
  initialState: initialStoryStateType,
  formData: FormData
) {
  try {
    const commentId = formData.get("commentId") as string;
    const content = formData.get("content") as string;
    const token = formData.get("token") as string;

    if (!commentId || !content) {
      return { type: "error", message: "All fields are required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    // Check for bad words in comment content
    if (containsBadWords(content)) {
      return { type: "error", message: "Your comment contains inappropriate language. Please revise and try again." };
    }

    const result = await editComment(
      parseInt(commentId),
      { content },
      token
    );

    if (!result) {
      return { type: "error", message: "Failed to edit comment." };
    }

    revalidateTag("user-comments"); 
    revalidateTag("story");
    revalidateTag("stories");
    revalidateTag("user-stories"); 
    revalidateTag("user-data");

    return { type: "success", message: "Comment edited successfully!" };
  } catch (error) {
    console.error("Error editing comment:", error);
    return { type: "error", message: "Failed to edit comment." };
  }
}

export async function deleteCommentAction(
  initialState: initialStoryStateType,
  formData: FormData
) {
  try {
    const commentId = formData.get("commentId") as string;
    const token = formData.get("token") as string;

    if (!commentId) {
      return { type: "error", message: "Comment ID is required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    const result = await deleteComment(parseInt(commentId), token);

    if (!result) {
      return { type: "error", message: "Failed to delete comment." };
    }

    revalidateTag("user-comments"); 
    revalidateTag("story");
    revalidateTag("stories");
    revalidateTag("user-stories"); 
    revalidateTag("user-data");
    
    return { type: "success", message: "Comment deleted successfully!" };
  } catch (error) {
    console.error("Error deleting comment:", error);
    return { type: "error", message: "Failed to delete comment." };
  }
}

export async function uploadProfilePhotoAction( 
  initialState: { type: string; message: string },
  formData: FormData
) {
  try {
    const file = formData.get("file") as File;
    const token = formData.get("token") as string;

    if (!file) {
      return { type: "error", message: "File is required." };
    }
    
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }
    
    // Add size validation on server side too
    const maxSizeInMB = 1;
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    
    if (file.size > maxSizeInBytes) {
      return { type: "error", message: `Image must be less than ${maxSizeInMB}MB.` };
    }
    
    if (!file.type.startsWith("image/")) {
      return { type: "error", message: "Please select an image file." };
    }

    const result = await uploadProfilePhoto(file, token);

    if (!result) {
      return { type: "error", message: "Failed to upload profile photo. be sure to upload a .jpg or .png file with a maximum size of 1MB" };
    } 

    revalidateTag("user-data");
    revalidateTag("stories");
    revalidateTag("story");
  
    return { type: "success", message: "Profile photo uploaded successfully!" };
  }
  catch (error) {
    console.error("Error uploading profile photo:", error);
    return { 
      type: "error", 
      message: error instanceof Error 
        ? `Error: ${error.message}` 
        : "Failed to upload profile photo."
    };
  }
}

export async function deleteProfileAction(
  initialState: { type: string; message: string },
  formData: FormData
) {
  try {
    const token = formData.get("token") as string;
    const id = formData.get("id") as string;

    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    const result = await deleteProfile(token, parseInt(id));
    if (!result) {
      return { type: "error", message: "Failed to delete profile." };
    }

    revalidateTag("user-data");
    return { type: "success", message: "Profile deleted successfully!" };
  } catch (error) {
    console.error("Error deleting profile:", error);
    return { type: "error", message: "Failed to delete profile." };
  }
}

export async function editUserProfileAction(
  initialState: { type: string; message: string },
  formData: FormData
) {
  try {
    const name = formData.get("name") as string;
    const token = formData.get("token") as string;
    const id = formData.get("id") as string;

    if (!name) {
      return { type: "error", message: "Name are required." };
    }
    if (!token) {
      return { type: "error", message: "Authentication issue." };
    }

    // Check for bad words in name
    if (containsBadWords(name)) {
      return { type: "error", message: "Your profile name contains inappropriate language. Please choose a different name." };
    }

    const result = await editUserProfile(token, parseInt(id), {
      name: name,
    });

    if (!result) {
      return { type: "error", message: "Failed to edit profile." };
    }

    revalidateTag("user-data");
    revalidateTag("stories");
    revalidateTag("story");

    return { type: "success", message: "Profile edited successfully!" };
  } catch (error) {
    console.error("Error editing profile:", error);
    return { type: "error", message: "Failed to edit profile." };
  }
}

export async function loginUserAction(
  initialState: { type: string; message: string; token: string },
  formData: FormData
) {
  try {
    // Check if this is a reset request
    if (formData.get("reset") === "true") {
      return { type: "", message: "", token: "" };
    }
    
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { type: "error", message: "Please enter a valid email address", token: "" };
    }

    const response = await loginUser({ email, password });

    if (response.success && response.data?.token) {
      return { type: "success", message: "Successfully logged in!", token: response.data.token };
    } else {
      // Check if the error is the specific "Invalid credentials" message
      if (response.message === "Unauthorized" && 
          response.data && 
          response.data.error === "Invalid credentials") {
        return { 
          type: "error", 
          message: "Invalid email or password. Please try again.", 
          token: "" 
        };
      }
      
      return { 
        type: "error", 
        message: response.message || "Invalid email or password", 
        token: "" 
      };
    }
  } catch (error) {
    console.error("Login error:", error);
    
    // Check for the specific error structure from the API
    interface ErrorWithResponse {
      response?: {
        data?: {
          success?: boolean;
          message?: string;
          data?: {
            error?: string;
          }
        };
      };
      message?: string;
    }
    
    const typedError = error as ErrorWithResponse;
    
    if (typedError.response?.data) {
      const responseData = typedError.response.data;
      
      // Check for the "Invalid credentials" error pattern
      if (responseData.message === "Unauthorized" && 
          responseData.data?.error === "Invalid credentials") {
        return { 
          type: "error", 
          message: "Invalid email or password. Please try again.", 
          token: "" 
        };
      }
      
      if (responseData.message) {
        return { type: "error", message: responseData.message, token: "" };
      }
    }
    
    let errorMessage = "Login failed. Please try again.";
    
    if (error && typeof error === "object" && "message" in error) {
      errorMessage = (error as { message: string }).message;
    }
    
    return { type: "error", message: errorMessage, token: "" };
  }
}

export async function registerUserAction(
  initialState: { type: string; message: string },
  formData: FormData
) {
  try {
    // Check if this is a reset request
    if (formData.get("reset") === "true") {
      return { type: "", message: "" };
    }
    
    const name = formData.get("username")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const confirmPassword = formData.get("confirmPassword")?.toString() || "";

    // Check for bad words in username
    if (containsBadWords(name)) {
      return { type: "error", message: "Your username contains inappropriate language. Please choose a different username." };
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { type: "error", message: "Please enter a valid email address" };
    }

    // Password validation
    if (password !== confirmPassword) {
      return { type: "error", message: "Passwords do not match" };
    }

    if (password.length < 6) {
      return { type: "error", message: "Password must be at least 6 characters long" };
    }

    const userData = {
      name,
      email,
      password,
      confirm_password: confirmPassword,
    };

    const result = await registerUser(userData);

    if (result.success) {
      return { type: "success", message: "Registration successful!" };
    } else {
      // Check for common error messages in the response
      if (result.message) {
        if (
          result.message.includes("Duplicate entry") ||
          result.message.includes("already exists") ||
          result.message.includes("Integrity constraint violation") ||
          result.message.includes("users_email_unique")
        ) {
          return { 
            type: "error", 
            message: "This email is already registered. Please use a different email or sign in." 
          };
        } else {
          return { type: "error", message: result.message };
        }
      } else {
        return { type: "error", message: "Registration failed" };
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
    
    // Enhanced error handling for duplicate emails with better type safety
    if (error && typeof error === "object") {
      let errorMsg = "Registration failed";
      
      // Define interface for common error shapes
      interface ErrorWithResponse {
        response?: {
          data?: unknown;
        };
        message?: string;
      }
      
      const typedError = error as ErrorWithResponse;
      
      // Check for response data in the error
      if (typedError.response && typedError.response.data) {
        const responseData = typedError.response.data;
        
        if (typeof responseData === "string" && (
          responseData.includes("Duplicate entry") || 
          responseData.includes("users_email_unique") ||
          responseData.includes("Integrity constraint violation")
        )) {
          return { 
            type: "error", 
            message: "This email is already registered. Please use a different email or sign in." 
          };
        }
      }
      
      // Check for error message
      if (typedError.message && typeof typedError.message === "string") {
        const msg = typedError.message;
        if (
          msg.includes("Duplicate") ||
          msg.includes("unique") ||
          msg.includes("Integrity constraint") ||
          msg.includes("1062") ||
          msg.includes("UniqueConstraintViolationException")
        ) {
          return { 
            type: "error", 
            message: "This email is already registered. Please use a different email or sign in." 
          };
        } else {
          // Update errorMsg if we have a message but it's not about duplicate emails
          errorMsg = msg;
        }
      }
      
      // Use the errorMsg variable
      return { type: "error", message: errorMsg };
    }
    
    return { type: "error", message: "Registration failed. Please try again." };
  }
}