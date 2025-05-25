
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