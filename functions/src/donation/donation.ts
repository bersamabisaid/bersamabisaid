import * as functions from 'firebase-functions';
import { db } from '../service/firebaseAdmin';
import { isSnapshotExists, uiDataFactory } from '../service/firestoreCollection';
import { Queue } from '../../../shared/utils/dataStructures';
import type { EventDonation } from '../../../shared/types/modelData';
import type { DocRef } from '../../../shared/firestoreCollection';

type inferRecentDonationItem = EventDonation<true>['_ui']['recentDonations']['value'][number];

export const addEventDonationProgress = (donationRef: DocRef.DonationModel<true>) => db
  .runTransaction(async (fbt) => {
    const donation = await fbt.get(donationRef);

    if (isSnapshotExists(donation)) {
      const {
        _ui: { donatorName }, amount, message, event: eventRef,
      } = donation.data();
      const event = await fbt.get(eventRef);

      if (isSnapshotExists(event)) {
        const { _ui: { recentDonations, progress, numOfDonations } } = event.data();
        const visibleDonation = new Queue<inferRecentDonationItem>({ maxSize: 5, initialValue: recentDonations.value });

        visibleDonation.append({
          data: {
            name: donatorName.value.data,
            amount,
            message,
            timestamp: donation.createTime,
          },
          foreignKey: donationRef,
        });

        const newProgress = progress.value + amount;
        const newNumOfDonations = numOfDonations.value + 1;

        functions.logger.log({ newProgress, newNumOfDonations, recentDonations: visibleDonation.get() });

        fbt.update(eventRef, {
          '_ui.progress': uiDataFactory(newProgress),
          '_ui.numOfDonations': uiDataFactory(newNumOfDonations),
          '_ui.recentDonations': uiDataFactory(visibleDonation.get()),
        });

        return undefined as void;
      }
    }

    throw new Error('Nothing changed!');
  });
