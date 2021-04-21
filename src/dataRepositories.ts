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
  ...createAttrs(),
};

export const programDataRepo = {
  defaultBaseModelData: () => defaultProgramBaseModelData,

  defaultCommonModelData: () => ({
    ...defaultProgramBaseModelData,
    donation: false,
  }) as Model<ProgramCommon>,

  defaultDonationModelData: () => ({
    ...defaultProgramBaseModelData,
    donation: true,
    deadline: fbs.firestore.Timestamp.now(),
    target: null,
    _ui: {
      progress: modelUiDataFactory(0),
      numOfDonations: modelUiDataFactory(0),
      recentDonations: modelUiDataFactory([]),
    },
  }) as Model<ProgramDonation>,
};
