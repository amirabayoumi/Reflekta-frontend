"use server";


import { revalidatePath } from "next/cache";
import { getTicketPdf, addNewStory, addCommentToStory } from "./queries";

type initialStateType = {
  type: string;
  message: string;
  pdfData: string;
};

export async function downloadTicket(initialState: initialStateType , formData: FormData) {
  try {
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

// type NewStoryData = {
//   title: string;
//   content: string;
//   user_id: number;
// };

type initialStoryStateType = {
  type: string;
  message: string;

};

export async function addNewStoryAction(initialState: initialStoryStateType, formData: FormData) {
  try {
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const userId = formData.get("userId") as string;

    // Validate inputs
    if (!title || !content || !userId) {
      return { type: "error", message: "All fields are required." };
    }

  
 
 

    await addNewStory({
      title: title,
      content: content,
      user_id: parseInt(userId),
    });
    

    return { type: "success", message: "Story added successfully!" };
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
    if( !token ) {
      return { type: "error", message: "Authentication issue." };
    }

    // Call the query to add the comment
    await addCommentToStory(
      parseInt(storyId),
      { content: content },
      token 

    );


  revalidatePath(`/community-hub/stories/${storyId}`);

    return { type: "success", message: "Comment added successfully!" };
  } catch (error) {
    console.error("Error adding comment:", error);
    return { type: "error", message: "Failed to add comment." };
  }
}