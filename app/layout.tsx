import type { Metadata, Viewport } from "next";
import { Inter, Onest } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

const onest = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-onest",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title:
    "Стоматология Жуйкан в Хэйхэ — импланты, коронки, протезирование | Дешевле на 40–70%",
  description:
    "Государственная стоматология в Хэйхэ (Китай) для пациентов из РФ. Импланты Straumann от 35 000 ₽, циркониевые коронки от 8 000 ₽. Встреча на границе, бесплатное проживание, гарантия до 20 лет.",
  keywords: [
    "стоматология хэйхэ",
    "лечение зубов в китае",
    "импланты в китае",
    "жуйкан",
    "протезирование хэйхэ",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: site.url,
    siteName: "Стоматология Жуйкан",
    title: "Стоматология Жуйкан в Хэйхэ — дешевле на 40–70%",
    description:
      "Государственная клиника в Хэйхэ. Импланты Straumann, циркониевые коронки. Встреча на границе, бесплатное проживание, гарантия до 20 лет.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Стоматология Жуйкан в Хэйхэ — дешевле на 40–70%",
    description:
      "Импланты Straumann от 35 000 ₽, циркониевые коронки от 8 000 ₽. Встреча на границе, бесплатное проживание.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#00897B",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: "Стоматология «Жуйкан» (RuiKang)",
  url: site.url,
  telephone: site.phoneRaw,
  email: site.email,
  priceRange: "₽₽",
  medicalSpecialty: "Dentistry",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ул. Восточно-Центральная, 252-4",
    addressLocality: "Хэйхэ",
    addressRegion: "Хэйлунцзян",
    addressCountry: "CN",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "08:00",
    closes: "22:00",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${onest.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCTA />
      </body>
    </html>
  );
}
