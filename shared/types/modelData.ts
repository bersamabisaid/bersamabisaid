/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStatusTransaction } from 'app/shared/types/midtransApi';
import type fb from 'firebase';
import type { ModelUI, ModelUIHasRelation } from 'shared/types/model';

export interface Content {
  title: string;
  author: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  url: string;
}

interface IBaseEvent {
  title: string;
  image: string;
  description: string;
  url: string;
}

interface IDonationEvent {
  deadline: fb.firestore.Timestamp;
  target: number | null;
  __ui__: ModelUI<{
    progress: number;
    recentDonations: ModelUIHasRelation<DonationUI>[];
  }>;
}

export type Event = IBaseEvent & (
  { donation: false }
  | { donation: true } & IDonationEvent
);

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

export interface Donator {
  nickName: string;
  fullName: string;
  email: string;
  address: Address;
  phoneNumber: string;
  hidden: boolean;
}

export const isDonator = function (data: any): data is Donator {
  return typeof data?.nickName === 'string'
    && typeof data?.fullName === 'string'
    && typeof data?.email === 'string'
    && isAddress(data?.address)
    && typeof data?.phoneNumber === 'string';
};

export interface PaymentStatus {
  status: 'accepted' | 'pending' | 'need_action' | 'fail' | 'cancel' | 'expire' | 'refund';
  timestamp: GetStatusTransaction['transaction_time'];
}

export interface Donation {
  eventId: string;
  donatorId: string;
  amount: number;
  message: string;
  paymentStatus?: PaymentStatus;
  __ui__: ModelUI<{
    donatorNickName: ModelUIHasRelation<string>;
    eventName: ModelUIHasRelation<string>;
  }>;
  __system__: {
    finishPaymentRedirectUrl: string;
  };
}

export interface DonationUI {
  name: string;
  amount: number;
  message: string;
  // will be taken from _created property
  timestamp: fb.firestore.Timestamp;
}
