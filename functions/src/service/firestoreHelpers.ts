/* eslint-disable @typescript-eslint/no-namespace */
import { firestore } from './firebaseAdmin';
import type { DocRef } from '../../../shared/firebase/firestoreCollection';

const getItemRefsFromTransactionRef = async (transactionRef: DocRef.TransactionModel<true>) => {
  const snapshot = await transactionRef.get();

  if (firestore.utils.isSnapshotExists(snapshot)) {
    const { items } = snapshot.data();

    return items.map((el) => el.ref)
      .filter(Boolean) as DocRef.base<unknown, true>[];
  }

  return [];
};

export {
  getItemRefsFromTransactionRef,
};
