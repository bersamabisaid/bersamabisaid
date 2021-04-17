import type { Request, Response } from 'firebase-functions';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type typePredicateFn <T> = (data: any) => data is T;

type narrowedReqHandler<T> = Omit<Request, 'body'> & {
  body: T;
}

type handler = (req: Request, res: Response) => void | Promise<void>;

type narrowedHandler<T> = (req: narrowedReqHandler<T>, res: Response) => void | Promise<void>;

export default function hasRequiredBody<T>(typePredicateFn: typePredicateFn<T>, fn: narrowedHandler<T>): handler {
  return (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = req.body;

    if (typePredicateFn(data)) {
      return fn(
        Object.assign(req, { body: data }),
        res,
      );
    }

    return res.status(400).end();
  };
}
