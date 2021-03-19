import type { NowApiHandler, VercelRequest, VercelResponse } from '@vercel/node';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type typePredicateFn <T> = (data: any) => data is T;

type narrowedReqApiHandler<T> = Omit<VercelRequest, 'query'> & {
  query: T;
}

type narrowedApiHandler<T> = (req: narrowedReqApiHandler<T>, res: VercelResponse) => void | Promise<void>;

export default function hasRequiredQuery<T>(typePredicateFn: typePredicateFn<T>, fn: narrowedApiHandler<T>): NowApiHandler {
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
