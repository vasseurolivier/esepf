'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
      <h2 className="text-4xl font-headline font-bold text-primary mb-4">Oups ! Une erreur est survenue.</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Le site rencontre une petite difficulté technique. Veuillez essayer de rafraîchir la page ou de revenir à l'accueil.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => reset()} className="rounded-full px-8">Réessayer</Button>
        <Link href="/">
          <Button variant="outline" className="rounded-full px-8">Retour à l'accueil</Button>
        </Link>
      </div>
    </div>
  );
}