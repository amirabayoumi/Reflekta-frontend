# Reflekta - A Cultural Bridge in Belgium

![Reflekta Logo](https://res.cloudinary.com/djuqnuesr/image/upload/v1746640579/R_4_jz8tja.png)

**Reflekta** is a full-stack web application designed to connect locals and newcomers in Belgium through storytelling, events, and community engagement. The platform serves as a cultural bridge, helping diverse communities understand each other by celebrating differences and creating genuine human connections.

> *"One world, many reflections."*

---

## ✨ Features

### Stories Platform
- **Interactive Floating Visualization**: Animated bubbles represent stories in an engaging, interactive display
- **Story Creation & Management**: Users can create, edit, and delete their personal stories
- **Comments System**: Engage with stories through comments with full CRUD functionality
- **Content Moderation**: Backend validation and content filtering system prevents inappropriate content

### Events System
- **Event Discovery**: Browse cultural and community events with filtering options
- **Interactive Map Integration**: Locate events using Leaflet maps with custom markers
- **PDF Ticket Generation**: Generate and download event tickets using Supabase Edge Functions
- **Event Details**: Comprehensive event information with dates, times, and descriptions

### User Experience
- **Profile Dashboard**: Personalized dashboard with activity tracking and content management
- **Profile Photo Management**: Upload and manage profile photos with server-side validation
- **Responsive UI**: Fully responsive design across mobile, tablet, and desktop devices
- **Authentication**: Secure token-based authentication with localStorage persistence

### Community Tools
- **Community Hub**: Main navigation area for accessing all platform features
- **About & Mission**: Information pages explaining the project's goals
- **Privacy Policy**: Clear documentation of data handling practices
- **Contact Form**: Easy way for users to get in touch with administrators

---

## 🛠️ Technologies

### Frontend
- **Next.js 15**: App Router architecture with hybrid rendering strategies
- **TypeScript**: Strongly-typed code with comprehensive type definitions
- **Tailwind CSS**: Utility-first styling with custom gradient and animation extensions
- **React Context**: Global state management for authentication and user data
- **React Server Components**: For improved performance and SEO
- **Server Actions**: Type-safe form submissions and data mutations

### UI Components
- **Shadcn UI**: Accessible component system with Radix UI primitives
- **Lucide Icons**: Comprehensive icon library
- **Motion Components**: Animation and transition effects
- **Custom UI Elements**: Purpose-built components for stories, events, and user profiles

### Data & API
- **Server-Side Fetching**: With revalidation tags for efficient caching
- **Token-based Authentication**: Secure user sessions
- **Form Validation**: Client and server-side validation with error handling
- **Image Processing**: Profile photo upload and optimization

### External Services
- **REST API Integration**: Connection to Laravel backend
- **Leaflet Maps**: Interactive geographical mapping
- **Supabase Edge Functions**: Serverless functions for PDF ticket generation
- **SMTP Email Integration**: For contact form submissions

---

## 📸 Screenshots



- Home Page
  ![HomePage](/public/landing-page.png)
  
- Community Hub
 ![Community Hub](/public/comhub.png)

- Floating Stories Page
  ![stories](/public/floatstories.png)
 - Story with Comments 
  ![story](/public/story.png)

- Events Page 
  ![events](/public/events.png)
- Event Details
  ![event](/public/event.png)
  
- User Dashboard
  ![profile](/public/user.png)
  ![activity](/public/user-activity.png)
  ![user-stories](/public/user-story.png)


---

## 🚀 Getting Started



### Installation

1. Clone the repository:
  

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_AUTH_TOKEN=your_api_token
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_TOKEN_SECRET=your_secret_key
   SUPABASE_KEY=your_supabase_key
   BAD_WORDS=comma,separated,list,of,bad,words
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

---

## 🛠️ Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
NEXT_PUBLIC_AUTH_TOKEN=your_api_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_TOKEN_SECRET=your_secret_key
SUPABASE_KEY=your_supabase_key
BAD_WORDS=bad,words,example,comma,separated

# Email configuration for contact forms
EMAIL_SERVER=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=example@email.com
EMAIL_PASSWORD=example_password
EMAIL_FROM=example@email.com
```

- `NEXT_PUBLIC_AUTH_TOKEN`: API token for backend authentication
- `NEXT_PUBLIC_BASE_URL`: Base URL for the frontend
- `NEXT_PUBLIC_TOKEN_SECRET`: Secret key for token encoding/decoding
- `SUPABASE_KEY`: Supabase Edge Function key for PDF generation
- `BAD_WORDS`: Comma-separated list of words to filter from user content
- `EMAIL_*`: SMTP configuration for sending emails from contact forms

---

##  Project Structure

```
frontend/
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── community-hub/  # Community hub section
│   │   ├── dashboard/      # User dashboard
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── privacy/        # Privacy policy page
│   ├── components/         # Reusable components
│   │   ├── communityComponents/
│   │   ├── eventsComponents/
│   │   ├── homeComponents/
│   │   ├── storiesComponents/
│   │   ├── userDashboardComponent/
│   │   ├── ui/             # UI components
│   ├── actions.ts          # Server actions
│   ├── contexts/           # Context providers
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utility functions
│   ├── queries.ts          # API integration
│   ├── types.ts            # TypeScript interfaces
├── public/                 # Static assets
├── .env                    # Environment variables
├── next.config.ts          # Next.js configuration
└── README.md
```

---

##  State Management

Reflekta uses a combination of:
- **AuthContext**: Manages user authentication state
- **Server Actions**: Handles data mutations
- **Server-Side Data Fetching**: For initial page loads
- **Client-Side Hooks**: For dynamic data requirements

---

##  Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interaction
- Optimized images and assets

---

##  Security Features

- Token-based authentication
- Content filtering for inappropriate language
- Input validation
- Protected routes


---


##  Acknowledgements

- Icons by [Lucide](https://lucide.dev/)
- Maps integration using [Leaflet](https://leafletjs.com/)
- UI components by [Shadcn UI](https://ui.shadcn.com/)
- 3D Carousel by [StarKnightt/3D-Carousel](https://github.com/StarKnightt/3D-Carousel)
- Floating Stories inspired by [AMoumni on CodePen](https://codepen.io/AMoumni/pen/WNOWYzb)

---

*Created with ❤️ by Amira Bayoumi*

