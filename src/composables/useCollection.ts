import {
  computed, isRef, ref, watch,
} from '@vue/composition-api';
import type { ComputedRef } from '@vue/composition-api';
import type fb from 'firebase';

type collectionMapper<T, U> = (value: T, index: number, array: T[]) => U;

export interface useCollectionOptions<T, U> {
  mapper?: collectionMapper<fb.firestore.QueryDocumentSnapshot<T>, U> | null;
}

export default function useCollection<T, U = T>(
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
      /* eslint-disable no-console */
      if (process.env.NODE_ENV !== 'production') {
        console.group('%cuseCollection error!', 'color: red;');
        console.error(err);
        console.groupEnd();
      } else {
        console.log('%cuseCollection error!', 'color: red;');
      }
      /* eslint-enable no-console */
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
