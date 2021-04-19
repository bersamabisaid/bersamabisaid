import { Singleton } from 'shared/utils/pattern';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import storageReferencePathName from 'shared/storageReference';
import { emulators } from 'app/firebase.json';

const service = new Singleton(() => {
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

const fbs = service.value;

export default fbs;

export const db = fbs.firestore();

export const storage = fbs.storage().ref();

export const auth = fbs.auth();

export const fns = fbs.functions();

if (process.env.NODE_ENV !== 'production') {
  const DEV_HOST = 'localhost';

  fns.useEmulator(DEV_HOST, emulators.functions.port);
}

export const storageRef = Object.assign(storage, {
  Events: storage.child(storageReferencePathName.EVENTS),

});
