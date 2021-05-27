import * as fbAdmin from 'firebase-admin';
import { getNodeServiceInstance } from '../../../shared/firebase/serviceNode';
import initializeFirestore from '../../../shared/firebase/firestoreNode';

const admin = getNodeServiceInstance({
  credential: fbAdmin.credential.applicationDefault(),
});

const firestore = initializeFirestore(admin.app());

export {
  admin as default,
  firestore,
};
