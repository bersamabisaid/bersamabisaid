import {
  ref, ComputedRef, computed, isRef,
} from '@vue/composition-api';
import type fb from 'firebase';

type collectionMapper<T, U> = (value: T, index: number, array: T[]) => U;

interface useCollectionOptions<T, U> {
  mapper?: collectionMapper<fb.firestore.QueryDocumentSnapshot<T>, U>
}

export default function useCollectionRealtime<T, U>(
  collectionRef: fb.firestore.CollectionReference<T>
    | ComputedRef<fb.firestore.CollectionReference<T>>
    | fb.firestore.Query<T>
    | ComputedRef<fb.firestore.Query<T>>,
  { mapper }: useCollectionOptions<T, U> = {},
) {
    type Tdata = typeof mapper extends undefined ? T : U;
    const dbRef = computed(() => (isRef(collectionRef) ? collectionRef.value : collectionRef));
    const data = ref<Tdata[]>([]);
    const loading = ref(true);
    const error = ref<fb.firestore.FirestoreError | null>(null);
    const listen = () => dbRef.value.onSnapshot(
      (snapshots) => {
        loading.value = false;

        data.value = (mapper
          ? snapshots.docs.map(mapper)
          : snapshots.docs.map((doc) => doc.data())) as Tdata[];
      },
      (err) => {
        /* eslint-disable no-console */
        if (process.env.NODE_ENV !== 'production') {
          console.group('%cuseCollectionRealtime error!', 'color: red;');
          console.error(err);
          console.groupEnd();
        } else {
          console.log('%cuseCollectionRealtime error!', 'color: red;');
        }
        /* eslint-enable no-console */
        error.value = err;
      },
    );

    return [
      data,
      loading,
      error,
      listen,
    ] as const;
}
