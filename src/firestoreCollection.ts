/* eslint-disable @typescript-eslint/no-namespace */
import fbs, { db } from 'src/services/firebaseService';
import firestoreCollectionName, { CollectionRef, DocRef } from 'shared/firestoreCollection';
import type {
  ModelInObject, ModelUIData, TimestampedModel,
} from 'shared/types/model';
import type fb from 'firebase';

const firestoreCollection = {
  Events: db.collection(firestoreCollectionName.EVENTS) as CollectionRef.EventModel,
  Donators: db.collection(firestoreCollectionName.DONATORS) as CollectionRef.DonatorModel,
  Donations: (eventRef: DocRef.EventModel) => eventRef
    .collection(firestoreCollectionName.DONATIONS) as CollectionRef.DonationModel,
  Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as CollectionRef.TransactionModel,
};

const isSnapshotExists = <T = unknown>(
  snapshot: fb.firestore.DocumentSnapshot<T>,
): snapshot is fb.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

const createAttrs = (): TimestampedModel => {
  const now = fbs.firestore.Timestamp.now();

  return {
    _created: now,
    _updated: now,
    _deleted: null,
  };
};

const updateAttrs = (): Pick<TimestampedModel, '_updated'> => {
  const now = fbs.firestore.Timestamp.now();

  return {
    _updated: now,
  };
};

const deleteAttrs = (): Pick<TimestampedModel, '_deleted'> => {
  const now = fbs.firestore.Timestamp.now();

  return {
    _deleted: now,
  };
};

const modelUiDataFactory = <T = unknown>(value: T, expiration: ModelUIData<T>['expiration'] = null): ModelUIData<T> => ({
  value,
  expiration,
  lastUpdate: fbs.firestore.Timestamp.now(),
});

const modelToObject = <T>(snapshot: fb.firestore.DocumentSnapshot<T> | fb.firestore.QueryDocumentSnapshot<T>) => ({
  ...snapshot.data(),
  _uid: snapshot.id,
} as ModelInObject<T>);

export default firestoreCollection;

export {
  isSnapshotExists,
  createAttrs,
  updateAttrs,
  deleteAttrs,
  modelUiDataFactory,
  modelToObject,
};
