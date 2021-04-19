import { fns } from 'src/services/firebaseService';
import type { ApiResponse } from 'shared/types/model';
import type { PayDonationRequestBody } from 'shared/types/backendRequest';

class HttpsCallableError<T> extends Error {
  message: string;

  data?: T;

  constructor({ data, message }: ApiResponse<T>) {
    super(message);
    this.message = message;
    this.data = data;
  }
}

const httpsCallableFactory = function <T, U> (name: string) {
  const fn = fns.httpsCallable(name);

  return async (data: T): Promise<ApiResponse<U>> => {
    const { data: response } = await fn(data) as {data: ApiResponse<U>};

    if (response.success) {
      return response;
    }

    throw new HttpsCallableError(response);
  };
};

interface PayDonationResponse {
  redirectURL: string;
  donationId: string;
}

export const payDonation = httpsCallableFactory<PayDonationRequestBody, PayDonationResponse>('donationPay');
