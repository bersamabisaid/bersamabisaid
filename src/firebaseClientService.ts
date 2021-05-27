import { getClientServiceInstance } from 'shared/firebase/serviceClient';
import initializeClientFirestore from 'shared/firebase/firestoreClient';
import initializeClientStorage from 'shared/firebase/storageClient';
import initializeFunctions from 'shared/firebase/functionsClient';

const fbsClient = getClientServiceInstance(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  JSON.parse(atob(process.env.FIREBASE!)),
);
const app = fbsClient.app();
const firestoreClient = initializeClientFirestore(app);
const storageClient = initializeClientStorage(app);
const { fns } = initializeFunctions(app);

export {
  fbsClient as default,
  firestoreClient,
  storageClient,
  fns,
};
