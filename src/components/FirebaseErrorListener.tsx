
"use client";

import React, { useEffect, useState } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';

export function FirebaseErrorListener() {
  const [error, setError] = useState<FirestorePermissionError | null>(null);

  useEffect(() => {
    const handleError = (err: FirestorePermissionError) => {
      setError(err);
    };

    errorEmitter.on('permission-error', handleError);
    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, []);

  if (!error) return null;

  return (
    <AlertDialog open={!!error} onOpenChange={() => setError(null)}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive flex items-center gap-2">
            Erreur de Permission Firestore
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <p className="font-medium text-foreground">
              La requête a été refusée par les règles de sécurité Firestore.
            </p>
            <div className="bg-muted p-4 rounded-md overflow-auto text-xs font-mono">
              <pre>{JSON.stringify({
                method: error.context.operation,
                path: error.context.path,
                data: error.context.requestResourceData
              }, null, 2)}</pre>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => setError(null)}>Fermer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
