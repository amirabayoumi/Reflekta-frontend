import type { Metadata } from "next";
import { Alef } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../contexts/LanguageContext";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
const alef = Alef({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-alef",
});

export const metadata: Metadata = {
  title: "Reflekta",
  description: "one world, many reflections.",
  keywords: [
    "Reflekta",
    "community",
    "events",
    "integration",
    "diversity",
    "belgium",
    "cultural exchange",
    "social impact",
    "local events",
    "community building",
    "cultural diversity",
    "cultural integration",
    "cultural events",
  ],
  icons: {
    icon: [{ url: "/logo.png", type: "image/png", sizes: "32x32" }],
  },
  openGraph: {
    title: "Reflekta",
    description: "one world, many reflections.",
    siteName: "Reflekta",
    images: [
      {
        url: "https://res.cloudinary.com/djuqnuesr/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1746640579/R_4_jz8tja.png",
        width: 1000,
        height: 1000,
        alt: "Reflekta",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add this to avoid unnecessary preloading */}
        <meta name="next-size-adjust" />
      </head>
      <body className={`${alef.variable}  antialiased`}>
        <LanguageProvider>
          <AuthProvider>
            {children} <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
