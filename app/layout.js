import './globals.css';

export const metadata = {
  title: 'Jörð — by | Travel Planner Sensible',
  description:
    'Jörð — by, travel planner sensible. Voyages sur mesure, lents et immersifs.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        {/* prevent white flash — set background before CSS loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: 'html,body{background:#141210}',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
