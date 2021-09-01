import type { MigrateOptions } from 'fireway';
import firestoreCollectionName from '../shared/firebase/firestoreCollection';

export const migrate = ({ firestore }: MigrateOptions) => firestore
  .runTransaction(async (fbt) => {
    const collectionRef = firestore.collection(firestoreCollectionName.PROGRAMS);
    const collectionDocs = await collectionRef.listDocuments();
    const collectionSnapshots = await fbt.getAll(...collectionDocs);

    collectionSnapshots.forEach((snapshot) => {
      const data = snapshot.data();

      fbt.update(snapshot.ref, {
        orderPriority: 0,
        ...data,
      });
    });
  });
