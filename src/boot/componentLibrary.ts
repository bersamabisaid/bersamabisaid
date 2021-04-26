import { boot } from 'quasar/wrappers';
import VueSocialSharing from 'vue-social-sharing';

export default boot(({ Vue }) => {
  Vue.use(VueSocialSharing);
});
