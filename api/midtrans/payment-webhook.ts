import { NowApiHandler } from '@vercel/node';
import allowCors from '../_middleware/allowCors';
import apiMethod from '../_middleware/apiMethod';
import midtrans from '../_services/midtrans';
import fbs from '../_services/firebase';

const handler: NowApiHandler = async (req, res) => {
  await fbs.db().collection('tests')
    .add(await midtrans.snap.transaction.notification(req.body));

  res.end();
};

module.exports = allowCors(apiMethod.post(handler));
