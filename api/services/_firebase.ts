import firebaseAdmin, { ServiceAccount } from 'firebase-admin';
import { createSingleton } from '../../shared/utils/pattern';
import { base64 } from '../../shared/utils/encoding';

const admin = createSingleton(() => {
  if (firebaseAdmin.apps.length) {
    firebaseAdmin.app();
  } else {
    const credential = JSON.parse(
      process.env.NODE_ENV === 'development'
        ? process.env.GCLOUD_CREDENTIALS!
        : base64.decode(process.env.GCLOUD_CREDENTIALS!),
    ) as ServiceAccount;

    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(credential),
    });
  }

  return firebaseAdmin;
});

const db = admin().firestore();

export default Object.assign(admin, {
  db,
}) as typeof admin & {
  db: typeof db;
};
