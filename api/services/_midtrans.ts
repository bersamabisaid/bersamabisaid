import { MidtransClient } from 'midtrans-node-client';

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_serverKey,
  clientKey: process.env.MIDTRANS_clientKey,
});

export default {
  snap,
};
