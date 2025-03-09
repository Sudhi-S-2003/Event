import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Event Register | Find & Join Events Easily",
  description: "Discover and register for exciting events near you. Join the community and never miss an event!",
  keywords: "event registration, online events, find events, book events, event platform",
  authors: [{ name: "Sudhi S",  }], 

};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <main className="">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
