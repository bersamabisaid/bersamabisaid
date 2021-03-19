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
  transaction_time: string;
  transaction_status: 'capture' | 'deny' | 'authorize';
  fraud_status: 'accept' | 'challenge' | 'deny';
  masked_card: string;
  status_code: string;
  bank: string;
  status_message: string;
  signature_key: string;
  approval_code: string;
  channel_response_code: string;
  channel_response_message: string;
  card_type: string;
  refund_amount: string;
  refunds: RefundTransaction[];
}

export interface FinishPaymentRedirectQuery {
  order_id: string;
  status_code: string;
  transaction_status: string;
}
