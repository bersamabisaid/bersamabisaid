import * as fbAdmin from 'firebase-admin';
import { once } from 'lodash';
import firestoreCollectionName, { CollectionRef, DocRef } from 'shared/firestoreCollection';
import storageReferencePathName from 'shared/storageReference';
import { base64 } from 'shared/utils/encoding';

const init = once(() => {
  if (fbAdmin.apps.length) {
    fbAdmin.app();
  } else {
    const credentialString = base64.decode(process.env.GCLOUD_CREDENTIALS as string);
    const credential = JSON.parse(credentialString) as fbAdmin.ServiceAccount;

    fbAdmin.initializeApp({
      credential: fbAdmin.credential.cert(credential),
      projectId: process.env.FIREBASE_projectId,
      storageBucket: process.env.FIREBASE_storageBucket,
    });
  }

  return fbAdmin;
});

const fbsAdmin = init();
const db = fbsAdmin.firestore();
const storage = fbsAdmin.storage().bucket('bersamabisaid-web-dev.appspot.com');

const firestoreCollection = {
  Programs: db.collection(firestoreCollectionName.PROGRAMS) as CollectionRef.ProgramModel<true>,
  Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as CollectionRef.TransactionModel<true>,
  TransactionClients: db.collection(firestoreCollectionName.TRANSACTION_CLIENTS) as CollectionRef.TransactionClientModel<true>,
  Donators: db.collection(firestoreCollectionName.DONATORS) as CollectionRef.DonatorModel<true>,
  Donations: (programRef: DocRef.ProgramModel<true>) => programRef
    .collection(firestoreCollectionName.DONATIONS) as CollectionRef.DonationModel<true>,
};

const baseStorageRef = (...paths: string[]) => storage.file(paths.join('/'));

const storageRef = {
  base: baseStorageRef,
  Programs: baseStorageRef.bind(null, storageReferencePathName.PROGRAMS),
};

const isSnapshotExists = <T = unknown>(
  snapshot: fbAdmin.firestore.DocumentSnapshot<T>,
): snapshot is fbAdmin.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

export {
  fbsAdmin as default,
  db,
  storage,
  storageRef,
  firestoreCollection,
  isSnapshotExists,
};
