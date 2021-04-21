/* eslint-disable @typescript-eslint/no-namespace */
import type * as fb from 'firebase-admin';
import firebaseAdmin, { db } from './firebaseAdmin';
import firestoreCollectionName, { DocRef, CollectionRef } from '../../../shared/firestoreCollection';
import type { Model, ModelUIData, TimestampedModel } from '../../../shared/types/model';

const firestoreCollection = {
  Programs: db.collection(firestoreCollectionName.PROGRAMS) as CollectionRef.ProgramModel<true>,
  Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as CollectionRef.TransactionModel<true>,
  TransactionClients: db.collection(firestoreCollectionName.TRANSACTION_CLIENTS) as CollectionRef.TransactionClientModel<true>,
  Donators: db.collection(firestoreCollectionName.DONATORS) as CollectionRef.DonatorModel<true>,
  Donations: (programRef: DocRef.ProgramModel<true>) => programRef
    .collection(firestoreCollectionName.DONATIONS) as CollectionRef.DonationModel<true>,
};

const uiDataFactory = <T = unknown> (
  data: T,
  expiration: ModelUIData<T>['expiration'] = null,
): ModelUIData<T, true> => ({
    value: data,
    lastUpdate: firebaseAdmin.firestore.Timestamp.now(),
    expiration,
  });

const isSnapshotExists = <T = unknown>(
  snapshot: fb.firestore.DocumentSnapshot<T>,
): snapshot is fb.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

const firestoreProxy = {
  create<T = unknown>(data: T): Model<T, true> {
    const now = firebaseAdmin.firestore.Timestamp.now();

    return {
      ...data,
      _created: now,
      _updated: now,
      _deleted: null,
    };
  },

  update<T extends TimestampedModel>(data: T): Model<T, true> {
    const now = firebaseAdmin.firestore.Timestamp.now();

    return {
      ...data,
      _updated: now,
    };
  },
};

const getItemRefsFromTransactionRef = async (transactionRef: DocRef.TransactionModel<true>) => {
  const snapshot = await transactionRef.get();

  if (isSnapshotExists(snapshot)) {
    const { items } = snapshot.data();

    return items.map((el) => el.ref)
      .filter(Boolean) as DocRef.base<unknown, true>[];
  }

  return [];
};

export default firestoreCollection;

export {
  uiDataFactory,
  firestoreProxy,
  isSnapshotExists,
  getItemRefsFromTransactionRef,
};
