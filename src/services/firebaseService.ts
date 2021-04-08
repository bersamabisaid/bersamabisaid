import { Singleton } from 'shared/utils/pattern';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import storageReferencePathName from 'shared/storageReference';

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

export const storageRef = Object.assign(storage, {
  Events: storage.child(storageReferencePathName.EVENTS),

});
