import {
  computed, ComputedRef, isRef, ref, watch,
} from '@vue/composition-api';
import type fb from 'firebase';

type collectionMapper<T, U = unknown> = (value: T, index: number, array: T[]) => U;

interface useCollectionOptions<T, U> {
  mapper?: collectionMapper<fb.firestore.QueryDocumentSnapshot<T>, U>
}

export default function useCollection<T, U>(
  collectionRef: fb.firestore.CollectionReference<T>
    | fb.firestore.Query<T>
    | ComputedRef<fb.firestore.CollectionReference<T>>
    | ComputedRef<fb.firestore.Query<T>>,
  { mapper }: useCollectionOptions<T, U> = {},
) {
  type Tdata = typeof mapper extends undefined ? T : U;
  const dbRef = computed(() => (isRef(collectionRef) ? collectionRef.value : collectionRef));
  const data = ref<Tdata[]>([]);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const update = async () => {
    loading.value = true;

    try {
      const snapshot = await dbRef.value.get();
      data.value = (mapper
        ? snapshot.docs.map(mapper)
        : snapshot.docs.map((doc) => doc.data())) as Tdata[];
    } catch (err) {
      // eslint-disable-next-line no-console
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
