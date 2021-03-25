import { boot } from 'quasar/wrappers';
import money from 'v-money';
// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files
export default boot(({ Vue }) => {
  Vue.use(money);
});
