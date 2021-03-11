import { NowApiHandler } from '@vercel/node';
import fbs from './services/firebase';
import allowCors from './utils/allowCors';

module.exports = allowCors((async (req, res) => {
  const doc = await fbs.client().firestore().collection('tests').add(req.body);

  res.json({
    uid: doc.id,
    ...(await doc.get()).data(),
  });
}) as NowApiHandler);
