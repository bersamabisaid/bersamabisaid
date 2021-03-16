import { NowApiHandler } from '@vercel/node';
import allowCors from '../utils/_allowCors';
import apiMethod from '../utils/_apiMethod';

const handler: NowApiHandler = (req, res) => {
  res.end();
};

module.exports = allowCors(apiMethod.get(handler));
