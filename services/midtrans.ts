import { MidtransClient } from 'midtrans-node-client';

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_serverKey,
});

export default {
  snap,
};
