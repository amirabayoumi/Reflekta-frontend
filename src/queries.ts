import { EventData, CategoryData } from "./types";
export const fetchAllEvents = async (): Promise<EventData[]> => {
  try {
    const response = await fetch("http://3.75.235.214/api/events", {
      //ensure that the request is refresh evey 1 hour
      next: { revalidate: 3600 },
   
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    let eventsData: EventData[] = [];

    if (result && result.data && Array.isArray(result.data)) {
      eventsData = result.data;}
   

    if (eventsData.length === 0) {
      console.warn("Could not extract events from API response:", result);
      return [];
    }

    return eventsData;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

export const fetchEventById = async (id: string): Promise<EventData | undefined> => {
  try {
    const response = await fetch(`http://3.75.235.214/api/events/${id}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
  }
};

export const fetchAllCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await fetch("http://3.75.235.214/api/categories");
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();
    
   return result.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
  } 
  return [];
}

