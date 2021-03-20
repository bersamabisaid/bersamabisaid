import { NowApiHandler } from '@vercel/node';
import apiMethod from './_middleware/apiMethod';
import allowCors from './_middleware/allowCors';
import fbs from './_services/firebase';

const handler = apiMethod.post((async (req, res) => {
  try {
    const doc = await fbs.db().collection('tests').add(req.body);

    if (req.headers.accept === 'application/json') {
      res.json({
        uid: doc.id,
        ...(await doc.get()).data(),
      });
    }
  } catch (err) {
    console.error(err);
  }

  res.end();
}) as NowApiHandler);

module.exports = allowCors(handler);
