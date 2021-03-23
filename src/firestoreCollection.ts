import fbs, { db } from 'src/services/firebaseService';
import firestoreCollectionName from 'shared/firestoreCollection';
import type { Model, TimestampedModel } from 'shared/types/model';
import type { Event } from 'shared/types/modelData';
import type fb from 'firebase';

type ModelCollectionReference<T> = fb.firestore.CollectionReference<Model<T>>;

const firestoreCollection = {
  Events: db.collection(firestoreCollectionName.EVENTS) as ModelCollectionReference<Event>,

};

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

export default firestoreCollection;

export {
  createAttrs,
  updateAttrs,
  deleteAttrs,
};
