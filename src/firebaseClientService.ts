import initializeClientFirestore from 'shared/firebase/firestoreClient';
import initializeClientStorage from 'shared/firebase/storageClient';
import { getClientServiceInstance } from 'shared/firebase/serviceClient';

const fbsClient = getClientServiceInstance(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  JSON.parse(atob(process.env.FIREBASE!)),
);
const firestoreClient = initializeClientFirestore(fbsClient.app());
const storageClient = initializeClientStorage(fbsClient.app());

export {
  fbsClient as default,
  firestoreClient,
  storageClient,
};
