import { memoize } from 'lodash';
import { emulators } from '../../firebase.json';
import 'firebase/functions';
import type fb from 'firebase';

const DEV_HOST = 'localhost';

const init = memoize((app: fb.app.App, useEmulator = false) => {
  const fns = app.functions();

  if (useEmulator) {
    fns.useEmulator(DEV_HOST, emulators.functions.port);
  }

  return {
    fns,
  };
});

export {
  init as default,
};
