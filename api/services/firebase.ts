import firebase from 'firebase/app';
import 'firebase/firestore';

const client = function () {
  if (firebase.apps.length) {
    firebase.app();
  } else {
    firebase.initializeApp({
      apiKey: process.env.FIREBASE_apiKey,
      authDomain: process.env.FIREBASE_authDomain,
      databaseURL: process.env.FIREBASE_databaseURL,
      projectId: process.env.FIREBASE_projectId,
      storageBucket: process.env.FIREBASE_storageBucket,
      messagingSenderId: process.env.FIREBASE_messagingSenderId,
      appId: process.env.FIREBASE_appId,
    });
  }

  return firebase;
};

export default {
  client,
};
