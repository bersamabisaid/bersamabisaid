import { firestore } from '../service/firebaseAdmin';
import { createTransaction } from '../createTransaction';
import type { PayDonationRequestBody } from '../../../shared/types/backendRequest';
import type { DocRef } from '../../../shared/firebase/firestoreCollection';

const HIDDEN_DONATOR_NAME = 'Hamba Allah';

export const pay = async ({ donator, ...data }: Required<PayDonationRequestBody>) => {
  const batch = firestore.db.batch();
  const programRef = firestore.collections.Programs.doc(data.programId) as DocRef.ProgramDonationModel<true>;
  const donatorAsClient = firestore.collections.TransactionClients.doc();

  batch.create(donatorAsClient, {
    fullname: donator.fullName,
    email: donator.email,
    phoneNumber: donator.phoneNumber,
    address: donator.address,
    ...firestore.factory.createAttrs(),
  });

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

  const donationRef = firestore.collections.Donations(programRef).doc(transactionRef.id);
  // delete the document first to make the document hidden
  batch.create(donationRef, {
    program: programRef,
    transaction: transactionRef,
    donator: donatorAsClient,
    hideDonator: data.hideDonator,
    amount: data.amount,
    message: data.message,
    _ui: {
      donatorName: firestore.factory.modelUiData({
        foreignKey: donatorAsClient,
        data: data.hideDonator ? HIDDEN_DONATOR_NAME : donator.fullName,
      }),
      programName: firestore.factory.modelUiData({
        foreignKey: programRef,
        data: data.programName,
      }),
    },
    _system: { finishPaymentRedirectURL: data.finishPaymentRedirectURL },
    ...firestore.factory.createAttrs(),
    ...firestore.factory.deleteAttrs(),
  });

  await batch.commit();

  return {
    programRef,
    donatorRef: donatorAsClient,
    donationRef,
    transactionRef,
    transactionAction,
  };
};

export const addProgramDonationProgress = (donationRef: DocRef.DonationModel<true>) => firestore.db
  .runTransaction(async (fbt) => {
    const donation = await fbt.get(donationRef);

    if (firestore.utils.isSnapshotExists(donation)) {
      const {
        amount, program: programRef,
      } = donation.data();
      const program = await fbt.get(programRef);

      if (firestore.utils.isSnapshotExists(program)) {
        const { _ui: { progress, numOfDonations } } = program.data();

        const newProgress = progress.value + amount;
        const newNumOfDonations = numOfDonations.value + 1;

        fbt.update(programRef, {
          '_ui.progress': firestore.factory.modelUiData(newProgress),
          '_ui.numOfDonations': firestore.factory.modelUiData(newNumOfDonations),
        });

        return undefined as void;
      }
    }

    throw new Error('Nothing changed!');
  });
