/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import { Donator, isDonator } from '../../shared/types/modelData';
import type { GetStatusTransaction } from '../../shared/types/midtransApi';

export interface PayDonationRequestBody {
  programId: string;
  programName: string;
  donator: Donator;
  hideDonator: boolean;
  amount: number;
  message: string;
  finishPaymentRedirectURL?: string;
}

export const isPayDonationRequestBody = function (data: any): data is PayDonationRequestBody {
  return typeof data?.programId === 'string'
    && typeof data?.programName === 'string'
    && isDonator(data?.donator)
    && typeof data?.hideDonator === 'boolean'
    && typeof data?.amount === 'number'
    && typeof data?.message === 'string';
};

export type PaymentWebhookRequestBody = Pick<GetStatusTransaction,
  'order_id' | 'transaction_id' | 'transaction_status' | 'fraud_status' | 'signature_key'>;

export const isPaymentWebhookRequestBody = function (data: any): data is PaymentWebhookRequestBody {
  return typeof data?.order_id === 'string'
    && typeof data?.transaction_id === 'string'
    && typeof data?.transaction_status === 'string'
    && typeof data?.signature_key === 'string';
};
