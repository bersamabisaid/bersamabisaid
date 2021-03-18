import type { NowApiHandler, VercelRequest, VercelResponse } from '@vercel/node';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type typePredicateFn <T> = (data: any) => data is T;

type narrowedReqApiHandler<T> = Omit<VercelRequest, 'body'> & {
  body: T;
}

type narrowedApiHandler<T> = (req: narrowedReqApiHandler<T>, res: VercelResponse) => void | Promise<void>;

export default function hasRequiredBody<T>(typePredicateFn: typePredicateFn<T>, fn: narrowedApiHandler<T>): NowApiHandler {
  return (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const data = JSON.parse(req.body);

    if (typePredicateFn(data)) {
      return fn(
        Object.assign(req, { body: data }),
        res,
      );
    }

    return res.status(400).end();
  };
}
