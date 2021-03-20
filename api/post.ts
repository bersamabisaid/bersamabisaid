import { NowApiHandler } from '@vercel/node';
import apiMethod from './utils/_apiMethod';
import fbs from './services/_firebase';
import allowCors from './utils/_allowCors';

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
