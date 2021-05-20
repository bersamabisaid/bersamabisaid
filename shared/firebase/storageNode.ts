import { memoize } from 'lodash';
import storageReferencePathName from './storageReference';
import type * as fb from 'firebase-admin';

const init = memoize((app: fb.app.App) => {
  const storage = app.storage();
  const rootRef = storage.bucket();

  const baseStorageRef = (...paths: string[]) => rootRef.file(paths.join('/'));

  const refs = {
    base: baseStorageRef,
    Programs: baseStorageRef.bind(null, storageReferencePathName.PROGRAMS),
  };

  return {
    storage,
    refs,
  };
});

export {
  init as default,
};
