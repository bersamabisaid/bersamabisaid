import firebaseAdmin, { ServiceAccount } from 'firebase-admin';
import * as fbServiceAccount from '../../firebase-service-account.json';

const admin = function () {
  if (firebaseAdmin.apps.length) {
    firebaseAdmin.app();
  } else if (process.env.NODE_ENV === 'development') {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(fbServiceAccount as ServiceAccount),
    });
  } else {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.applicationDefault(),
    });
  }

  return firebaseAdmin;
};

export default {
  admin,
};
