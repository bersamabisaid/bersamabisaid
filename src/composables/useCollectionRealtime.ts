import { ref } from '@vue/composition-api';
import type fb from 'firebase';

type collectionMapper<T, U> = (value: T, index: number, array: T[]) => U;

interface useCollectionOptions<T, U> {
  mapper?: collectionMapper<fb.firestore.QueryDocumentSnapshot<T>, U>
}

export default function useCollectionRealtime<T, U>(
  collectionRef: fb.firestore.CollectionReference<T>,
  { mapper }: useCollectionOptions<T, U> = {},
) {
    type Tdata = typeof mapper extends undefined ? T : U;
    const data = ref<Tdata[]>([]);
    const loading = ref(true);
    const error = ref<fb.firestore.FirestoreError | null>(null);
    const listen = () => collectionRef.onSnapshot(
      (snapshots) => {
        loading.value = false;
        data.value = (mapper
          ? snapshots.docs.map(mapper)
          : snapshots.docs.map((doc) => doc.data())) as Tdata[];
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
