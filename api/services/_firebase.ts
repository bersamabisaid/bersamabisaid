import firebaseAdmin from 'firebase-admin';
import { createSingleton } from '../../shared/utils/pattern';

const admin = createSingleton(() => {
  if (firebaseAdmin.apps.length) {
    firebaseAdmin.app();
  } else {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.applicationDefault(),
    });
  }

  return firebaseAdmin;
});

export default {
  admin,
};
