import { ApiResponse } from 'app/shared/types/model';
import apiMethod from '../../_middleware/apiMethod';
import hasRequiredQuery from '../../_middleware/hasRequiredQuery';
import midtrans from '../../_services/midtrans';

interface Query {
  id: string;
}

type SuccessResponse = ApiResponse<Record<string, unknown>>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isQuerySatisfied = function (data: any): data is Query {
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  return typeof data?.id === 'string';
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
};

const handler = hasRequiredQuery(isQuerySatisfied, async ({ query }, res) => {
  try {
    res.json({
      success: true,
      message: '',
      data: await midtrans.snap.transaction.status(query.id),
    } as SuccessResponse);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = apiMethod.get(handler);
