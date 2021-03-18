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
  donation: boolean;
}

interface IDonationEvent {
  donation: boolean;
  deadline: fb.firestore.Timestamp;
  target: number | null;
  _ui: ModelUI<{
    progress: number;
    recentDonations: ModelUIHasRelation<DonationUI>[];
  }>;
}

export type Event = IBaseEvent & Partial<IDonationEvent>;

export type DonationEvent = IBaseEvent & IDonationEvent;

export interface Address {
  country: string;
  province: string;
  city: string;
  streetAddress: string;
  zipCode: number;
}

export interface Donator {
  nickName: string;
  fullName: string;
  email: string;
  address: Address;
  phoneNumber: string;
  hidden: boolean;
}

export interface Donation {
  eventId: string;
  donatorId: string;
  amount: number;
  message: string;
  _ui: ModelUI<{
    donatorNickName: ModelUIHasRelation<string>;
    eventName: ModelUIHasRelation<string>;
  }>;
  _system: {
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
