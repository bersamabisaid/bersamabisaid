import { onMounted, ref } from '@vue/composition-api';
import firestoreCollection from 'src/firestoreCollection';
import type fb from 'firebase';

export const getDocumentByFactory = function <T = unknown, U extends keyof T = keyof T> (
  collectionReference: fb.firestore.CollectionReference<T>,
  columnName: U,
  opStr: fb.firestore.WhereFilterOp = '==',
) {
  const getter = async (condition: T[U]) => {
    const query = collectionReference.where(columnName as string, opStr, condition).limit(1);
    const { docs: [snapshot] } = await query.get();

    return snapshot;
  };

  return Object.assign(getter, {
    hooks(condition: T[U], initialValue: T | null = null) {
      const isDataLoading = ref(true);
      const data = ref(initialValue as (typeof initialValue extends null ? (T | null) : T));

      onMounted(async () => {
        data.value = ((await getter(condition)).data() || initialValue) as typeof data['value'];
        isDataLoading.value = false;
      });

      return [data, isDataLoading] as const;
    },
  });
};

export const getEventByURL = getDocumentByFactory(firestoreCollection.Events, 'URL');
