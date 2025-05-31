export interface Categories {
  data: CategoryData[]
}

export interface CategoryData {
  id: number
  name: string
  description?: string
  created_at: string
  updated_at: string
}


export interface Events {
  data: EventData[]
 
}

export interface EventData{
  id: number
  title: string
  description: string
  location: string
  latitude: number
  longitude: number
  start_date: string
  end_date: string
  organizer: string
  categories: CategoryData[]
  created_at: string
  updated_at: string
}


export type FormatedEvent = {
  id: number;
  title: string;
  description: string;
  location: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  organizer: string;
  categories: string[];
  created_at: string;
  updated_at: string;
};

export interface registerData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface userData {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    token: string;
    name: string;
  };
  message?: string;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  two_factor_secret: string | null;
  two_factor_recovery_codes: string | null;
  two_factor_confirmed_at: string | null;
  current_team_id: number | null;
  profile_photo_path: string | null;
  created_at: string;
  updated_at: string;
}



