'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

/**
 * Un composant invisible qui écoute les erreurs Firebase émises globalement.
 * Au lieu de faire planter l'application (throw), il affiche une notification
 * et log l'erreur pour le débogage, garantissant que le site reste accessible.
 */
export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      // On log l'erreur pour le diagnostic
      console.error("Firebase Security/Network Error:", error.message);
      
      // On affiche un message d'avertissement à l'utilisateur au lieu de couper le site
      // Note: On ne le fait que si ce n'est pas une erreur de "chargement initial" normale
      if (error.request?.method !== 'get' && error.request?.method !== 'list') {
        toast({
          variant: "destructive",
          title: "Action restreinte",
          description: "Vous n'avez pas les permissions nécessaires ou votre connexion est instable.",
        });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  // Ce composant ne doit plus JAMAIS "throw" d'erreur en plein rendu, 
  // car cela provoque l'écran "Application Error" de Next.js.
  return null;
}
