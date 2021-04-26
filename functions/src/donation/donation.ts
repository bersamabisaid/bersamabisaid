import { db } from '../service/firebaseAdmin';
import firestoreCollection, { firestoreProxy, isSnapshotExists, uiDataFactory } from '../service/firestoreCollection';
import { createTransaction } from '../createTransaction';
import type { PayDonationRequestBody } from '../../../shared/types/backendRequest';
import type { DocRef } from '../../../shared/firestoreCollection';

const HIDDEN_DONATOR_NAME = 'Hamba Allah';

export const pay = async ({ donator, ...data }: Required<PayDonationRequestBody>) => {
  const batch = db.batch();
  const programRef = firestoreCollection.Programs.doc(data.programId) as DocRef.ProgramDonationModel<true>;
  const donatorAsClient = firestoreCollection.TransactionClients.doc();

  batch.create(donatorAsClient, firestoreProxy.create({
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
  batch.create(donationRef, firestoreProxy.create({
    program: programRef,
    transaction: transactionRef,
    donator: donatorAsClient,
    hideDonator: data.hideDonator,
    amount: data.amount,
    message: data.message,
    _ui: {
      donatorName: uiDataFactory({
        foreignKey: donatorAsClient,
        data: data.hideDonator ? HIDDEN_DONATOR_NAME : donator.fullName,
      }),
      programName: uiDataFactory({
        foreignKey: programRef,
        data: data.programName,
      }),
    },
    _system: { finishPaymentRedirectURL: data.finishPaymentRedirectURL },
  }));

  await batch.commit();

  return {
    programRef,
    donatorRef: donatorAsClient,
    donationRef,
    transactionRef,
    transactionAction,
  };
};

export const addProgramDonationProgress = (donationRef: DocRef.DonationModel<true>) => db
  .runTransaction(async (fbt) => {
    const donation = await fbt.get(donationRef);

    if (isSnapshotExists(donation)) {
      const {
        amount, program: programRef,
      } = donation.data();
      const program = await fbt.get(programRef);

      if (isSnapshotExists(program)) {
        const { _ui: { progress, numOfDonations } } = program.data();

        const newProgress = progress.value + amount;
        const newNumOfDonations = numOfDonations.value + 1;

        fbt.update(programRef, {
          '_ui.progress': uiDataFactory(newProgress),
          '_ui.numOfDonations': uiDataFactory(newNumOfDonations),
        });

        return undefined as void;
      }
    }

    throw new Error('Nothing changed!');
  });
