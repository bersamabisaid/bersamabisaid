import * as fbAdmin from 'firebase-admin';
import { Singleton } from '../../../shared/utils/pattern';

const admin = new Singleton(() => {
  if (fbAdmin.apps.length) {
    fbAdmin.app();
  } else {
    fbAdmin.initializeApp({
      credential: fbAdmin.credential.applicationDefault(),
    });
  }

  return fbAdmin;
});

const db = admin.value.firestore();

export default admin.value;

export {
  db,
};
