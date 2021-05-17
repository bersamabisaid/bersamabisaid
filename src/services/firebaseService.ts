import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';
import storageReferencePathName from 'shared/storageReference';
import { Singleton } from 'shared/utils/pattern';
import { emulators } from 'app/firebase.json';
import type fb from 'firebase';

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
const db = fbs.firestore();
const storage = fbs.storage().ref();
const auth = fbs.auth();
const fns = fbs.functions();

if (process.env.NODE_ENV !== 'production') {
  const DEV_HOST = 'localhost';

  fns.useEmulator(DEV_HOST, emulators.functions.port);
}

const storageRef = Object.assign(storage, {
  Programs: storage.child(storageReferencePathName.PROGRAMS),

});

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
const isFirebaseError = function (data: any): data is fb.FirebaseError {
  return typeof data.code === 'string'
  && typeof data.message === 'string'
  && typeof data.name === 'string';
};

const isStorageError = function (data: any): data is fb.storage.FirebaseStorageError {
  return (typeof data?.serverResponse === 'string' || data?.serverResponse === null)
    && isFirebaseError(data);
};

export {
  fbs as default,
  db,
  storage,
  auth,
  fns,
  storageRef,
  isFirebaseError,
  isStorageError,
};
