import {
  computed, ComputedRef, ref, isRef, watch,
} from 'vue';
import type fb from 'firebase';

type TsnapshotListener = () => void;

export default function useDocumentRealtime<T = unknown>(
  docRef: fb.firestore.DocumentReference<T>
    | ComputedRef<fb.firestore.DocumentReference<T>>,
  initialValue: T | null = null,
) {
  const dbRef = computed(() => (isRef(docRef) ? docRef.value : docRef));
  const data = ref(initialValue);
  const loading = ref(true);
  const error = ref<fb.firestore.FirestoreError | null>(null);
  const snapshotListener = ref<TsnapshotListener>();
  const listen = (forceListening = false) => {
    if (forceListening || !snapshotListener.value) {
      // eslint-disable-next-line no-unused-expressions
      snapshotListener.value?.() as void;

      const listener = dbRef.value.onSnapshot(
        (docSnapshot) => {
          data.value = (docSnapshot.data() || initialValue) as typeof data.value;
        },
        (err) => {
        // eslint-disable-next-line no-console
          console.log('%cuseCollectionRealtime error!', 'color: red;');
          error.value = err;
        },
        () => {
          loading.value = false;
        },
      );

      snapshotListener.value = listener;
    } else {
      // eslint-disable-next-line no-console
      console.warn(`already listen to ${dbRef.value.path}`);
    }

    return snapshotListener.value;
  };

  watch(dbRef, (newRef, oldRef) => {
    if (newRef.id !== oldRef?.id) {
      listen(true);
    }
  }, { immediate: true });

  return [
    data,
    loading,
    error,
    listen,
    snapshotListener,
  ] as const;
}
