import { ref } from '@vue/composition-api';
import type fb from 'firebase';

export default function useDocumentRealtime<T = unknown>(
  docRef: fb.firestore.DocumentReference<T>,
  initialValue: T | null = null,
) {
  const data = ref(initialValue);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const listen = () => docRef.onSnapshot(
    (docSnapshot) => {
      loading.value = false;
      data.value = (docSnapshot.data() || null) as typeof data['value'];
    },
    (err) => {
      console.log('%cuseCollectionRealtime error!', 'color: red;');
      error.value = err;
    },
  );

  return [
    data,
    loading,
    error,
    listen(),
  ] as const;
}
