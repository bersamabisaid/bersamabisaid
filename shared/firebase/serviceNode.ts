import * as fbAdmin from 'firebase-admin';
import { memoize } from 'lodash';

const getNodeServiceInstance = memoize((config: fbAdmin.AppOptions) => {
  if (fbAdmin.apps.length) {
    fbAdmin.app();
  } else {
    fbAdmin.initializeApp(config);
  }

  return fbAdmin;
});

export {
  getNodeServiceInstance,
};
