
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error Caught:", error);
  }, [error]);

  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="max-w-md space-y-6">
          <h2 className="text-4xl font-bold text-primary">Une erreur système est survenue.</h2>
          <p className="text-muted-foreground">
            Le site rencontre une difficulté technique majeure. Nous nous excusons pour ce désagrément.
          </p>
          <Button onClick={() => reset()} className="rounded-full px-8 bg-primary">
            Rafraîchir l'application
          </Button>
        </div>
      </body>
    </html>
  );
}
