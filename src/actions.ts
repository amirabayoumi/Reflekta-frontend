"use server";

import { revalidateTag } from "next/cache";
import { getTicketPdf, addNewStory, addCommentToStory, editStory, deleteStory, editComment, deleteComment } from "./queries";
import { uploadProfilePhoto, deleteProfile, editUserProfile } from "./queries";

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