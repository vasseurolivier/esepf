'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error("Firebase Error Caught:", error.message);
      
      // On ne prévient l'utilisateur que pour les erreurs d'écriture
      if (error.request?.method !== 'get' && error.request?.method !== 'list') {
        toast({
          variant: "destructive",
          title: "Action restreinte",
          description: "Une erreur est survenue lors de l'accès aux données.",
        });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  return null;
}
