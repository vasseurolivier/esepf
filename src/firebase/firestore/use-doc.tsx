
'use client';

import { useState, useEffect } from 'react';
import { doc, onSnapshot, Firestore, DocumentData } from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export function useDoc(db: Firestore | null, path: string | null) {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!db || !path) {
      setLoading(false);
      return;
    }

    // On s'assure que le path est propre
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    const docRef = doc(db, cleanPath);
    
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        setData(docSnap.exists() ? docSnap.data() : null);
        setLoading(false);
      },
      (serverError) => {
        const permissionError = new FirestorePermissionError({
          path: docRef.path,
          operation: 'get',
        });
        errorEmitter.emit('permission-error', permissionError);
        setError(serverError);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [db, path]);

  return { data, loading, error };
}
