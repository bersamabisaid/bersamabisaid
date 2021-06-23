import {
  computed, ComputedRef, isRef, ref, watch,
} from '@vue/composition-api';
import type fb from 'firebase';

type Options = fb.firestore.GetOptions & {
}

export default function useDocument<T = unknown>(
  docRef: fb.firestore.DocumentReference<T>
    | ComputedRef<fb.firestore.DocumentReference<T>>,
  initialValue: T | null = null,
  { ...getOptions }: Options = {},
) {
  const dbRef = computed(() => (isRef(docRef) ? docRef.value : docRef));
  const data = ref(initialValue as typeof initialValue extends null ? (T | null) : T);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const loading = ref(true);
  const update = async () => {
    loading.value = true;

    try {
      const docSnapshot = await dbRef.value.get(getOptions);
      data.value = (docSnapshot.data() || initialValue) as typeof data['value'];
    } catch (err) {
      /* eslint-disable no-console */
      if (process.env.NODE_ENV !== 'production') {
        console.group('%cuseDocument error!', 'color: red;');
        console.error(err);
        console.groupEnd();
      } else {
        console.log('%cuseDocument error!', 'color: red;');
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
