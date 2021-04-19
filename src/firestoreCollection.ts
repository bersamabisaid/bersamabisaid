import fbs, { db } from 'src/services/firebaseService';
import firestoreCollectionName from 'shared/firestoreCollection';
import type {
  Model, ModelInObject, ModelUIData, TimestampedModel,
} from 'shared/types/model';
import type {
  Donation, Donator, Event, Transaction,
} from 'shared/types/modelData';
import type fb from 'firebase';

type ModelCollectionReference<T> = fb.firestore.CollectionReference<Model<T>>;

const firestoreCollection = {
  Events: db.collection(firestoreCollectionName.EVENTS) as ModelCollectionReference<Event>,
  Donators: db.collection(firestoreCollectionName.DONATORS) as ModelCollectionReference<Donator>,
  Donations: db.collection(firestoreCollectionName.DONATIONS) as ModelCollectionReference<Donation>,
  Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as ModelCollectionReference<Transaction>,
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
