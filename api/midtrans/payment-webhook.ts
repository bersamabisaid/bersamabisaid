import { NowApiHandler } from '@vercel/node';
import allowCors from '../utils/_allowCors';
import apiMethod from '../utils/_apiMethod';
import midtrans from '../services/_midtrans';
import fbs from '../services/_firebase';

const handler: NowApiHandler = async (req, res) => {
  await fbs.admin.firestore().collection('tests')
    .add(await midtrans.snap.transaction.notification(req.body));

  res.end();
};

module.exports = allowCors(apiMethod.post(handler));
