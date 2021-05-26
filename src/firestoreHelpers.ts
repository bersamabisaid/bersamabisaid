import { ref, onMounted } from 'vue';
import type fb from 'firebase';
import type { Model, ModelInObject } from 'shared/types/model';
import type { CollectionRef } from 'shared/firebase/firestoreCollection';

// interface GetDocumentByOptions {
//   includeDeleted?: boolean;
// }

class Factory {
  static getDocumentBy <T = unknown, U extends keyof T = keyof T>(
    collectionReference: CollectionRef.base<T>,
    columnName: U,
    opStr: fb.firestore.WhereFilterOp = '==',
    includeDeleted = false,
  ) {
    const getter = async (condition: T[U]) => {
      const query = collectionReference
        .where(columnName as string, opStr, condition)
        .limit(1);

      const { docs: [snapshot] } = await (includeDeleted
        ? query : query.where('_deleted', '==', null))
        .get();

      return snapshot as fb.firestore.QueryDocumentSnapshot<Model<T>> | undefined;
    };

    return Object.assign(getter, {
      hooks(condition: T[U], initialValue: T | null = null) {
        type tInitialValue = typeof initialValue extends null
          ? (ModelInObject<T> | null)
          : ModelInObject<T>;
        const data = ref((initialValue && { ...initialValue, _uid: '' }) as tInitialValue);
        const isDataLoading = ref(true);

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
  }
}

export {
  Factory,
};
