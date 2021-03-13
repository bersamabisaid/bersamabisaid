/* eslint-disable camelcase */
import type { NowApiHandler } from '@vercel/node';
import midtrans from 'app/services/midtrans';
import allowCors from './utils/allowCors';

module.exports = allowCors((async (req, res) => {
  try {
    const transaction = await midtrans.snap.createTransactionRedirectUrl({
      transaction_details: {
        order_id: Date.now(),
        gross_amount: 1,
      },
    });

    if (req.headers.accept === 'application/json') res.json(transaction);
    else res.redirect(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
}) as NowApiHandler);
