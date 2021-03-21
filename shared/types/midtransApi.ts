/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable camelcase */
export interface RefundTransaction {
  refund_chargeback_id: number;
  refund_amount: string;
  created_at: string;
  reason: string;
  refund_key: string;
  refund_method: string;
  bank_confirmed_at: string;
}

export interface GetStatusTransaction {
  transaction_id: string;
  order_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string; // timestamp
  transaction_status: 'capture' | 'settlement' | 'pending' | 'deny' | 'cancel' | 'expire' | 'refund';
  fraud_status: 'accept' | 'challenge' | 'deny';
  status_code: string;
  status_message: string;
  signature_key: string;
  bank?: string;
  card_type?: string;
  masked_card?: string;
  approval_code?: string;
  channel_response_code?: string;
  channel_response_message?: string;
  refund_amount?: string;
  refunds?: RefundTransaction[];
}

// export const isGetTransactionStatus = function (data: any): data is GetStatusTransaction {
//   return Boolean(
//     data?.transaction_id,

//   );
// };

export interface FinishPaymentRedirectQuery {
  order_id: string;
  status_code: string;
  transaction_status: string;
}
