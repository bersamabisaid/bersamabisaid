import hasRequiredQuery from '../_middleware/hasRequiredQuery';
import allowCors from '../_middleware/allowCors';
import apiMethod from '../_middleware/apiMethod';
import { collection } from '../_services/firebase';
import { FinishPaymentRedirectQuery } from '../../shared/types/midtransApi';

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable camelcase */
const isFinishPaymentRedirectQuery = function (data: any): data is FinishPaymentRedirectQuery {
  return Boolean(
    data?.order_id,
  );
};
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
/* eslint-enable camelcase */

const handler = hasRequiredQuery(isFinishPaymentRedirectQuery, async ({ query }, res) => {
  const doc = await collection.Donations.doc(query.order_id).get();

  if (doc.exists) {
    const data = doc.data();

    res.redirect(data!._system.finishPaymentRedirectUrl);
  }

  res.status(404).end();
});

module.exports = allowCors(apiMethod.get(handler));
