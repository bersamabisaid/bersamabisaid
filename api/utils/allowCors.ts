import { NowApiHandler } from '@vercel/node';

export default function allowCors(fn: NowApiHandler): NowApiHandler {
  return (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
    );

    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // eslint-disable-next-line consistent-return
    return fn(req, res);
  };
}
