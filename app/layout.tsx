import type { Metadata } from "next";
import { Geist_Mono, Montserrat } from "next/font/google";
import { siteConfig } from "@/lib/seo";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Talal Majeed | Senior Software Engineer",
    template: "%s | Talal Majeed",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Talal Majeed | Senior Software Engineer",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: "Talal Majeed | Senior Software Engineer",
    description: siteConfig.description,
  },
  icons: {
    icon: "./favicon-v2.ico",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Talal Majeed",
  url: siteConfig.url,
  sameAs: [
    "https://www.linkedin.com/in/talalmajeed/",
    "https://www.upwork.com/freelancers/muhammadtalalm",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd),
          }}
        />
        {children}
      </body>
    </html>
  );
}
