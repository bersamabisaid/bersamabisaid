import fbsClient, { firestoreClient } from 'src/firebaseClientService';
import { Factory } from 'src/firestoreHelpers';
import type { Model } from 'shared/types/model';
import type { ProgramCommon, ProgramDonation, IBaseProgram } from 'shared/types/schema';

const getProgramByUrl = Factory.getDocumentBy(firestoreClient.collections.Programs, 'URL');

const defaultProgramBaseModelData: Model<IBaseProgram> = Object.freeze({
  title: '',
  organizer: '',
  description: '',
  image: '',
  URL: '',
  orderPriority: 0,
  ...firestoreClient.factory.createAttrs(),
});

const programDataDefaults = {
  baseModelData: () => defaultProgramBaseModelData,

  commonModelData: (): Model<ProgramCommon> => ({
    ...programDataDefaults.baseModelData(),
    donation: false,
  }),

  donationModelData: (): Model<ProgramDonation> => ({
    ...programDataDefaults.baseModelData(),
    donation: true,
    deadline: fbsClient.firestore.Timestamp.now(),
    target: null,
    _ui: {
      progress: firestoreClient.factory.modelUiData(0),
      numOfDonations: firestoreClient.factory.modelUiData(0),
    },
  }),
};

export {
  getProgramByUrl,

  programDataDefaults,
};
