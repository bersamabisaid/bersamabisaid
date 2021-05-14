import fbs from 'src/services/firebaseService';
import { createAttrs, modelUiDataFactory } from 'src/firestoreCollection';
import type { Model } from 'shared/types/model';
import type { ProgramCommon, ProgramDonation, IBaseProgram } from 'shared/types/modelData';

const defaultProgramBaseModelData: Model<IBaseProgram> = {
  title: '',
  organizer: '',
  description: '',
  image: '',
  URL: '',
  orderPriority: 0,
  ...createAttrs(),
};

export const programDataRepo = {
  defaultBaseModelData: () => defaultProgramBaseModelData,

  defaultCommonModelData: (): Model<ProgramCommon> => ({
    ...defaultProgramBaseModelData,
    donation: false,
  }),

  defaultDonationModelData: (): Model<ProgramDonation> => ({
    ...defaultProgramBaseModelData,
    donation: true,
    deadline: fbs.firestore.Timestamp.now(),
    target: null,
    _ui: {
      progress: modelUiDataFactory(0),
      numOfDonations: modelUiDataFactory(0),
    },
  }),
};
