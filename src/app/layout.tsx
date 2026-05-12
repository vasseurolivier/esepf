
import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/context/LanguageContext';

export const metadata: Metadata = {
  title: 'ESEPE | École Sport-Études Performance & Excellence',
  description: 'Un établissement d\'excellence pour la réussite de nos élèves, du collège au baccalauréat.',
};

async function getGlobalSettings() {
  const projectId = "studio-8515409753-90765";
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/settings/global`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = await res.json();
    
    const fields = data.fields;
    if (!fields) return null;

    const unwrap = (val: any): any => {
      if (!val) return null;
      if (val.stringValue !== undefined) return val.stringValue;
      if (val.booleanValue !== undefined) return val.booleanValue;
      if (val.integerValue !== undefined) return parseInt(val.integerValue);
      if (val.timestampValue !== undefined) return val.timestampValue;
      if (val.mapValue !== undefined) {
        const obj: any = {};
        for (const k in val.mapValue.fields) {
          obj[k] = unwrap(val.mapValue.fields[k]);
        }
        return obj;
      }
      return null;
    };

    return {
      schoolName: unwrap(fields.schoolName),
      logoUrl: unwrap(fields.logoUrl),
      images: unwrap(fields.images),
    };
  } catch (e) {
    return null;
  }
}

export default async function RootLayout(props: {
  children: React.ReactNode;
}) {
  const { children } = props;
  const initialSettings = await getGlobalSettings();

  return (
    <html lang="zh">
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
