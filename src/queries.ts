import { EventData, CategoryData } from "./types";
import https from 'https';
import axios, { AxiosResponse } from 'axios';

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

interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    name: string;
  };
  message?: string;
}

interface RegisterResponse {
  success: boolean;
  message?: string;
}

const AUTH_TOKEN = process.env.AUTH_TOKEN;

const getHeaders = () => ({
  "Content-Type": "application/json",
  "Authorization": `Bearer ${AUTH_TOKEN}`,
});

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

export const fetchAllEvents = async (): Promise<EventData[]> => {
  try {
    const response = await axios.get("https://3.75.235.214/api/events", {
      headers: getHeaders(),
      httpsAgent: httpsAgent,
    });

    if (response.status !== 200) {
      throw new Error(`API Error: ${response.status}`);
    }

    let eventsData: EventData[] = [];

    if (response.data && response.data.data && Array.isArray(response.data.data)) {
      eventsData = response.data.data;
    }

    if (eventsData.length === 0) {
      console.warn("Could not extract events from API response:", response.data);
      return [];
    }

    return eventsData;
  } catch (error: unknown) {
    console.error("Error fetching events:", error);
    return [];
  }
};

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

