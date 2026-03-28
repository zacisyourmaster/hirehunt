import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { BottomBar } from "@/components/BottomBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireHunt",
  description: "Job Tracking Website",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <html lang="en">
        {/* <QueryClientProvider client={queryClient}> */}
        <body
          className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased dark min-h-screen flex flex-col justify-between`}
        >
          <Navbar />
          {children}
          <BottomBar />
          <SpeedInsights />
        </body>
        {/* </QueryClientProvider> */}
      </html>
    </ClerkProvider>
  );
}
