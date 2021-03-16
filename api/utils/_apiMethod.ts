import { NowApiHandler } from '@vercel/node';

const factory = function (method: string): (fn: NowApiHandler) => NowApiHandler {
  return (fn) => (req, res) => {
    if (req.method === method) {
      return fn(req, res);
    }
    return res.status(405).end();
  };
};

export default {
  get: factory('GET'),
  post: factory('POST'),
};
