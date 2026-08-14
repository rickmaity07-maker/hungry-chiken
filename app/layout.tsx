import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/components/SiteProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hungry Chicken",
  description: "Restaurant Presentation",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SiteProvider>
          <Navbar />
          <main>{children}</main>
        </SiteProvider>
      </body>
    </html>
  );
}