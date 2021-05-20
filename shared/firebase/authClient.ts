import { memoize } from 'lodash';
import 'firebase/auth';
import type fb from 'firebase';

const init = memoize((app: fb.app.App) => {
  const auth = app.auth();

  return {
    auth,
  };
});

export {
  init as default,
};
