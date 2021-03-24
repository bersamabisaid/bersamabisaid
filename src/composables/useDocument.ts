import { onMounted, ref } from '@vue/composition-api';
import type fb from 'firebase';

type Options = fb.firestore.GetOptions & {
}

export default function useDocument<T = unknown>(
  docRef: fb.firestore.DocumentReference<T>,
  initialValue: T | null = null,
  { ...getOptions }: Options = {},
) {
  const data = ref(initialValue);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const loading = ref(true);
  const update = async () => {
    loading.value = true;

    try {
      const docSnapshot = await docRef.get(getOptions);
      data.value = (docSnapshot.data() || null) as typeof data['value'];
    } catch (err) {
      console.log('%cuseDocument error!', 'color: red;');
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
