import { getCurrentInstance, watch } from '@vue/composition-api';
import { Loading } from 'quasar';
import useAuth from 'src/composables/useAuth';

export default function useGuardGuestOnly() {
  const { user, isWaitingAuthentication } = useAuth();
  const vueInstance = getCurrentInstance();

  watch(
    [user, isWaitingAuthentication],
    async () => {
      if (isWaitingAuthentication.value) {
        Loading.show({
          message: 'Authenticating...',
        });
      } else {
        Loading.hide();

        if (user.value) {
          await vueInstance?.$router.push({ name: 'Home' });
        }
      }
    },
    { immediate: true },
  );
}
