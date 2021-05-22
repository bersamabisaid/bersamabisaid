import * as fbAdmin from 'firebase-admin';
import initializeNodeFirestore from 'shared/firebase/firestoreNode';
import initializeNodeStorage from 'shared/firebase/storageNode';
import { getNodeServiceInstance } from 'shared/firebase/serviceNode';
import { base64 } from 'shared/utils/browser/node/encoding';

const credentialString = base64.decode(process.env.GCLOUD_CREDENTIALS as string);
const credential = JSON.parse(credentialString) as fbAdmin.ServiceAccount;

const fbsNode = getNodeServiceInstance({
  credential: fbAdmin.credential.cert(credential),
  projectId: process.env.FIREBASE_projectId,
  storageBucket: process.env.FIREBASE_storageBucket,
});
const firestoreNode = initializeNodeFirestore(fbsNode.app());
const storageNode = initializeNodeStorage(fbsNode.app());

export {
  fbsNode as default,
  firestoreNode,
  storageNode,
};
