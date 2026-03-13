
import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';
import { firebaseConfig } from '@/firebase/config';

export const metadata: Metadata = {
  title: 'Institution ESEPF | Collège & Lycée',
  description: 'Un établissement d\'excellence pour la réussite de nos élèves, du collège au baccalauréat.',
};

// Helper function to unwrap Firestore REST API response for initial settings
async function getInitialSettings() {
  try {
    const url = `https://firestore.googleapis.com/v1/projects/${firebaseConfig.projectId}/databases/(default)/documents/settings/global`;
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    
    if (!data.fields) return null;

    const unwrap = (fields: any) => {
      const result: any = {};
      for (const key in fields) {
        const val = fields[key];
        if (val.stringValue !== undefined) result[key] = val.stringValue;
        else if (val.booleanValue !== undefined) result[key] = val.booleanValue;
        else if (val.mapValue !== undefined) result[key] = unwrap(val.mapValue.fields);
      }
      return result;
    };

    return unwrap(data.fields);
  } catch (e) {
    return null;
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {
  const { children } = props;
  const initialSettings = await getInitialSettings();

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        <FirebaseClientProvider initialSettings={initialSettings}>
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
