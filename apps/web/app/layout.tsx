import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ARCE Marketing",
  description: "Your go to tech shop",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              padding: "12px 16px",
              borderRadius: "10px",
              fontSize: "14px",
              fontWeight: 500,
            },
            success: {
              style: {
                background: "#064e3b",
                color: "white",
              },
              iconTheme: {
                primary: "#10b981",
                secondary: "#ecfdf5",
              },
            },
            error: {
              style: {
                background: "#7f1d1d", // red-900
              },
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fef2f2",
              },
            },
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
