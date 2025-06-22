import type { Metadata } from "next";
import { Alef } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
const alef = Alef({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-alef",
});

export const metadata: Metadata = {
  title: "Reflekta",
  description:
    "a cultural bridge in Belgium, connecting locals and newcomers through shared stories and experiences.",
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
    description:
      "a cultural bridge in Belgium, connecting locals and newcomers through shared stories and experiences.",
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
        <meta name="next-size-adjust" />
      </head>
      <body className={`${alef.variable}  antialiased`}>
        <AuthProvider>
          {children} <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
