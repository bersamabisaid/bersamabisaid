/* eslint-disable @typescript-eslint/no-namespace */
import type * as fb from 'firebase-admin';
import firebaseAdmin, { db } from './firebaseAdmin';
import firestoreCollectionName from '../../../shared/firestoreCollection';
import type { Model, ModelUIData, TimestampedModel } from '../../../shared/types/model';
import type {
  Donation, Donator, Event, Transaction, TransactionClient,
} from '../../../shared/types/modelData';

export namespace DocRef {
  export type EventModel = fb.firestore.DocumentReference<Model<Event<true>>>;
}

const firestoreCollection = {
  Events: db.collection(firestoreCollectionName.EVENTS) as fb.firestore.CollectionReference<Model<Event<true>>>,
  TransactionClients: db.collection(firestoreCollectionName.TRANSACTION_CLIENTS) as fb.firestore.CollectionReference<Model<TransactionClient>>,
  Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as fb.firestore.CollectionReference<Model<Transaction<true>>>,
  Donators: db.collection(firestoreCollectionName.DONATORS) as fb.firestore.CollectionReference<Model<Donator>>,
  Donations: (eventRef: DocRef.EventModel) => eventRef
    .collection(firestoreCollectionName.DONATIONS) as fb.firestore.CollectionReference<Model<Donation<true>>>,
};

const uiDataFactory = <T = unknown> (
  data: T,
  expiration: ModelUIData<T>['expiration'] = null,
) => ({
  value: data,
  lastUpdate: firebaseAdmin.firestore.Timestamp.now(),
  expiration,
}) as ModelUIData<T>;

const isSnapshotExists = <T = unknown>(
  snapshot: fb.firestore.DocumentSnapshot<T>,
): snapshot is fb.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

const firestoreProxy = {
  create<T = unknown>(data: T): Model<T> {
    const now = firebaseAdmin.firestore.Timestamp.now();

    return {
      ...data,
      _created: now,
      _updated: now,
      _deleted: null,
    };
  },

  update<T extends TimestampedModel>(data: T): Model<T> {
    const now = firebaseAdmin.firestore.Timestamp.now();

    return {
      ...data,
      _updated: now,
    };
  },
};

export default firestoreCollection;

export {
  uiDataFactory,
  firestoreProxy,
  isSnapshotExists,
};
