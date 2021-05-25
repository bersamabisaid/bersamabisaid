import {
  computed, isRef, ref, watch,
} from 'vue';
import type { ComputedRef } from 'vue';
import type fb from 'firebase';
import type { Unpromisify } from 'shared/types/utils';

// eslint-disable-next-line no-unused-vars
export type collectionMapper<T, U> = (value: T, index: number, array: T[]) => U;

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
  type Tdata = Unpromisify<typeof mapper extends undefined ? T : U>;
  const dbRef = computed(() => (isRef(collectionRef) ? collectionRef.value : collectionRef));
  const data = ref<Tdata[]>([]);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const update = async () => {
    loading.value = true;

    try {
      const snapshots = await dbRef.value.get();
      const mappedData = (mapper
        ? snapshots.docs.map((el, i, arr) => Promise.resolve(mapper(el, i, arr)))
        : snapshots.docs.map((doc) => Promise.resolve(doc.data()))) as Promise<Tdata>[];

      data.value = (await Promise.all(mappedData)) as typeof data.value;
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
