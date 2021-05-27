/* eslint-disable @typescript-eslint/no-namespace */
import type fb from 'firebase';
import type fbNode from 'firebase-admin';
import type { Model } from '../types/model';
import type {
  Program, ProgramDonation, ProgramCommon, Transaction, TransactionClient, Donation, Donator,
} from '../types/schema';

const firestoreCollectionName = {
  CONTENTS: 'Contents',
  DONATIONS: 'Donations',
  DONATORS: 'Donators',
  PROGRAMS: 'Programs',
  TRANSACTIONS: 'Transactions',
  TRANSACTION_CLIENTS: 'TransactionClients',
};

export namespace DocRef {
  export type base<T, isNodeCtx = false> = isNodeCtx extends true
    ? fbNode.firestore.DocumentReference<Model<T, isNodeCtx>>
    : fb.firestore.DocumentReference<Model<T, isNodeCtx>>;
  export type ProgramModel<isNodeCtx = false> = base<Program<isNodeCtx>, isNodeCtx>;
  export type ProgramDonationModel<isNodeCtx = false> = base<ProgramDonation<isNodeCtx>, isNodeCtx>;
  export type ProgramCommonModel<isNodeCtx = false> = base<ProgramCommon, isNodeCtx>;
  export type TransactionModel<isNodeCtx = false> = base<Transaction<isNodeCtx>, isNodeCtx>;
  export type TransactionClientModel<isNodeCtx = false> = base<TransactionClient, isNodeCtx>;
  export type DonationModel<isNodeCtx = false> = base<Donation<isNodeCtx>, isNodeCtx>;
  export type DonatorModel<isNodeCtx = false> = base<Donator, isNodeCtx>;
}

export namespace CollectionRef {
  export type base<T, isNodeCtx = false> = isNodeCtx extends true
    ? fbNode.firestore.CollectionReference<Model<T, isNodeCtx>>
    : fb.firestore.CollectionReference<Model<T, isNodeCtx>>;
  export type ProgramModel<isNodeCtx = false> = base<Program<isNodeCtx>, isNodeCtx>;
  export type ProgramDonationModel<isNodeCtx = false> = base<ProgramDonation<isNodeCtx>, isNodeCtx>;
  export type ProgramCommonModel<isNodeCtx = false> = base<ProgramCommon, isNodeCtx>;
  export type TransactionModel<isNodeCtx = false> = base<Transaction<isNodeCtx>, isNodeCtx>;
  export type TransactionClientModel<isNodeCtx = false> = base<TransactionClient, isNodeCtx>;
  export type DonationModel<isNodeCtx = false> = base<Donation<isNodeCtx>, isNodeCtx>;
  export type DonatorModel<isNodeCtx = false> = base<Donator, isNodeCtx>;
}

export namespace Snapshot {
  export type base<T, isNodeCtx = false> = isNodeCtx extends true
    ? fbNode.firestore.DocumentSnapshot<Model<T, isNodeCtx>>
    : fb.firestore.DocumentSnapshot<Model<T, isNodeCtx>>;
  export type ProgramModel<isNodeCtx = false> = base<Program<isNodeCtx>, isNodeCtx>;
  export type ProgramDonationModel<isNodeCtx = false> = base<ProgramDonation<isNodeCtx>, isNodeCtx>;
  export type ProgramCommonModel<isNodeCtx = false> = base<ProgramCommon, isNodeCtx>;
  export type TransactionModel<isNodeCtx = false> = base<Transaction<isNodeCtx>, isNodeCtx>;
  export type TransactionClientModel<isNodeCtx = false> = base<TransactionClient, isNodeCtx>;
  export type DonationModel<isNodeCtx = false> = base<Donation<isNodeCtx>, isNodeCtx>;
  export type DonatorModel<isNodeCtx = false> = base<Donator, isNodeCtx>;
}

export default firestoreCollectionName;
