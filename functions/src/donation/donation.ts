import * as functions from 'firebase-functions';
import { db } from '../service/firebaseAdmin';
import firestoreCollection, { firestoreProxy, isSnapshotExists, uiDataFactory } from '../service/firestoreCollection';
import { createTransaction } from '../createTransaction';
import { Queue } from '../../../shared/utils/dataStructures';
import type { PayDonationRequestBody } from '../../../shared/types/backendRequest';
import type { ProgramDonation } from '../../../shared/types/modelData';
import type { DocRef } from '../../../shared/firestoreCollection';

export const pay = async ({ donator, ...data }: Required<PayDonationRequestBody>) => {
  const programRef = firestoreCollection.Programs.doc(data.programId) as DocRef.ProgramDonationModel<true>;
  const donatorAsClient = await firestoreCollection.TransactionClients.add(firestoreProxy.create({
    fullname: donator.fullName,
    email: donator.email,
    phoneNumber: donator.phoneNumber,
    address: donator.address,
  }));
  const [transactionAction, transactionRef] = await createTransaction({
    transaction_details: {
      gross_amount: data.amount,
    },
    item_details: [{
      id: data.programId,
      name: data.programName,
      price: data.amount,
      quantity: 1,
      ref: programRef,
    }],
    client: {
      ref: donatorAsClient,
      name: donator.fullName,
    },
  });

  const donationRef = firestoreCollection.Donations(programRef).doc(transactionRef.id);
  await donationRef.set(firestoreProxy.create({
    program: programRef,
    transaction: transactionRef,
    donator: donatorAsClient,
    hideDonator: data.hideDonator,
    amount: data.amount,
    message: data.message,
    _ui: {
      donatorName: uiDataFactory({
        foreignKey: donatorAsClient,
        data: donator.fullName,
      }),
      programName: uiDataFactory({
        foreignKey: programRef,
        data: data.programName,
      }),
    },
    _system: { finishPaymentRedirectURL: data.finishPaymentRedirectURL },
  }));

  return {
    programRef,
    donatorRef: donatorAsClient,
    donationRef,
    transactionRef,
    transactionAction,
  };
};

type inferRecentDonationItem = ProgramDonation<true>['_ui']['recentDonations']['value'][number];

export const addProgramDonationProgress = (donationRef: DocRef.DonationModel<true>) => db
  .runTransaction(async (fbt) => {
    const donation = await fbt.get(donationRef);

    if (isSnapshotExists(donation)) {
      const {
        _ui: { donatorName }, amount, message, hideDonator, program: programRef,
      } = donation.data();
      const program = await fbt.get(programRef);

      if (isSnapshotExists(program)) {
        const { _ui: { recentDonations, progress, numOfDonations } } = program.data();
        const visibleDonation = new Queue<inferRecentDonationItem>({ maxSize: 5, initialValue: recentDonations.value });

        functions.logger.debug({ hideDonator, donatorName: donatorName.value.data, finalName: hideDonator ? 'Hamba Allah' : donatorName.value.data });

        visibleDonation.append({
          data: {
            name: hideDonator ? 'Hamba Allah' : donatorName.value.data,
            amount,
            message,
            timestamp: donation.createTime,
          },
          foreignKey: donationRef,
        });

        const newProgress = progress.value + amount;
        const newNumOfDonations = numOfDonations.value + 1;
        const sortedRecentDonations = visibleDonation.get()
          .sort((
            { data: { timestamp: tt1 } },
            { data: { timestamp: tt2 } },
          ) => tt2.toMillis() - tt1.toMillis());

        fbt.update(programRef, {
          '_ui.progress': uiDataFactory(newProgress),
          '_ui.numOfDonations': uiDataFactory(newNumOfDonations),
          '_ui.recentDonations': uiDataFactory(sortedRecentDonations),
        });

        return undefined as void;
      }
    }

    throw new Error('Nothing changed!');
  });
