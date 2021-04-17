import { Request, Response } from 'firebase-functions';

type handler = (req: Request, res: Response) => void | Promise<void>;

const factory = function (method: string): (fn: handler) => handler {
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
