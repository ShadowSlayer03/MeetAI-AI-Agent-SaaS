import type { Metadata } from "next";
import { Lato, Nunito } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { NuqsAdapter } from "nuqs/adapters/next";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Heading font - Sans
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miva AI | Your AI Meeting Assistant",
  description:
    "Miva AI joins your meetings as a coach, salesperson, or instructor to supercharge productivity.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Miva AI",
    description:
      "AI-powered meeting assistant that acts as your coach, salesperson, and instructor.",
    url: "https://miva.ai",
    siteName: "Miva AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Miva AI",
    description: "Your AI-powered meeting assistant",
    images: ["/twitter-image.png"],
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
        <link rel="icon" href="/logo.svg" />
      </head>
      <body
        className={`${nunito.variable} ${lato.variable} antialiased bg-white text-gray-900`}
      >
        <NuqsAdapter>
          <TRPCReactProvider>
            <Toaster />
            {children}
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
