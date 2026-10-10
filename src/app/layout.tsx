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
  title: "KMC Connect | Karachi Citizen Complaint Portal",
  description: "Official portal for Karachi citizens to report civic issues, track complaint statuses (SLA), and stay updated on KMC announcements.",
  keywords: ["Karachi", "KMC Connect", "Complaint Portal", "Civic Services", "Sindh Government", "KMC Services", "Karachi Metropolitan Corporation"],
  openGraph: {
    title: "KMC Connect | Karachi Citizen Portal",
    description: "Report civic issues like water, power, and road damage directly to KMC. Track your complaints with a robust 48-hour SLA system.",
    url: appUrl,
    siteName: "KMC Connect",
  },
  twitter: {
    card: "summary_large_image",
    title: "KMC Connect | Karachi Citizen Portal",
    description: "Official portal for Karachi citizens to report and track civic issues.",
  },
}
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








