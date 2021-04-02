import {
  computed, ComputedRef, isRef, ref, watch,
} from '@vue/composition-api';
import type fb from 'firebase';

export default function useCollection<T = unknown>(
  collectionRef: fb.firestore.CollectionReference<T>
    | fb.firestore.Query<T>
    | ComputedRef<fb.firestore.CollectionReference<T>>
    | ComputedRef<fb.firestore.Query<T>>,
) {
  const dbRef = computed(() => (isRef(collectionRef) ? collectionRef.value : collectionRef));
  const data = ref<T[]>([]);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const update = async () => {
    loading.value = true;

    try {
      const snapshot = await dbRef.value.get();
      data.value = snapshot.docs.map((doc) => doc.data());
    } catch (err) {
      console.log('%cuseCollection error!', 'color: red;');
      error.value = err as fb.firestore.FirestoreError;
    }

    loading.value = false;
  };

  watch(dbRef, () => update(), { immediate: true });

  return [
    data,
    loading,
    error,
    update,
  ] as const;
}
