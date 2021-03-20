/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
import type { GetStatusTransaction } from '../../shared/types/midtransApi';
import type { Donator } from '../../shared/types/modelData';

export interface CreateTransactionRequestBody {
  eventId: string;
  eventName: string;
  donator: Donator;
  amount: number;
  message: string;
  finishPaymentRedirectUrl?: string;
}

export const isDonator = function (data: any): data is Donator {
  return Boolean(
    data?.nickName
    && data?.fullName
    && data?.email
    && data?.address
    && data?.phoneNumber,
  );
};

export const isCreateTransactionRequestBody = function (data: any): data is CreateTransactionRequestBody {
  return Boolean(
    data?.eventId
    && data?.eventName
    && isDonator(data?.donator)
    && data?.amount
    && data?.message,
  );
};

export type PaymentWebhookRequestBody = Pick<GetStatusTransaction,
  'order_id' | 'transaction_id' | 'transaction_status' | 'fraud_status' | 'signature_key'>;

export const isPaymentWebhookRequestBody = function (data: any): data is PaymentWebhookRequestBody {
  return Boolean(
    typeof data?.order_id === 'string'
    && typeof data?.transaction_id === 'string'
    && typeof data?.transaction_status === 'string'
    && typeof data?.fraud_status === 'string'
    && typeof data?.signature_key === 'string',
  );
};
