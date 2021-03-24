import { createSingleton } from 'shared/utils/pattern';
import firebase from 'firebase/app';
import 'firebase/firestore';

const service = createSingleton(() => {
  if (firebase.apps.length) {
    firebase.app();
  } else {
    firebase.initializeApp({
      measurementId: process.env.FIREBASE_measurementId,
      appId: process.env.FIREBASE_appId,
      messagingSenderId: process.env.FIREBASE_messagingSenderId,
      storageBucket: process.env.FIREBASE_storageBucket,
      projectId: process.env.FIREBASE_projectId,
      authDomain: process.env.FIREBASE_authDomain,
      apiKey: process.env.FIREBASE_apiKey,
    });
  }

  return firebase;
});

const fbs = service();

export default fbs;

export const db = fbs.firestore();
