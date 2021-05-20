import { memoize } from 'lodash';
import firebase from 'firebase/app';
import firestoreCollectionName, { CollectionRef, DocRef } from './firestoreCollection';
import { TimestampedModel, ModelUIData, ModelInObject } from '../types/model';
import 'firebase/firestore';
import type fb from 'firebase';

const init = memoize((app: fb.app.App) => {
  const db = app.firestore();
  const collections = {
    Programs: db.collection(firestoreCollectionName.PROGRAMS) as CollectionRef.ProgramModel,
    Donators: db.collection(firestoreCollectionName.DONATORS) as CollectionRef.DonatorModel,
    Donations: (programRef: DocRef.ProgramModel) => programRef
      .collection(firestoreCollectionName.DONATIONS) as CollectionRef.DonationModel,
    Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as CollectionRef.TransactionModel,
  };

  const isSnapshotExists = <T = unknown>(
    snapshot: fb.firestore.DocumentSnapshot<T>,
  ): snapshot is fb.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

  const createAttrs = (): TimestampedModel => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _created: now,
      _updated: now,
      _deleted: null,
    };
  };

  const updateAttrs = (): Pick<TimestampedModel, '_updated'> => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _updated: now,
    };
  };

  const deleteAttrs = (): Pick<TimestampedModel, '_deleted'> => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _deleted: now,
    };
  };

  const modelUiDataFactory = <T = unknown>(value: T, expiration: ModelUIData<T>['expiration'] = null): ModelUIData<T> => ({
    value,
    expiration,
    lastUpdate: firebase.firestore.Timestamp.now(),
  });

  const modelToObject = <T>(snapshot: fb.firestore.DocumentSnapshot<T> | fb.firestore.QueryDocumentSnapshot<T>) => ({
    ...snapshot.data(),
    _uid: snapshot.id,
  } as ModelInObject<T>);

  return {
    db,
    collections,
    factory: {
      createAttrs,
      updateAttrs,
      deleteAttrs,
      modelUiData: modelUiDataFactory,
    },
    utils: {
      modelToObject,
      isSnapshotExists,
    },
  };
});

export {
  init as default,
};
