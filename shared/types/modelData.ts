/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStatusTransaction } from 'shared/types/midtransApi';
import type fb from 'firebase';
import type fbNode from 'firebase-admin';
import type {
  Model, ModelUI, ModelUIHasRelation, TfbTimestamp,
} from 'shared/types/model';
import type { DocRef } from 'shared/firestoreCollection';

export interface Content {
  title: string;
  author: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  URL: string;
}

export interface Address {
  country: string;
  province: string;
  city: string;
  streetAddress: string;
  zipCode: number;
}

export const isAddress = function (data: any) {
  return typeof data?.country === 'string'
    && typeof data?.province === 'string'
    && typeof data?.city === 'string'
    && typeof data?.streetAddress === 'string'
    && typeof data?.zipCode === 'number';
};

export interface TransactionItem<isNodeCtx = false> {
  ref: (isNodeCtx extends true
    ? fbNode.firestore.DocumentReference
    : fb.firestore.DocumentReference)
    | null;
  name: string;
  price: number;
  qty: number;
}

export interface TransactionClient {
  fullname: string;
  email?: string;
  phoneNumber?: string;
  address?: Address;
}

export interface Transaction<isNodeCtx = false> {
  grossAmount: number;
  items: TransactionItem<isNodeCtx>[];
  client: isNodeCtx extends true
    ? fbNode.firestore.DocumentReference<Model<TransactionClient, isNodeCtx>>
    : fb.firestore.DocumentReference<Model<TransactionClient, isNodeCtx>>;
  _ui: ModelUI<{
    clientName: string;
  }, isNodeCtx>;
  paymentStatus?: PaymentStatus;
}

export interface IBaseEvent {
  title: string;
  image: string;
  description: string;
  organizer: string;
  URL: string;
}

export interface IDonationEvent<isNodeCtx = false> {
  target: number | null;
  deadline: TfbTimestamp<isNodeCtx> | null;
  _ui: ModelUI<{
    progress: number;
    numOfDonations: number;
    recentDonations: ModelUIHasRelation<DonationUI<isNodeCtx>, isNodeCtx, Model<Donation<true>, true>>[];
  }, isNodeCtx>;
}

export type Event<isNodeCtx = false> = IBaseEvent & (
  { donation: false }
  | { donation: true } & IDonationEvent<isNodeCtx>
);

export type EventCommon = IBaseEvent & {
  donation: false;
};

export type EventDonation<isNodeCtx = false> = IBaseEvent
  & IDonationEvent<isNodeCtx> & {
  donation: true;
};

export const isEvent = function <isNodeCtx = false> (data: any): data is Event<isNodeCtx> {
  return typeof data?.title === 'string'
    && typeof data?.image === 'string'
    && typeof data?.description === 'string'
    && typeof data?.organizer === 'string'
    && typeof data?.URL === 'string'
    && typeof data?.donation === 'boolean';
};

export const isEventDonation = function <isNodeCtx = false> (data: Event<isNodeCtx>): data is EventDonation<isNodeCtx> {
  return isEvent<isNodeCtx>(data)
    && typeof data?.donation === 'boolean';
};

export interface EventNews<isNodeCtx = false> {
  title: string;
  /**
   * max 200 characters
   */
  description: string;
  timestamp: TfbTimestamp<isNodeCtx>;
  imgURL?: string;
  URL?: string;
}

export interface Donator {
  fullName: string;
  email: string;
  address: Address;
  phoneNumber: string;
}

export const isDonator = function (data: any): data is Donator {
  return typeof data?.fullName === 'string'
    && typeof data?.email === 'string'
    && isAddress(data?.address)
    && typeof data?.phoneNumber === 'string';
};

export interface PaymentStatus {
  status: 'accepted' | 'pending' | 'need_action' | 'fail' | 'cancel' | 'expire' | 'refund';
  timestamp: GetStatusTransaction['transaction_time'];
}

export interface Donation<isNodeCtx = false> {
  event: DocRef.EventDonationModel<isNodeCtx>;
  transaction: DocRef.TransactionModel<isNodeCtx>;
  donator: DocRef.TransactionClientModel<isNodeCtx>;
  amount: number;
  message: string;
  hideDonator: boolean;
  _ui: ModelUI<{
    donatorName: ModelUIHasRelation<string, isNodeCtx>;
    eventName: ModelUIHasRelation<string, isNodeCtx>;
  }, isNodeCtx>;
  _system: {
    finishPaymentRedirectURL: string;
  };
}

export interface DonationUI<isNodeCtx = false> {
  name: string;
  amount: number;
  /**
   * max 200 characters
   */
  message: string;
  /*
   * will be taken from _created property
   */
  timestamp: TfbTimestamp<isNodeCtx>;
}
