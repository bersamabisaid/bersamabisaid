import * as functions from 'firebase-functions';
import { pay } from './donation';
import { isPayDonationRequestBody } from '../../../shared/types/backendRequest';
import { PayDonationResponse } from '../../../shared/types/backendResponse';
import type { ApiResponse } from '../../../shared/types/model';

const callablePay = functions.https.onCall(async (payload, ctx) => {
  try {
    if (isPayDonationRequestBody(payload)) {
      const finishPaymentRedirectURL = payload.finishPaymentRedirectURL || ctx.rawRequest.url;
      const { donationRef, transactionAction } = await pay({
        ...payload,
        finishPaymentRedirectURL,
      });

      return {
        success: true,
        message: 'Please use this given link to go to the payment page',
        data: {
        // because donationId will be always same to transactionId
          transactionId: donationRef.id,
          redirectURL: transactionAction.redirect_url,
        },
      } as ApiResponse<PayDonationResponse>;
    }

    return {
      success: false,
      message: 'Missing required arguments!',
      data: undefined,
    } as ApiResponse;
  } catch (err) {
    functions.logger.error(err);

    return {
      success: false,
      message: 'Oops! There\'s unhandled error, please contact the Developer immediately',
      data: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        env: functions.config().app?.env,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        errors: err,
      },
    } as ApiResponse;
  }
});

export default callablePay;
