import { NowApiHandler } from '@vercel/node';
import { MidtransClient } from 'midtrans-node-client';
import allowCors from './utils/allowCors';

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_serverKey,
  clientKey: process.env.MIDTRANS_clientKey,
});

module.exports = allowCors((async (req, res) => {
  const transaction = await snap.createTransactionRedirectUrl({
    transaction_details: {
      order_id: Date.now(),
      gross_amount: 1,
    },
  });

  if (req.headers.accept === 'application/json') {
    res.json(transaction);
  } else {
    res.redirect(transaction);
  }
}) as NowApiHandler);
