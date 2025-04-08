import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppProvider } from "./AppProvider";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import { getUserSession } from "@/actions/auth";
import { redirect } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Languageloop Assignment",
  description: "A simple assignment to test your skills",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  const response = await getUserSession();
  const user = response?.user;
  // if (!user){
  //   redirect("/auth/login");
  // }

  return (
    <html lang="en">
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          `min-h-screen bg-background font-sans antialiased`
        )}
      >
        <AppProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </AppProvider>
      </body>
    </html>
  );
}
