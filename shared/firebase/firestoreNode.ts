import * as firebase from 'firebase-admin';
import { memoize } from 'lodash';
import firestoreCollectionName, { CollectionRef, DocRef } from './firestoreCollection';
import { TimestampedModel, ModelUIData, ModelInObject } from '../types/model';
import type * as fb from 'firebase-admin';

const init = memoize((app: fb.app.App) => {
  const db = app.firestore();
  const collections = {
    Programs: db.collection(firestoreCollectionName.PROGRAMS) as CollectionRef.ProgramModel<true>,
    Donators: db.collection(firestoreCollectionName.DONATORS) as CollectionRef.DonatorModel<true>,
    Donations: (programRef: DocRef.ProgramModel<true>) => programRef
      .collection(firestoreCollectionName.DONATIONS) as CollectionRef.DonationModel<true>,
    Transactions: db.collection(firestoreCollectionName.TRANSACTIONS) as CollectionRef.TransactionModel<true>,
    TransactionClients: db.collection(firestoreCollectionName.TRANSACTION_CLIENTS) as CollectionRef.TransactionClientModel<true>,
  };

  const isSnapshotExists = <T = unknown>(
    snapshot: fb.firestore.DocumentSnapshot<T>,
  ): snapshot is fb.firestore.QueryDocumentSnapshot<T> => snapshot.exists;

  const createAttrs = (): TimestampedModel<true> => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _created: now,
      _updated: now,
      _deleted: null,
    };
  };

  const updateAttrs = (): Pick<TimestampedModel<true>, '_updated'> => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _updated: now,
    };
  };

  const deleteAttrs = (): Pick<TimestampedModel<true>, '_deleted'> => {
    const now = firebase.firestore.Timestamp.now();

    return {
      _deleted: now,
    };
  };

  const restoreAttrs = () => ({
    _deleted: null,
  });

  const modelUiDataFactory = <T = unknown>(value: T, expiration: ModelUIData<T, true>['expiration'] = null): ModelUIData<T, true> => ({
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
      restoreAttrs,
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
