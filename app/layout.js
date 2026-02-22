import { Cormorant_Garamond, Jost } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-jost',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.jord-by.com'),
  title: {
    default: 'Jörð — by | Travel Planner Sensible',
    template: '%s | Jörð — by',
  },
  description:
    'Sandra crée des voyages sur mesure, lents et immersifs. Itinéraires personnalisés pour la Norvège, le Japon, le Portugal, l\'Écosse, l\'Islande et la Grèce.',
  keywords: [
    'travel planner',
    'voyage sur mesure',
    'voyage lent',
    'voyage immersif',
    'itinéraire personnalisé',
    'Norvège',
    'Japon',
    'Portugal',
    'Écosse',
    'Islande',
    'Grèce',
    'Jörð',
  ],
  authors: [{ name: 'Sandra', url: 'https://www.jord-by.com' }],
  creator: 'Sandra — Jörð by',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: '/',
    siteName: 'Jörð — by',
    title: 'Jörð — by | Travel Planner Sensible',
    description:
      'Voyages sur mesure, lents et immersifs — par Sandra. Norvège, Japon, Portugal, Écosse, Islande, Grèce.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Jörð — by, travel planner sensible',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jörð — by | Travel Planner Sensible',
    description:
      'Voyages sur mesure, lents et immersifs — par Sandra.',
    images: ['/og-image.jpg'],
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
  icons: {
    icon: '/icon.svg',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'TravelAgency',
  name: 'Jörð — by',
  description:
    'Travel planner spécialisée en voyages sur mesure, lents et immersifs.',
  url: 'https://www.jord-by.com',
  sameAs: ['https://instagram.com/jord.by'],
  founder: {
    '@type': 'Person',
    name: 'Sandra',
    jobTitle: 'Travel Planner',
  },
  areaServed: {
    '@type': 'GeoShape',
    description:
      'International — Norvège, Japon, Portugal, Écosse, Islande, Grèce',
  },
  makesOffer: [
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Itinéraire sur mesure',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Voyage lent & immersif',
      },
    },
    {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: 'Expériences authentiques',
      },
    },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'sandra@jord-by.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${jost.variable}`}>
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: 'html,body{background:#141210}',
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-nav">
          Aller au contenu principal
        </a>
        {children}
      </body>
    </html>
  );
}
