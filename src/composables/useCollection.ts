import { onMounted, ref } from '@vue/composition-api';
import type fb from 'firebase';

export default function useCollection<T = unknown>(
  collectionRef: fb.firestore.CollectionReference<T> | fb.firestore.Query<T>,
) {
  const data = ref<T[]>([]);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const update = async () => {
    loading.value = true;

    try {
      const snapshot = await collectionRef.get();
      data.value = snapshot.docs.map((doc) => doc.data());
    } catch (err) {
      console.log('%cuseCollection error!', 'color: red;');
      error.value = err as fb.firestore.FirestoreError;
    }

    loading.value = false;
  };

  onMounted(() => update());

  return [
    data,
    loading,
    error,
    update,
  ] as const;
}
