<template>
  <q-btn
    flat
    rounded
    padding="sm lg"
    class="text-white"
  >
    {{ caption }}
  </q-btn>
</template>

<script>
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  name: 'NavbarComponent',
  props: {
    caption: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
  },
});
</script>
