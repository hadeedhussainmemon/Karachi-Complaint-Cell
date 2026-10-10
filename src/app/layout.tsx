import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import BottomNav from "@/components/BottomNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://kmc-connect.gov.pk";

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: "KMC Connect | Government & Citizen Complaint Portal",
  description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Karachi.",
  keywords: ["Karachi", "Complaint Portal", "Civic Services", "Saddar", "Lyari", "KMC Services"],
  openGraph: {
    title: "KMC Connect | Government & Citizen Portal",
    description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Karachi.",
    url: appUrl,
    siteName: "KMC Connect",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "KMC Connect Portal Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "KMC Connect | Government & Citizen Portal",
    description: "Report civic issues, track complaint statuses, explore tourist locations, and stay updated on announcements in Karachi.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-brand-light text-foreground dark:bg-brand-dark pb-16 md:pb-0">
        <Providers>
          {children}
        <BottomNav />
        </Providers>
      </body>
    </html>
  );
}





