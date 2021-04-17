/* eslint-disable camelcase */
import type { TransactionRequestType } from 'midtrans-node-client/dist/types/snap';
import midtrans from './service/midtrans';
import firestoreCollection, { firestoreProxy, uiDataFactory } from './service/firestoreCollection';
import type { Transaction, TransactionItem } from '../../shared/types/modelData';

type snapFull = NonNullable<TransactionRequestType['snapFull']>;

export type createTransactionItem = NonNullable<snapFull['item_details']>
  & Pick<TransactionItem<true>, 'ref'>;

export type createTransactionParams = Omit<snapFull, 'transaction_details' | 'item_details' | 'callbacks'> & {
  item_details: createTransactionItem[];
  transaction_details: {
    gross_amount: snapFull['transaction_details']['gross_amount'],
    order_id?: snapFull['transaction_details']['order_id'],
  };
  client: {
    ref: Transaction<true>['client'];
    name: string;
  };
  callbacks?: snapFull['callbacks'];
}

export interface CreateTransactionSuccessResponse {
  token: string;
  redirect_url: string;
}

export interface CreateTransactionFailedResponse {
  error_messages: string;
}

export const recordTransactionToFirestore = (payload: Transaction<true>) => firestoreCollection
  .Transactions.add(firestoreProxy.create(payload));

export const createTransaction = async ({ transaction_details, ...payload }: createTransactionParams) => {
  const transactionRef = await recordTransactionToFirestore({
    grossAmount: transaction_details.gross_amount,
    client: payload.client.ref,
    items: payload.item_details.map((el) => ({
      name: el.name,
      price: el.price,
      qty: el.quantity,
      ref: el.ref,
    })),
    _ui: {
      clientName: uiDataFactory(payload.client.name),
    },
  });
  const midtransTransaction = await midtrans.snap.createTransaction({
    snapFull: {
      ...payload,
      transaction_details: {
        gross_amount: transaction_details.gross_amount,
        order_id: transaction_details.order_id || transactionRef.id,
      },
    },
  }) as CreateTransactionSuccessResponse;

  return [midtransTransaction, transactionRef] as const;
};
