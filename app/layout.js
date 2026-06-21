import { Geist, Geist_Mono } from "next/font/google";
import localFont from 'next/font/local';
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bitcount = localFont({
  src: './fonts/BitcountPropSingle-Variable.ttf',
  variable: '--font-bitcount-var',
  weight: '100 900',
  style: 'normal',
});

export const metadata = {
  title: "DishTV Universal Remote | Smart Control & Voice Search | Interactive Prototype",
  description: "Experience the next generation of entertainment control with the DishTV Universal Remote. Featuring voice search, ergonomic design, and seamless compatibility. Interactive prototype by Surakshith.",
  keywords: ["DishTV Remote", "Universal Remote", "Smart TV Control", "Voice Search Remote", "DishTV India", "DTH Accessories", "Interactive Portfolio"],
  authors: [{ name: "Surakshith" }],
  openGraph: {
    title: "DishTV Universal Remote — Interactive Prototype",
    description: "Future of home entertainment control. Voice search, ergonomic design, and universal compatibility.",
    url: "https://surakshith-portfolio.vercel.app",
    siteName: "DishTV Remote Prototype",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DishTV Remote prototype",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DishTV Universal Remote — Interactive Prototype",
    description: "Future of home entertainment control. Voice search, ergonomic design, and universal compatibility.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "DishTV Universal Remote",
              "image": "https://surakshith-portfolio.vercel.app/remote-image.jpg",
              "description": "Smart universal remote with voice control and ergonomic design for DishTV DTH boxes.",
              "brand": {
                "@type": "Brand",
                "name": "DishTV"
              },
              "offers": {
                "@type": "Offer",
                "url": "https://surakshith-portfolio.vercel.app",
                "priceCurrency": "INR",
                "price": "499",
                "availability": "https://schema.org/InStock"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
