import type { NowApiHandler } from '@vercel/node';
import midtrans from '../services/_midtrans';
import fbs from '../services/_firebase';
import apiMethod from '../utils/_apiMethod';
import allowCors from '../utils/_allowCors';

const handler: NowApiHandler = async (req, res) => {
  const id = Date.now();

  try {
    await fbs.admin.firestore().collection('Transactions').add({
      id,
      redirect: 'http://localhost:8080/',
    });
  } catch (err) {
    console.error(err);
  }

  try {
    const transaction = await midtrans.snap.createTransactionRedirectUrl({
      transaction_details: {
        order_id: id,
        gross_amount: 1,
      },
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = allowCors(process.env.NODE_ENV === 'development' ? handler : apiMethod.post(handler));
