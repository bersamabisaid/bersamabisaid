import * as functions from 'firebase-functions';
import { MidtransClient } from 'midtrans-node-client';

const snap = new MidtransClient.Snap({
  /* eslint-disable @typescript-eslint/no-unsafe-member-access */
  isProduction: (functions.config().app.env as string) === 'production',
  serverKey: functions.config().midtrans.server_key as string,
  clientKey: functions.config().midtrans.client_key as string,
  /* eslint-enable @typescript-eslint/no-unsafe-member-access */
});

export default {
  snap,
};
