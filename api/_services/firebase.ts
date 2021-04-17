import firebaseAdmin, { ServiceAccount } from 'firebase-admin';
import collectionName from '../../shared/firestoreCollection';
import { createSingleton } from '../../shared/utils/pattern';
import { base64 } from '../../shared/utils/encoding';
import type { Model, ModelUIData, TimestampedModel } from '../../shared/types/model';
import type {
  Donation, Donator, Event, Transaction, TransactionClient,
} from '../../shared/types/modelData';

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

const db = () => admin().firestore();
const fbs = Object.assign(admin, {
  db,
}) as typeof admin & {
  db: typeof db;
};

const collection = {
  Donations: fbs.db().collection(collectionName.DONATIONS) as firebaseAdmin.firestore.CollectionReference<Model<Donation<true>>>,
  Donators: fbs.db().collection(collectionName.DONATORS) as firebaseAdmin.firestore.CollectionReference<Model<Donator>>,
  Events: fbs.db().collection(collectionName.EVENTS) as firebaseAdmin.firestore.CollectionReference<Model<Event>>,
  Transactions: fbs.db().collection(collectionName.TRANSACTIONS) as firebaseAdmin.firestore.CollectionReference<Model<Transaction<true>>>,
  TransactionClients: fbs.db().collection(collectionName.TRANSACTION_CLIENTS) as firebaseAdmin.firestore.CollectionReference<Model<TransactionClient>>,
};

const uiDataFactory = <T = unknown> (
  data: T,
  expiration: ModelUIData<T>['expiration'] = null,
) => ({
  value: data,
  lastUpdate: admin().firestore.Timestamp.now(),
  expiration,
}) as ModelUIData<T>;

const proxy = {
  create<T = unknown>(data: T): Model<T> {
    const now = admin().firestore.Timestamp.now();

    return {
      ...data,
      _created: now,
      _updated: now,
      _deleted: null,
    };
  },

  update<T extends TimestampedModel>(data: T): Model<T> {
    const now = admin().firestore.Timestamp.now();

    return {
      ...data,
      _updated: now,
    };
  },
};

export default fbs;
export {
  collection,
  uiDataFactory,
  proxy,
};
