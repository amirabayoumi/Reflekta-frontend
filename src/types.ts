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
  categories: CategoryData[];
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
  is_admin: number;
  email_verified_at: string | null;
  two_factor_secret: string | null;
  two_factor_recovery_codes: string | null;
  two_factor_confirmed_at: string | null;
  current_team_id: number | null;
  profile_photo_path: string | null;
  created_at: string;
  updated_at: string;
}



//  {
//     "id": 1,
//     "created_at": "2025-06-04T07:47:38.000000Z",
//     "updated_at": "2025-06-04T07:47:54.000000Z",
//     "title": "story",
//     "content": "test",
//     "user_id": 12,
//     "is_published": 1,
//     "comments": []
//   }

export interface Story {
  id: number;
  title: string;
  content: string;
  user_id: number;
  is_published: number;
  comments: StoryComment[];
  created_at: string;
  updated_at: string;
  user_name?: string;
  user?: {
    id: number;
    name: string;
    email?: string;
    is_admin?: number;
    email_verified_at?: string | null;
    two_factor_secret?: string | null;
    two_factor_recovery_codes?: string | null;
    two_factor_confirmed_at?: string | null;
    current_team_id?: number | null;
    profile_photo_path?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}

export interface StoryComment {
  id: number;
  user_id: number;
  story_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user_name?: string;
  user?: {
    id: number;
    name: string;
    email?: string;
    is_admin?: number;
    email_verified_at?: string | null;
    two_factor_secret?: string | null;
    two_factor_recovery_codes?: string | null;
    two_factor_confirmed_at?: string | null;
    current_team_id?: number | null;
    profile_photo_path?: string | null;
    created_at?: string;
    updated_at?: string;
  };
}

export type Message = {
  type: string;
  message: string;
};




export type SearchParamsEventPage = {
  location?: string;
  category?: string;
};



export interface DetailPageParams {
  id: string;
  slug: string;
}



export interface EventsClientWrapperProps {
  initialEvents: FormatedEvent[];
  categories: CategoryData[];
  locations: string[];
  initialLocationFilter?: string;
  initialCategoryFilter?: string;
}

export interface Event {
  id: string | number;
  title: string;
  location: string;
  startDate: string | number | Date;
  latitude: number;
  longitude: number;
  categories: string[];
}

export interface MapProps {
  events: Event[];
  center: [number, number];
  zoom: number;
}

export interface ReusableMapProps {
  events: EventData[]; 
  center: [number, number];
  zoom: number;
  className?: string;
}


export interface TicketGeneratorProps {
  event: {
    id: number | string;
    title: string;
    start_date: string;
    end_date: string;
    location: string;
    organizer?: string;
    duration?: string;
    startDate?: string;
    endDate?: string;
  };
}


export interface CarouselItem {
  imageUrl: string;
  title: string;
  link?: string;
}

export interface Carousel3DProps {
  items?: CarouselItem[];
  fixedRadius?: boolean;
}


export interface FloatingCirclesProps {
  stories: Story[];
}


export interface LoginFormProps {
  isShowLogin: boolean;
  onClose: () => void;
}


export interface AuthContextType {
  user: UserData | null;
  userStories?: Story[] | null;
  userComments?: StoryComment[] | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
  refreshUserData: () => Promise<void>;
}