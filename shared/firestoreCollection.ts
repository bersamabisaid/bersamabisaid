/* eslint-disable @typescript-eslint/no-namespace */
import type fb from 'firebase';
import type fbNode from 'firebase-admin';
import { Model } from 'shared/types/model';
import {
  Event, EventDonation, EventCommon, Transaction, TransactionClient, Donation, Donator,
} from 'shared/types/modelData';

const firestoreCollectionName = {
  CONTENTS: 'Contents',
  DONATIONS: 'Donations',
  DONATORS: 'Donators',
  EVENTS: 'Events',
  TRANSACTIONS: 'Transactions',
  TRANSACTION_CLIENTS: 'TransactionClients',
};

export namespace DocRef {
  export type base<T, isNodeCtx = false> = isNodeCtx extends true
    ? fbNode.firestore.DocumentReference<Model<T, isNodeCtx>>
    : fb.firestore.DocumentReference<Model<T, isNodeCtx>>;
  export type EventModel<isNodeCtx = false> = base<Event<isNodeCtx>, isNodeCtx>;
  export type EventDonationModel<isNodeCtx = false> = base<EventDonation<isNodeCtx>, isNodeCtx>;
  export type EventCommonModel<isNodeCtx = false> = base<EventCommon, isNodeCtx>;
  export type TransactionModel<isNodeCtx = false> = base<Transaction<isNodeCtx>, isNodeCtx>;
  export type TransactionClientModel<isNodeCtx = false> = base<TransactionClient, isNodeCtx>;
  export type DonationModel<isNodeCtx = false> = base<Donation<isNodeCtx>, isNodeCtx>;
  export type DonatorModel<isNodeCtx = false> = base<Donator, isNodeCtx>;
}

export namespace CollectionRef {
  export type base<T, isNodeCtx = false> = isNodeCtx extends true
    ? fbNode.firestore.CollectionReference<Model<T, isNodeCtx>>
    : fb.firestore.CollectionReference<Model<T, isNodeCtx>>;
  export type EventModel<isNodeCtx = false> = base<Event<isNodeCtx>, isNodeCtx>;
  export type EventDonationModel<isNodeCtx = false> = base<EventDonation<isNodeCtx>, isNodeCtx>;
  export type EventCommonModel<isNodeCtx = false> = base<EventCommon, isNodeCtx>;
  export type TransactionModel<isNodeCtx = false> = base<Transaction<isNodeCtx>, isNodeCtx>;
  export type TransactionClientModel<isNodeCtx = false> = base<TransactionClient, isNodeCtx>;
  export type DonationModel<isNodeCtx = false> = base<Donation<isNodeCtx>, isNodeCtx>;
  export type DonatorModel<isNodeCtx = false> = base<Donator, isNodeCtx>;
}

export default firestoreCollectionName;
