import initializeClientFirestore from 'shared/firebase/firestoreClient';
import initializeClientStorage from 'shared/firebase/storageClient';
import { getClientServiceInstance } from 'shared/firebase/serviceClient';

const fbsClient = getClientServiceInstance({
  measurementId: process.env.FIREBASE_measurementId,
  appId: process.env.FIREBASE_appId,
  messagingSenderId: process.env.FIREBASE_messagingSenderId,
  storageBucket: process.env.FIREBASE_storageBucket,
  projectId: process.env.FIREBASE_projectId,
  authDomain: process.env.FIREBASE_authDomain,
  apiKey: process.env.FIREBASE_apiKey,
});
const firestoreClient = initializeClientFirestore(fbsClient.app());
const storageClient = initializeClientStorage(fbsClient.app());

export {
  fbsClient as default,
  firestoreClient,
  storageClient,
};
