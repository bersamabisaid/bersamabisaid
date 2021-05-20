import firebase from 'firebase/app';
import { memoize } from 'lodash';
import type fb from 'firebase';

const getClientServiceInstance = memoize(
  (config: Record<string, unknown>) => {
    if (firebase.apps.length) {
      firebase.app();
    } else {
      firebase.initializeApp(config);
    }

    return firebase;
  },
);

/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access */
const isFirebaseError = function (data: any): data is fb.FirebaseError {
  return typeof data.code === 'string'
  && typeof data.message === 'string'
  && typeof data.name === 'string';
};

const isStorageError = function (data: any): data is fb.storage.FirebaseStorageError {
  return (typeof data?.serverResponse === 'string' || data?.serverResponse === null)
    && isFirebaseError(data);
};

export {
  getClientServiceInstance,
  isFirebaseError,
  isStorageError,
};
