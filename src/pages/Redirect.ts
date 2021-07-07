import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  props: {
    url: {
      type: String,
      required: true,
    },
  },
  setup({ url }) {
    return window?.open(url, '_self');
  },
});
