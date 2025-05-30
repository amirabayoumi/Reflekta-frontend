import { EventData, CategoryData } from "./types";

interface registerData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface userData {
  email: string;
  password: string;
}

const AUTH_TOKEN = process.env.AUTH_TOKEN;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
});

export const fetchAllEvents = async (): Promise<EventData[]> => {
  try {
    const response = await fetch("http://3.75.235.214/api/events", {
      method: "GET",
      headers: getHeaders(),
      
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();
    let eventsData: EventData[] = [];

    if (result && result.data && Array.isArray(result.data)) {
      eventsData = result.data;
    }

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
    const response = await fetch(`http://3.75.235.214/api/events/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event by ID:", error);
    return undefined;
  }
};

export const fetchAllCategories = async (): Promise<CategoryData[]> => {
  try {
    const response = await fetch("http://3.75.235.214/api/categories", {
      method: "GET",
      headers: getHeaders(),
    });
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    const result = await response.json();

    return result.data || [];
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};

export const registerUser = async (registerData: registerData): Promise<unknown> => {
  try {
    const response = await fetch("http://3.75.235.214/api/register", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Registration failed: ${response.status} - ${message}`);
      return { success: false, message };
    }

    const result = await response.json();
    console.log("Registration response:", result);
    return result;
  } catch (error: unknown) {
    console.error("Error registering user:", error);
    let message = "Registration failed";
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }
    return { success: false, message };
  }
};

export const loginUser = async (userData: userData): Promise<unknown> => {
  try {
    const response = await fetch("http://3.75.235.214/api/login", {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const message = await response.text();
      console.error(`Login failed: ${response.status} - ${message}`);
      return { success: false, message };
    }
    const result = await response.json();
    console.log("Login response:", result);
    return result;
  } catch (error: unknown) {
    console.error("Error logging in user:", error);
    let message = "Login failed";
    if (error && typeof error === "object" && "message" in error) {
      message = (error as { message?: string }).message || message;
    }
    return { success: false, message };
  }
};

