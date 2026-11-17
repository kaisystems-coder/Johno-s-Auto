import { Inter } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import { business } from "@/lib/content";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  // The generated metric-matched fallback (@font-face src: local("Arial") +
  // size-adjust) traced as the single most expensive thing on the page:
  // ~2-3x the layout cost of the whole hero. A plain fallback stack is used
  // instead (see tailwind.config fontFamily); CLS verified at 0 afterwards.
  adjustFontFallback: false,
  fallback: ["system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:5750");

const title = "Johno's Auto Services | 24/7 Mechanic in Diego Martin, Trinidad";
const description =
  "Owner-run auto repair in Diego Martin, open 24/7. Mechanical repairs, full servicing, auto electrical, painting and detailing. 5.0 stars on Google. Call or WhatsApp +1 (868) 485-9600.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "en_TT",
    url: "/",
    siteName: business.name,
    title,
    description,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Johno's Auto Services: We get you road ready",
      },
    ],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
  // Static files in /public: Next's metadata-route loader breaks on the
  // apostrophe in this folder's path ("Johno's Auto"), so no app/icon.* here.
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport = {
  themeColor: "#080A0A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "LocalBusiness"],
  "@id": `${siteUrl}/#business`,
  name: business.name,
  slogan: business.tagline,
  description,
  url: siteUrl,
  logo: `${siteUrl}/logo.png`,
  image: `${siteUrl}/og.jpg`,
  telephone: "+1-868-485-9600",
  email: business.email,
  founder: { "@type": "Person", name: "Johnathan Gowrie", alternateName: "Johno" },
  // Street address is not public: locality only, never invented.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Diego Martin",
    addressCountry: "TT",
  },
  areaServed: [
    { "@type": "City", name: "Diego Martin" },
    { "@type": "Country", name: "Trinidad and Tobago" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  // 5.0 is the real Google rating. Review count is unverified, so it is omitted.
  // TODO: add ratingCount once the Google review count is confirmed.
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", bestRating: "5" },
  makesOffer: [
    "General Mechanical Repairs",
    "Full Vehicle Servicing",
    "Auto Electrical",
    "Painting",
    "Auto Detailing",
  ].map((name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } })),
  sameAs: [business.instagram, business.facebook],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-skip -translate-y-24 rounded-lg bg-lime px-4 py-3 text-sm font-semibold text-jet transition-transform duration-200 ease-out focus-visible:translate-y-0"
        >
          Skip to content
        </a>
        <MotionProvider>{children}</MotionProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
