import './globals.css';

export const metadata = {
  title: 'Jörð – by | Travel Planner',
  description:
    'Jörð – by, travel planner sensible. Voyages sur mesure, lents et immersifs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
