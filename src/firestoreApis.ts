import { onMounted, ref } from '@vue/composition-api';
import firestoreCollection from 'src/firestoreCollection';
import type fb from 'firebase';
import type { Model, ModelInObject } from 'shared/types/model';
import { Event } from 'shared/types/modelData';
import { getStorageFile } from 'src/composables/useStorage';
import { storageRef } from 'src/services/firebaseService';

export const getDocumentByFactory = function <T = unknown, U extends keyof T = keyof T> (
  collectionReference: fb.firestore.CollectionReference<T>,
  columnName: U,
  opStr: fb.firestore.WhereFilterOp = '==',
) {
  const getter = async (condition: T[U]) => {
    const query = collectionReference.where(columnName as string, opStr, condition).limit(1);
    const { docs: [snapshot] } = await query.get();

    return snapshot as fb.firestore.QueryDocumentSnapshot<Model<T>> | undefined;
  };

  return Object.assign(getter, {
    hooks(condition: T[U], initialValue: T | null = null) {
      type tInitialValue = typeof initialValue extends null ? (ModelInObject<T> | null) : ModelInObject<T>;
      const isDataLoading = ref(true);
      const data = ref((initialValue && { ...initialValue, _uid: '' }) as tInitialValue);

      onMounted(async () => {
        const snapshot = await getter(condition);

        if (snapshot) {
          data.value = ({ ...snapshot.data(), _uid: snapshot.id } || initialValue) as typeof data['value'];
        }
        isDataLoading.value = false;
      });

      return [data, isDataLoading] as const;
    },
  });
};

export const getEventByURL = getDocumentByFactory(firestoreCollection.Events, 'URL');

export const resolveEventImage = async function <T extends Event = Event> ({ image, ...data }: T) {
  return {
    ...data,
    image: await getStorageFile(storageRef.root.child(image)),
  };
};

export const resolveEventCollectionImage = async function <T extends Event = Event> (data: T[]) {
  return Promise.all(data.map(resolveEventImage));
};
