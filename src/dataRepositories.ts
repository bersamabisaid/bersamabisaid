import fbs from 'src/services/firebaseService';
import { createAttrs, modelUiDataFactory } from 'src/firestoreCollection';
import type { Model } from 'shared/types/model';
import type { EventCommon, EventDonation, IBaseEvent } from 'shared/types/modelData';

const defaultEventBaseModelData: Model<IBaseEvent> = {
  title: '',
  organizer: '',
  description: '',
  image: '',
  URL: '',
  ...createAttrs(),
};

export const eventDataRepo = {
  defaultBaseModelData: () => defaultEventBaseModelData,

  defaultCommonModelData: () => ({
    ...defaultEventBaseModelData,
    donation: false,
  }) as Model<EventCommon>,

  defaultDonationModelData: () => ({
    ...defaultEventBaseModelData,
    donation: true,
    deadline: fbs.firestore.Timestamp.now(),
    target: null,
    _ui: {
      progress: modelUiDataFactory(0),
      recentDonations: modelUiDataFactory([]),
    },
  }) as Model<EventDonation>,
};
