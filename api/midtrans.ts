import { NowApiHandler } from '@vercel/node';
import allowCors from './utils/allowCors';
import midtrans from '../services/midtrans';

module.exports = allowCors((async (req, res) => {
  const transaction = await midtrans.snap.createTransactionRedirectUrl({
    transaction_details: {
      order_id: Date.now(),
      gross_amount: 1,
    },
  });

  res.redirect(transaction);
}) as NowApiHandler);
