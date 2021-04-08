import { ref } from '@vue/composition-api';
import type fb from 'firebase';
import { Singleton } from 'shared/utils/pattern';
import { auth } from 'src/services/firebaseService';

const setupAuth = new Singleton(() => {
  const isWaitingAuthentication = ref(true);
  const user = ref<fb.User | null>(null);

  auth.onAuthStateChanged((currentUser) => {
    if (isWaitingAuthentication.value) {
      isWaitingAuthentication.value = false;
    }

    user.value = currentUser;
  });

  return {
    user,
    isWaitingAuthentication,
  };
});

export default function useAuth() {
  return {
    ...setupAuth.value,
  };
}
