import { ref } from '@vue/composition-api';
import type fb from 'firebase';

export default function useCollectionRealtime<T = unknown>(collectionRef: fb.firestore.CollectionReference<T>) {
  const data = ref<T[]>([]);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const listen = () => collectionRef.onSnapshot(
    (snapshots) => {
      loading.value = false;
      data.value = snapshots.docs.map((doc) => doc.data());
    },
    (err) => {
      // eslint-disable-next-line no-console
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
