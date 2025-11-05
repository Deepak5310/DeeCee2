import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DEECEE HAIR - Premium Hair Extensions | 100% Authentic Quality",
  description: "Shop premium quality hair extensions at DEECEE HAIR. Silky straight, wavy, curly extensions for women & men. 100% authentic with free shipping on orders above ₹5000. Book free consultation.",
  keywords: [
    "hair extensions",
    "premium hair extensions",
    "hair extensions india",
    "silky straight hair",
    "wavy hair extensions",
    "curly hair extensions",
    "natural hair extensions",
    "remy hair extensions",
    "human hair extensions",
    "hair extensions for women",
    "hair extensions for men",
    "deecee hair",
    "authentic hair extensions",
    "quality hair extensions",
    "hair extension consultation",
    "hair extensions online india"
  ],
  authors: [
    { name: "DEECEE HAIR" },
    { name: "Deepak", url: "https://github.com/Deepak5310" }
  ],
  creator: "Deepak",
  publisher: "DEECEE HAIR",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.deeceehairs.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "DEECEE HAIR - Premium Hair Extensions",
    description: "Shop premium quality hair extensions - Silky straight, wavy, curly. 100% authentic with free shipping on orders above ₹5000.",
    url: 'https://www.deeceehairs.com',
    siteName: 'DEECEE HAIR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DEECEE HAIR - Premium Hair Extensions',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DEECEE HAIR - Premium Hair Extensions',
    description: 'Shop premium quality hair extensions - 100% authentic with free shipping',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification=IvfBdZ1nEtZIEYVSRJkTt9YwcnxP9XrBPqiVoQDevLI', // Add your Google Search Console verification
  },
  category: 'E-commerce',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Maintenance mode toggle
  // Set `NEXT_PUBLIC_MAINTENANCE_MODE=true` (or `MAINTENANCE_MODE=true`) in the environment to enable.
  const MAINTENANCE =
    process.env.NEXT_PUBLIC_MAINTENANCE_MODE === 'true' ||
    process.env.MAINTENANCE_MODE === 'true';

  if (MAINTENANCE) {
    // Return a minimal, SEO-friendly maintenance page for all visitors.
    return (
      <html lang="en">
        <head>
          <meta name="robots" content="noindex" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Website temporarily offline — DEECEE HAIR</title>
        </head>
        <body className="min-h-screen bg-white text-gray-900 flex items-center justify-center p-6">
          <div className="max-w-xl text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-500 mb-4">We'll be back soon</h1>
            <p className="text-gray-700 mb-6">Our website is temporarily offline for maintenance. We're working to bring it back online — thank you for your patience.</p>
            <p className="text-sm text-gray-500 mb-4">If you need immediate help, email us at <a href="mailto:deeceehair0@gmail.com" className="underline text-brand-500">deeceehair0@gmail.com</a> or message on WhatsApp.</p>
            <p className="text-xs text-gray-400">© {new Date().getFullYear()} DEECEE HAIR. All rights reserved.</p>
          </div>
        </body>
      </html>
    );
  }
  // Structured Data for SEO (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DEECEE HAIR',
    url: 'https://www.deeceehairs.com',
    logo: 'https://www.deeceehairs.com/logo.png',
    description: 'Premium quality hair extensions for women and men',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'deeceehair0@gmail.com',
    },
    sameAs: [
      'https://www.instagram.com/deeceehair',
      'https://www.facebook.com/deeceehair',
      'https://www.youtube.com/deeceehair',
    ],
  };

  const websiteStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DEECEE HAIR',
    url: 'https://www.deeceehairs.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://www.deeceehairs.com/shop?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteStructuredData) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
