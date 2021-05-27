import type { Request, Response } from 'firebase-functions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type typePredicateFn <T> = (data: any) => data is T;

type narrowedReqHandler<T> = Omit<Request, 'query'> & {
  query: T;
}

type handler = (req: Request, res: Response) => void | Promise<void>;

type narrowedHandler<T> = (req: narrowedReqHandler<T>, res: Response) => void | Promise<void>;

export default function hasRequiredQuery<T>(typePredicateFn: typePredicateFn<T>, fn: narrowedHandler<T>): handler {
  return (req, res) => {
    const { query } = req;
    if (typePredicateFn(query)) {
      return fn(
        Object.assign(req, { query }),
        res,
      );
    }

    return res.status(400).end();
  };
}
