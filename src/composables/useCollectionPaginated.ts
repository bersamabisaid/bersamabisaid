import {
  computed, isRef, reactive, ref, toRefs, watch,
} from 'vue';
import useCollection from 'src/composables/useCollection';
import type { ComputedRef } from 'vue';
import type fb from 'firebase';
import type { useCollectionOptions } from 'src/composables/useCollection';

interface useCollectionPaginatedOptions<T, U> extends useCollectionOptions<T, U> {
  perPage?: number;
  asc?: boolean;
  orderBy: keyof T | fb.firestore.FieldPath;
}

export default function useCollectionPaginated<T, U>(
  collectionRef: fb.firestore.CollectionReference<T>
    | ComputedRef<fb.firestore.CollectionReference<T>>
    | fb.firestore.Query<T>
    | ComputedRef<fb.firestore.Query<T>>,
  {
    mapper, orderBy, perPage = 10, asc,
  }: useCollectionPaginatedOptions<T, U>,
) {
  type Tdata = typeof mapper extends undefined ? T : U;
  const dataPool = ref<fb.firestore.QueryDocumentSnapshot<T>[][]>([]);
  const state = reactive({
    pageCursor: 0,
    snapshotCursor: null as fb.firestore.QueryDocumentSnapshot<T> | null,
    done: false,
  });
  const collectionQuery = computed(() => {
    const dbRef = isRef(collectionRef) ? collectionRef.value : collectionRef;
    const query = dbRef
      .orderBy(orderBy as string, asc ? 'asc' : 'desc')
      .limit(perPage);

    return state.snapshotCursor
      ? query.startAfter(state.snapshotCursor)
      : query;
  });
  const [snapshots, isLoading, error, update] = useCollection(collectionQuery, { mapper: (el) => el });
  const currentDataPool = computed(() => (dataPool.value[state.pageCursor]) || []);
  const data = computed<Tdata[]>(() => currentDataPool.value
    .map((mapper || ((el) => el.data() as unknown as Tdata))));

  const next = () => {
    if ((state.pageCursor + 1) >= (dataPool.value.length - 1)) {
      state.snapshotCursor = currentDataPool.value[currentDataPool.value.length - 1];
    }

    if (!state.done) {
      state.pageCursor += 1;
    }
  };
  const prev = () => {
    if (state.pageCursor >= 0) {
      state.pageCursor -= 1;
    }
  };

  watch(snapshots, (newVal) => {
    dataPool.value.splice(state.pageCursor, 0, newVal);

    state.done = newVal.length < perPage;
  });

  return {
    data,
    isLoading,
    error,
    ...toRefs(state),
    next,
    prev,
    update,
  };
}
