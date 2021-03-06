import { NowApiHandler } from '@vercel/node';
import allowCors from './utils/allowCors';
import midtrans from '../services/midtrans';

module.exports = allowCors((async (req, res) => {
  const transaction = await midtrans.snap.createTransaction({
    transaction_details: {
      order_id: Date.now(),
      gross_amount: 1,
    },
  });

  res.json(transaction);
}) as NowApiHandler);
